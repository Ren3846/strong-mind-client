import React, { useEffect, useState } from 'react'
import { Card, Row, Typography } from 'antd'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Layout from 'antd/es/layout/layout'

const { Title, Paragraph, Text } = Typography

const CourseDetails: React.FC = () => {
  const { id } = useParams()

  const [course, setCourse] = useState<any>(null)

  useEffect(() => {
    axios
      .get(`/api/courses/${id}`)
      .then((response) => {
        setCourse(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [id])

  if (!course) {
    return <div>Loading...</div>
  }

  return (
    <Row align='middle' justify='center'>
      <Card title='My courses' style={{ width: '60rem' }}>
        <div>
          <h1>{course.title}</h1>
          <p>{course.about}</p>
          <p>Category: {course.category}</p>
          <p>Difficulty: {course.difficulty}</p>
          <p>Price: ${course.price}</p>
          {/* Добавьте остальную информацию о курсе по вашему усмотрению */}
        </div>
      </Card>
    </Row>
  )
}

export default CourseDetails
