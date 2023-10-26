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

  const teacherId = '65366b5e8ce3e04f6a6bbb7f'

  useEffect(() => {
    setLoading(true)
    axios
      .get<ITeacher>(`/api/users/${user._id}`)
      .then((response) => {
        setTeacher(response.data)
      })
      .catch((error) => {
        console.error('Error while fetching teacher:', error)
        message.error('Error while fetching teacher data')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [teacherId])

  const handleAcceptMeeting = (meetingId: string) => {
    axios
      .get(`/api/users/meetings/${meetingId}?action=accept`)
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
                      <CheckCircleTwoTone twoToneColor='#52c41a' />
                    ) : (
                      <CloseCircleTwoTone twoToneColor='#eb2f96' />
                    )}
                  </Space>
                </div>
                {meeting.status === 'pending' && (
                  <>
                    <Button
                      type='primary'
                      onClick={() => handleAcceptMeeting(meeting._id)}
                    >
                      Accept
                    </Button>
                    {/* <Button danger type='primary'>
                      Reject
                    </Button> */}
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
