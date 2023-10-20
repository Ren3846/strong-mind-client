import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from 'antd/es/layout/layout'
import { Card, Row, Col, Button, Descriptions, Divider } from 'antd'
import { Link } from 'react-router-dom'

interface ICourse {
  _id: string
  title: string
  teacher: string
  students: string[]
  about: string
  tagline: string
  category: string
  difficulty: string
  thumbnail: string
  price: number
  isVisible: boolean
  lessons: string[]
  __v: number
}

interface ITeacher {
  _id: string
  email: string
  fullName: string
  phone: string
  isBlocked: boolean
  students: string[]
  liveLessonSchedule: any[]
  balance: number
  history: any[]
  courses: string[]
  meetings: any[]
}

const Enrolled: React.FC = () => {
  const [enrolledCourses, setEnrolledCourses] = useState<ICourse[]>([])
  const [teacher, setTeacher] = useState<ITeacher | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // Загрузка данных о курсах, на которые пользователь записан
    axios
      .get('/api/courses/user/enrolled')
      .then((response) => {
        setEnrolledCourses(response.data)
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setError('You are not registered in any course')
        } else {
          console.error(err)
        }
      })
      .finally(() => {
        setLoading(false)
      })

    // Загрузка данных о учителе по ID
    axios
      .get('/api/users/6531195da30e3b7a94bc7492')
      .then((response) => {
        setTeacher(response.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Row align='middle' justify='center'>
      <Card title='My Enrolled Courses' style={{ width: '80rem' }}>
        <div>
          {enrolledCourses.length === 0 ? (
            <p>{error}</p>
          ) : (
            <Row gutter={16}>
              {enrolledCourses.map((course) => (
                <Col span={24} key={course._id}>
                  <Card
                    title={course.title}
                    extra={
                      <Link to={`${course._id}/info`}>
                        <Button type='primary'>View Course</Button>
                      </Link>
                    }
                  >
                    <Descriptions>
                      <Descriptions.Item label='About'>
                        {course.about}
                      </Descriptions.Item>
                      <Descriptions.Item label='Category'>
                        {course.category}
                      </Descriptions.Item>
                      <Descriptions.Item label='Difficulty'>
                        {course.difficulty}
                      </Descriptions.Item>
                    </Descriptions>
                    <Divider />
                    {teacher ? (
                      <Descriptions>
                        <h3>Teacher:</h3>
                        <Descriptions.Item label='Full Name'>
                          {teacher.fullName}
                        </Descriptions.Item>
                        <Descriptions.Item label='Email'>
                          {teacher.email}
                        </Descriptions.Item>
                      </Descriptions>
                    ) : (
                      <p>No teacher information available</p>
                    )}
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </Card>
    </Row>
  )
}

export default Enrolled
