import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, List, Skeleton, Space, Tag, Button } from 'antd'
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons'

const BookedMeetings = () => {
  const [meetings, setMeetings] = useState<any>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get('/api/meetings/')
        const meetingsData = await Promise.all(
          response.data.map(async (meeting: any) => {
            const teacherResponse = await axios.get(
              `/api/users/${meeting.teacher}`,
            )
            const studentResponse = await axios.get(
              `/api/users/${meeting.student}`,
            )
            const courseResponse = await axios.get(
              `/api/courses/${meeting.course}`,
            )

            return {
              ...meeting,
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

    fetchMeetings()
  }, [])

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
                  {meeting.studentName}
                </Space>
              </div>

              {meeting.status === 'draft' ? (
                <>
                  <Space>
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
                  </Space>
                </>
              ) : (
                <></>
              )}
            </List.Item>
          )}
        />
      )}
    </div>
  )
}

export default BookedMeetings
