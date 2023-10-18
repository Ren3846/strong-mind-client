import { Card, Layout, Row, Space, Button } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Preloader from '../../components/common/Preloader'

interface ICourse {
  _id: string
  title: string
  about: string
  price: number
  category: string
  difficulty: string
  tagline: string
  lessons: string[]
  isVisible: boolean
  thumbnail: string
  teacher: string
}

const Course: React.FC<{}> = () => {
  const { id } = useParams()
  const [course, setCourse] = useState<ICourse | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    axios
      .get(`/api/courses/${id}`)
      .then(({ data }) => {
        setCourse(data)
        setLoaded(true)
      })
      .catch((error) => {
        console.error(error)
        setLoaded(true)
      })
  }, [id])

  return (
    <Layout>
      <Row align='middle' justify='center'>
        <Card title={`Course details`} style={{ width: '60rem' }}>
          {loaded ? (
            <div>
              {course ? (
                <>
                  <Space direction='vertical'>
                    <h2>{course.title}</h2>
                    <p>{course.about}</p>
                    <p>Price: {course.price} $</p>
                    <p>Category: {course.category}</p>
                    <p>Difficulty: {course.difficulty}</p>
                    <p>Tagline: {course.tagline}</p>
                    <p>Number of Lessons: {course.lessons.length}</p>
                    <p>Visible: {course.isVisible ? 'Yes' : 'No'}</p>
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      style={{ maxWidth: '100%' }}
                    />
                    <Button type='primary' onClick={() => {}}>
                      Enroll
                    </Button>
                    <GetTeacherInfo userId={course.teacher} />
                  </Space>
                </>
              ) : (
                <p>Course not found or an error occurred.</p>
              )}
            </div>
          ) : (
            <Preloader />
          )}
        </Card>
      </Row>
    </Layout>
  )
}

interface ITeacher {
  userId: string
  email: string
}

const GetTeacherInfo: React.FC<{ userId: string }> = ({ userId }) => {
  const [teacher, setTeacher] = useState<ITeacher | null>(null)

  useEffect(() => {
    axios
      .get(`/api/users/${userId}`)
      .then(({ data }) => {
        setTeacher(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [userId])

  return (
    <Link to={`/teacher/${userId}`}>
      <Button>Teacher: {teacher?.email}</Button>
    </Link>
  )
}
export default Course
