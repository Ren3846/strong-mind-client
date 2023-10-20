import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from 'antd/es/layout/layout'
import { Card, Row, Descriptions } from 'antd'
import { useParams } from 'react-router-dom'

interface ICourseInfo {
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

const CourseInfo: React.FC = () => {
  const [courseInfo, setCourseInfo] = useState<ICourseInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { id } = useParams()

  useEffect(() => {
    axios
      .get(`/api/courses/enrolled/${id}/info`)
      .then((response) => {
        console.log(response.data)
        setCourseInfo(response.data)
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setError('Course not found')
        } else {
          console.error(err)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Row align='middle' justify='center'></Row>
      <Card title='Course Information' style={{ width: '80rem' }}>
        <div>
          <h1>Course Details</h1>
          {courseInfo ? (
            <Descriptions>
              <Descriptions.Item label='Title'>
                {courseInfo.title}
              </Descriptions.Item>
              <Descriptions.Item label='About'>
                {courseInfo.about}
              </Descriptions.Item>
              <Descriptions.Item label='Tagline'>
                {courseInfo.tagline}
              </Descriptions.Item>
              <Descriptions.Item label='Category'>
                {courseInfo.category}
              </Descriptions.Item>
              <Descriptions.Item label='Difficulty'>
                {courseInfo.difficulty}
              </Descriptions.Item>
              <Descriptions.Item label='Price'>
                ${courseInfo.price}
              </Descriptions.Item>
              <Descriptions.Item label='Is Visible'>
                {courseInfo.isVisible ? 'Yes' : 'No'}
              </Descriptions.Item>
              <Descriptions.Item label='Teacher'>
                {courseInfo.teacher}
              </Descriptions.Item>
            </Descriptions>
          ) : (
            <p>{error}</p>
          )}
        </div>
      </Card>
    </Row>
  )
}

export default CourseInfo
