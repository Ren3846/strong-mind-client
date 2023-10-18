import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { StoreType } from '../../redux/store'
import Preloader from '../../components/common/Preloader'
import { Typography, Row, Col, Card, List, Space, Avatar, Button } from 'antd'
import CourseFilter from '../../components/user/CourseFilter'
import { UserOutlined } from '@ant-design/icons'
import CustomButton from '../../components/common/Button'

const { Title, Paragraph } = Typography
interface ICourse {
  _id: string
  title: string
  about: string
  price: number
  students: string[]
}

interface IUser {
  _id: string
  email: string
  username: string
  role: 'user' | 'teacher' | 'admin'
  balance: number
}

const CourseStudentItem: React.FC<{
  userId: string
}> = ({ userId }) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    axios({
      url: `/api/users/${userId}`,
      method: 'get',
    })
      .then(({ data }) => {
        setUser(data)
      })
      .finally(() => {
        setLoaded(true)
      })
  }, [userId])

  return <div className='course-user' title={user?.email}></div>
}

// const CourseItem: React.FC<ICourse> = (course) => {
//   return (
//     <Card
//       title={course.title}
//       extra={<span style={{ color: 'blue' }}>Price: {course.price} $</span>}
//       style={{ width: 370, margin: '16px' }}
//     >
//       <Paragraph>{course.about}</Paragraph>
//       <List
//         header={<div>Students</div>}
//         dataSource={course.students}
//         renderItem={(user) => (
//           <List.Item>
//             <Space>
//               <Avatar icon={<UserOutlined />} />
//               {course.students[0]}
//             </Space>
//           </List.Item>
//         )}
//       />
//       <Button type='primary'>View</Button>
//     </Card>
//   )
// }

// const CourseItem: React.FC<ICourse> = (course) => {
//   return (
//     <div className='course-item'>
//       <h3>{course.title}</h3>
//       <p>{course.about}</p>
//       {/* <div className='course-users'>
//         {course.students.length ? (
//           course.students.map((user) => (
//             <CourseStudentItem userId={user} key={course._id + user} />
//           ))
//         ) : (
//           <p>Пока никого :(</p>
//         )}
//       </div> */}
//       <p>{course.price}</p>
//     </div>
//   )
// }

const Course = () => {
  const [courses, setCourses] = useState<ICourse[]>([])
  const [loaded, setLoaded] = useState(false)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    axios({
      url: '/api/courses',
      method: 'get',
    })
      .then(({ data }) => {
        console.log('courses', data)
        setCourses(data)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setLoaded(true)
      })
  }, [])

  const handleFilterChange = (filters: Record<string, string>) => {
    setFilter(filter)

    const filteredCourses = courses.filter((course) => {
      if (filters.price !== 'all' && filters.price === 'free') {
        return course.price === 0
      }
      if (filters.price !== 'all' && filters.price === 'paid') {
        return course.price > 0
      }
      if (filters.category !== 'all') {
        return false
      }
    })

    setCourses(filteredCourses)
  }
  return (
    <Row>
      <Col xs={24} sm={24} md={6} lg={4} xl={4}>
        <CourseFilter onFilterChange={handleFilterChange} />
      </Col>
      <Col xs={24} sm={24} md={18} lg={18} xl={18}>
        <div>
          {loaded ? (
            <div className='courses-wrapper'>
              {courses.length ? (
                courses.map((course) => (
                  <CourseItem {...course} key={course._id} />
                ))
              ) : (
                <p>Нет курсов :(</p>
              )}
            </div>
          ) : (
            <Preloader />
          )}
        </div>
      </Col>
    </Row>
  )
}

export default Course
