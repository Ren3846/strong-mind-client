import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { List, Skeleton, Space, Tag, Button } from 'antd'

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  RightOutlined,
  SyncOutlined,
} from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { IUser } from '../../redux/store/types'

const MeetingsStudent = () => {
  const [meetings, setMeetings] = useState<any>([])
  const [loaded, setLoaded] = useState(false)

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
        setLoaded(true)
      } catch (error) {
        console.error('Error fetching meetings:', error)
      }
    }

    if (userMeetingsIds.length > 0) {
      fetchMeetings()
    } else {
      setLoaded(false)
    }
  }, [userMeetingsIds])

  const handleCancelMeeting = async (meetingId: string) => {
    // try {
    //   await axios.patch(`/api/meetings/status/${meetingId}`, {
    //     status: 'rejected',
    //   })
    //   setMeetings((prevMeetings: any) =>
    //     prevMeetings.map((meeting: any) =>
    //       meeting._id === meetingId
    //         ? { ...meeting, status: 'rejected' }
    //         : meeting,
    //     ),
    //   )
    // } catch (error) {
    //   console.error('Error rejecting meeting:', error)
    // }
  }

  return (
    <div>
      {loaded ? (
        <List
          dataSource={meetings}
          renderItem={(meeting: any) => (
            <List.Item key={meeting._id}>
              <div>
                <Space align='center'>
                  {new Date(meeting.start_date).toLocaleString()}
                  {meeting.status === 'accepted' ? (
                    <Tag icon={<CheckCircleOutlined />} color='success'>
                      Accepted
                    </Tag>
                  ) : meeting.status === 'rejected' ? (
                    <Tag icon={<CloseCircleOutlined />} color='error'>
                      Rejected
                    </Tag>
                  ) : (
                    <Tag icon={<SyncOutlined spin />} color='processing'>
                      Pending
                    </Tag>
                  )}
                  {meeting.teacherName}
                </Space>
              </div>
              {meeting.status === 'accepted' ? (
                <>
                  <Space>
                    {/* <Button danger type='primary' onClick={() => {}}>
                      Cancel
                    </Button> */}
                    <Link to={`/meeting/${meeting._id}`}>
                      <Button onClick={() => {}}>
                        <RightOutlined />
                      </Button>
                    </Link>
                  </Space>
                </>
              ) : (
                <></>
              )}
            </List.Item>
          )}
        />
      ) : (
        <Skeleton active />
      )}
    </div>
  )
}

export default MeetingsStudent
