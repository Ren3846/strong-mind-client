import React, { useEffect, useState } from 'react'
import { Card, Button, List, message, Space, Typography } from 'antd'
import axios from 'axios'
import { ITeacher } from '../../redux/store/types'
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons'
import Preloader from '../common/Preloader'
import { useDispatch, useSelector } from 'react-redux'
const { Text } = Typography

const TeacherMeetings: React.FC = () => {
  const [teacher, setTeacher] = useState<ITeacher | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const user = useSelector((state: any) => state.auth.user)
  const dispatch = useDispatch()

  useEffect(() => {
    setLoading(true)
    axios
      .get<ITeacher>(`/api/users/${user._id}`)
      .then((response) => {
        console.log(response.data)
        setTeacher(response.data)
      })
      .catch((error) => {
        console.error('Error while fetching teacher:', error)
        message.error('Error while fetching teacher data')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const handleAcceptMeeting = (meetingId: string) => {
    axios
      .post(`/api/users/meetings/${meetingId}?action=accept`)
      .then(() => {
        message.success('Meeting request accepted successfully')
        setTeacher((prevTeacher) => {
          if (prevTeacher) {
            return {
              ...prevTeacher,
              meetings: prevTeacher.meetings.map((meeting) => {
                if (meeting._id === meetingId) {
                  meeting.status = 'accepted'
                }
                return meeting
              }),
            }
          }
          return prevTeacher
        })
      })
      .catch((error) => {
        console.error('Error while accepting meeting request:', error)
        message.error('Error while accepting meeting request')
      })
  }

  const handleRejectMeeting = (meetingId: string) => {
    axios
      .post(`/api/users/meetings/${meetingId}?action=reject`)
      .then(() => {
        message.success('Meeting request rejected successfully')
        setTeacher((prevTeacher) => {
          if (prevTeacher) {
            return {
              ...prevTeacher,
              meetings: prevTeacher.meetings.map((meeting) => {
                if (meeting._id === meetingId) {
                  meeting.status = 'rejected'
                }
                return meeting
              }),
            }
          }
          return prevTeacher
        })
      })
      .catch((error) => {
        console.error('Error while rejecting meeting request:', error)
        message.error('Error while rejecting meeting request')
      })
  }

  return (
    <div>
      {loading ? (
        <Preloader />
      ) : (
        teacher && (
          <List
            dataSource={teacher.meetings}
            renderItem={(meeting) => (
              <List.Item key={meeting._id}>
                <div>
                  <Space align='center'>
                    <Text strong>{meeting.date}</Text>
                    {meeting.status === 'accepted' ? (
                      <>
                        <CheckCircleTwoTone twoToneColor='#52c41a' />
                        <p>Accepted</p>
                      </>
                    ) : meeting.status === 'rejected' ? (
                      <>
                        <CloseCircleTwoTone twoToneColor='#ff4d4f' />
                        <p>Rejected</p>
                      </>
                    ) : (
                      <>
                        <CloseCircleTwoTone twoToneColor='#eb2f96' />
                        <p>Pending</p>
                      </>
                    )}
                  </Space>
                </div>
                {meeting.status === 'pending' && (
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
                )}
              </List.Item>
            )}
          />
        )
      )}
    </div>
  )
}

export default TeacherMeetings
