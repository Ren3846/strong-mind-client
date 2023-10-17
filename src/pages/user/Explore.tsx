import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { StoreType } from '../../redux/store'
import Preloader from '../../components/common/Preloader'
import { Typography, Row, Col, Card, List, Space, Avatar } from 'antd'
import CourseFilter from '../../components/user/CourseFilter'
import { UserOutlined } from '@ant-design/icons'

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
  const [filter, setFilter] = useState('all')

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

const CourseItem: React.FC<ICourse> = (course) => {
  return (
    <Card
      title={course.title}
      extra={<span>Price: {course.price} $</span>}
      style={{ width: 370, margin: '16px' }}
    >
      <Paragraph>{course.about}</Paragraph>
      <List
        header={<div>Students</div>}
        dataSource={course.students}
        renderItem={(user) => (
          <List.Item>
            <Space>
              <Avatar icon={<UserOutlined />} />
              {course.students[0]}
            </Space>
          </List.Item>
        )}
      />
    </Card>
  )
}

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

  const handleFilterChange = (value: string) => {
    setFilter(value)
  }

  return (
    <Row gutter={[16, 16]}>
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
