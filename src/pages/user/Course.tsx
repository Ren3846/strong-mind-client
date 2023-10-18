import { Card, Layout, Spin, Row, Button, Space } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Preloader from '../../components/common/Preloader'

interface ICourse {
  _id: string
  title: string
  about: string
  price: number
  students: string[]
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
    axios({
      url: `/api/courses/${id}`,
      method: 'get',
    })
      .then(({ data }) => {
        setCourse(data)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setLoaded(true)
      })
  }, [id])

  console.log(course)

  useEffect(() => {
    axios({
      url: `/api/users/${id}`,
      method: 'get',
    })
      .then(({ data }) => {
        setCourse(data)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setLoaded(true)
      })
  }, [])

  return (
    <Layout>
      <Row align='middle' justify='center'>
        <Card title={`Course details`} style={{ width: '60rem' }}>
          {loaded ? (
            <div>
              {course ? (
                <>
                  <Space
                    direction='vertical'
                    size='middle'
                    style={{ display: 'flex' }}
                  >
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
                    <a>{course.teacher}</a>
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

export default Course
