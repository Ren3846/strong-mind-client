import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../components/common/Layout'
import Preloader from '../../components/common/Preloader'
import CourseFilter from '../../components/user/CourseFilter'
import { UserOutlined } from '@ant-design/icons'
import { Typography, Row, Col, Space, Avatar, Button } from 'antd'
import { ICourse, ITeacher, User } from '../../redux/store/types'

const { Title, Paragraph } = Typography

const CourseStudentItem: React.FC<{
  userId: string
}> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    axios({
      url: `/api/users/${userId}`,
      method: 'get',
    })
      .then(({ data }) => {
        setUser(data)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setLoaded(true)
      })
  }, [userId])

  return (
    <div className='course-user' title={user?.email} style={{ margin: '5px' }}>
      <Avatar icon={<UserOutlined />} />
    </div>
  )
}

const CourseItem: React.FC<ICourse> = (course) => {
  console.log(course)
  return (
    <div className='course-item course-card'>
      <Space direction='vertical' size='middle' style={{ display: 'flex' }}>
        <h3>{course.title}</h3>
        <p>{course.about}</p>
        <div className='course-users'>
          {course.students.length ? (
            course.students.map((user) => (
              <CourseStudentItem userId={user} key={course._id + user} />
            ))
          ) : (
            <p>Пока никого :(</p>
          )}
        </div>
        <span>Price: {course.price} $</span>
        <Button type='primary' key={course._id}>
          <Link to={course._id}>Explore</Link>
        </Button>
      </Space>
    </div>
  )
}

const Courses = () => {
  const [courses, setCourses] = useState<ICourse[]>([])
  const [loaded, setLoaded] = useState(false)
  const [filters, setFilters] = useState<Record<string, string>>({
    price: 'all',
    category: 'all',
  })

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

  const handleFilterChange = (newFilters: Record<string, string>) => {
    setFilters(newFilters)

    const filteredCourses = courses.filter((course) => {
      if (newFilters.price !== 'all' && newFilters.price === 'free') {
        return course.price === 0
      }
      if (newFilters.price !== 'all' && newFilters.price === 'paid') {
        return course.price > 0
      }
      if (
        newFilters.category !== 'all' &&
        newFilters.category === course.category
      ) {
        return true
      }
      return false
    })

    setCourses(filteredCourses)
  }

  return (
    <Layout>
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
    </Layout>
  )
}

export default Courses
