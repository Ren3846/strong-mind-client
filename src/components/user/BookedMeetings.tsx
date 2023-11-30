import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Card, List, Skeleton, Space, Tag } from 'antd'
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  RightOutlined,
  SyncOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'

const BookedMeetings = () => {
  const [meetings, setMeetings] = useState<any>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get('/api/meetings/booked')
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

            console.log(meeting.course)
            console.log(meeting.teacher)
            console.log(meeting.student)

            return {
              ...meeting,
              teacherName: teacherResponse.data.fullName,

              studentName: studentResponse.data.fullName,
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
    fetchMeetings()
  }, [])

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
                    <Button danger type='primary' onClick={() => {}}>
                      Cancel
                    </Button>
                    <Link to={`/meeting/${meeting._id}`}>
                      <Button type='primary' onClick={() => {}}>
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
