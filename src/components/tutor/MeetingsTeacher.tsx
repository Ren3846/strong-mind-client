import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { List, Skeleton, Space, Tag, Button, Modal } from 'antd'

import {
  CheckCircleFilled,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  RightOutlined,
  SyncOutlined,
} from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { IUser } from '../../redux/store/types'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

const MeetingsTeacher = () => {
  const [meetings, setMeetings] = useState<any>([])
  const [loading, setLoading] = useState(true)

  const userMeetingsIds = useSelector(
    (state: IUser) => state.auth.user.meetings,
  )

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const meetingsData = await Promise.all(
          userMeetingsIds.map(async (meetingId: string) => {
            const meetingResponse = await axios.get(
              `/api/meetings/${meetingId}`,
            )
            const teacherResponse = await axios.get(
              `/api/users/${meetingResponse.data.teacher}`,
            )
            const studentResponse = await axios.get(
              `/api/users/${meetingResponse.data.student}`,
            )
            const courseResponse = await axios.get(
              `/api/courses/${meetingResponse.data.course}`,
            )

            return {
              ...meetingResponse.data,
              teacherName: teacherResponse.data.fullName,
              studentName: studentResponse.data.email,
              courseName: courseResponse.data.title,
            }
          }),
        )

        setMeetings(meetingsData)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching meetings:', error)
      }
    }

    if (userMeetingsIds.length > 0) {
      fetchMeetings()
    } else {
      setLoading(false)
    }
  }, [userMeetingsIds])

  const handleAcceptMeeting = async (meetingId: string) => {
    try {
      await axios.patch(`/api/meetings/status/${meetingId}`, {
        status: 'accepted',
      })
      setMeetings((prevMeetings: any) =>
        prevMeetings.map((meeting: any) =>
          meeting._id === meetingId
            ? { ...meeting, status: 'accepted' }
            : meeting,
        ),
      )
    } catch (error) {
      console.error('Error accepting meeting:', error)
    }
  }

  const handleRejectMeeting = async (meetingId: string) => {
    try {
      await axios.patch(`/api/meetings/status/${meetingId}`, {
        status: 'rejected',
      })
      setMeetings((prevMeetings: any) =>
        prevMeetings.map((meeting: any) =>
          meeting._id === meetingId
            ? { ...meeting, status: 'rejected' }
            : meeting,
        ),
      )
    } catch (error) {
      console.error('Error rejecting meeting:', error)
    }
  }

  return (
    <div>
      {loading ? (
        <Skeleton active />
      ) : (
        <List
          dataSource={meetings}
          renderItem={(meeting: any) => (
            <List.Item key={meeting._id}>
              <div>
                <Space>
                  {dayjs.utc(meeting.start_date).format('YYYY-MM-DD HH:mm')}
                  {meeting.status === 'accepted' ? (
                    <Tag icon={<CheckCircleOutlined />} color='success'>
                      Accepted
                    </Tag>
                  ) : meeting.status === 'rejected' ? (
                    <Tag icon={<CloseCircleOutlined />} color='error'>
                      Rejected
                    </Tag>
                  ) : meeting.status === 'started' ? (
                    <Tag icon={<ClockCircleOutlined />} color='warning'>
                      Started
                    </Tag>
                  ) : meeting.status === 'finished' ? (
                    <Tag icon={<CheckCircleFilled />} color='purple'>
                      Finished
                    </Tag>
                  ) : (
                    <Tag icon={<SyncOutlined spin />} color='processing'>
                      Pending
                    </Tag>
                  )}
                  {meeting.studentName}
                  {/* {meeting.courseName} */}
                </Space>
              </div>

              <Space>
                {meeting.status === 'draft' ? (
                  <>
                    <Button
                      type='primary'
                      onClick={() => handleAcceptMeeting(meeting._id)}
                    >
                      Accept
                    </Button>
                    <Button
                      danger
                      type='primary'
                      onClick={() => handleRejectMeeting(meeting._id)}
                    >
                      Reject
                    </Button>
                  </>
                ) : (
                  <></>
                )}
                <Link to={`/meeting/${meeting._id}`}>
                  <Button>
                    <RightOutlined />
                  </Button>
                </Link>
              </Space>
            </List.Item>
          )}
        />
      )}

      {/* <Modal
        title='Meeting Confirmation'
        visible={modalVisible}
        onCancel={handleModalCancel}
        onOk={handleModalConfirm}
      >
        <p>Do you want to accept or reject the meeting?</p>
        <Button
          type='primary'
          onClick={() => handleAcceptMeeting(selectedMeetingId)}
        >
          Accept
        </Button>
        <Button
          danger
          type='primary'
          onClick={() => handleRejectMeeting(selectedMeetingId)}
        >
          Reject
        </Button>
      </Modal> */}
    </div>
  )
}

export default MeetingsTeacher
