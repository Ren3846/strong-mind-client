// import React, { useEffect, useState } from 'react'
// import {
//   Card,
//   Button,
//   List,
//   message,
//   Space,
//   Typography,
//   Skeleton,
//   Tag,
// } from 'antd'
// import axios from 'axios'
// import { ITeacher } from '../../redux/store/types'
// import {
//   CheckCircleOutlined,
//   CheckCircleTwoTone,
//   CloseCircleOutlined,
//   CloseCircleTwoTone,
//   SyncOutlined,
// } from '@ant-design/icons'
// import Preloader from '../common/Preloader'
// import { useDispatch, useSelector } from 'react-redux'
// const { Text } = Typography

// const TeacherMeetings: React.FC = () => {
//   const [teacher, setTeacher] = useState<ITeacher | null>(null)
//   const [loading, setLoading] = useState<boolean>(false)

//   const user = useSelector((state: any) => state.auth.user)

//   useEffect(() => {
//     setLoading(true)
//     axios
//       .get<ITeacher>(`/api/users/${user._id}`)
//       .then((response) => {
//         console.log(response.data)
//         setTeacher(response.data)
//       })
//       .catch((error) => {
//         console.error('Error while fetching teacher:', error)
//         message.error('Error while fetching teacher data')
//       })
//       .finally(() => {
//         setLoading(false)
//       })
//   }, [])

//   const handleAcceptMeeting = (meetingId: string) => {
//     axios
//       .post(`/api/users/meetings/${meetingId}?action=accept`)
//       .then(() => {
//         message.success('Meeting request accepted successfully')
//         setTeacher((prevTeacher) => {
//           if (prevTeacher) {
//             return {
//               ...prevTeacher,
//               meetings: prevTeacher.meetings.map((meeting) => {
//                 if (meeting._id === meetingId) {
//                   meeting.status = 'accepted'
//                 }
//                 return meeting
//               }),
//             }
//           }
//           return prevTeacher
//         })
//       })
//       .catch((error) => {
//         console.error('Error while accepting meeting request:', error)
//         message.error('Error while accepting meeting request')
//       })
//   }

//   const handleRejectMeeting = (meetingId: string) => {
//     axios
//       .post(`/api/users/meetings/${meetingId}?action=reject`)
//       .then(() => {
//         message.success('Meeting request rejected successfully')
//         setTeacher((prevTeacher) => {
//           if (prevTeacher) {
//             return {
//               ...prevTeacher,
//               meetings: prevTeacher.meetings.map((meeting) => {
//                 if (meeting._id === meetingId) {
//                   meeting.status = 'rejected'
//                 }
//                 return meeting
//               }),
//             }
//           }

//           return prevTeacher
//         })
//       })
//       .catch((error) => {
//         console.error('Error while rejecting meeting request:', error)
//         message.error('Error while rejecting meeting request')
//       })
//   }

//   const formatDateTime = (dateTimeString: string) => {
//     return new Date(dateTimeString).toLocaleString()
//   }

//   return (
//     <div>
//       {loading ? (
//         <Skeleton active />
//       ) : (
//         teacher && (
//           <List
//             dataSource={teacher.meetings}
//             renderItem={(meeting) => (
//               <List.Item key={meeting._id}>
//                 <div>
//                   <Space align='center'>
//                     {/* <Text strong>{meeting.date}</Text> */}
//                     {formatDateTime(meeting.date)}
//                     {meeting.status === 'accepted' ? (
//                       <Tag icon={<CheckCircleOutlined />} color='success'>
//                         Accepted
//                       </Tag>
//                     ) : meeting.status === 'rejected' ? (
//                       <Tag icon={<CloseCircleOutlined />} color='error'>
//                         Rejected
//                       </Tag>
//                     ) : (
//                       <Tag icon={<SyncOutlined spin />} color='processing'>
//                         Pending
//                       </Tag>
//                     )}
//                   </Space>
//                 </div>
//                 {meeting.status === 'pending' && (
//                   <>
//                     <Space>
//                       <Button
//                         type='primary'
//                         onClick={() => handleAcceptMeeting(meeting._id)}
//                       >
//                         Accept
//                       </Button>
//                       <Button
//                         danger
//                         type='primary'
//                         onClick={() => handleRejectMeeting(meeting._id)}
//                       >
//                         Reject
//                       </Button>
//                     </Space>
//                   </>
//                 )}
//               </List.Item>
//             )}
//           />
//         )
//       )}
//     </div>
//   )
// }

// export default TeacherMeetings

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
