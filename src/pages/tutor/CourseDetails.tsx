import React, { useEffect, useState } from 'react'
import { Card, Row, Typography } from 'antd'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const { Title, Paragraph, Text } = Typography

const CourseDetails: React.FC = () => {
  const { id } = useParams()

  const [course, setCourse] = useState<any>(null)

  useEffect(() => {
    axios
      .get(`/api/courses/created?id=${id}`)
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
      <p>{id}</p>
      <div>
        <h1>{course.title}</h1>
        <p>{course.about}</p>
        <p>Category: {course.category}</p>
        <p>Difficulty: {course.difficulty}</p>
        <p>Price: ${course.price}</p>
      </div>
    </Row>
  )
}

export default CourseDetails
