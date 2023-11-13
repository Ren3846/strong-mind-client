import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, List, Skeleton, Space } from 'antd'

const BookedMeetings = () => {
  const [meetings, setMeetings] = useState<any>([])
  const [loading, setLoading] = useState(true)

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

            return {
              ...meeting,
              teacherName: teacherResponse.data.fullName,

              studentName: studentResponse.data.fullName,
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

  return (
    <div>
      <Space direction='horizontal'>
        {meetings.map((meeting: any) => (
          <Card key={meeting._id} style={{ width: 300, margin: '16px' }}>
            <Card.Meta
              title={
                <>
                  <strong>Teacher:</strong> {meeting.teacherName}
                </>
              }
              description={
                <>
                  <strong>Student:</strong> {meeting.studentName}
                  <br />
                  <strong>Course:</strong> {meeting.courseName}
                  <br />
                  <strong>Date:</strong>{' '}
                  {new Date(meeting.start_date).toLocaleString()}
                  <br />
                  <strong>Status:</strong> {meeting.status}
                </>
              }
            />
          </Card>
        ))}
      </Space>
    </div>
  )
}

export default BookedMeetings
