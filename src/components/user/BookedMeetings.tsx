import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, List, Skeleton, Space, Tag, Button } from 'antd'

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  RightOutlined,
  SyncOutlined,
} from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BookedMeetings = () => {
  const [meetings, setMeetings] = useState<any>([])
  const [loaded, setLoaded] = useState(false)

  const userMeetingsIds = useSelector((state: any) => state.auth.user.meetings)
  console.log('userMeetingsIds', userMeetingsIds)

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
                  {meeting.studentName}
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
        // <Space direction='horizontal'>
        //   <>
        //     {meetings.map((meeting: any) => (
        //       <Card key={meeting._id} style={{ width: 300, margin: '16px' }}>
        //         <Card.Meta
        //           title={
        //             <>
        //               <strong>Teacher:</strong> {meeting.teacherName}
        //             </>
        //           }
        //           description={
        //             <>
        //               <strong>Student:</strong> {meeting.studentName}
        //               <br />
        //               <strong>Course:</strong> {meeting.courseName}
        //               <br />
        //               <strong>Date:</strong>{' '}
        //               {new Date(meeting.start_date).toLocaleString()}
        //               <br />
        //               <strong>Status:</strong> {meeting.status}
        //             </>
        //           }
        //         />
        //       </Card>
        //     ))}
        //   </>
        // </Space>
        <Skeleton active />
      )}
    </div>
  )
}

export default BookedMeetings
