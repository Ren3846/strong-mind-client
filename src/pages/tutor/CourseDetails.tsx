import React, { useEffect, useState } from 'react'
import { Card, Layout, Row, Typography } from 'antd'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const CourseDetails: React.FC = () => {
  const { id } = useParams()

  const [course, setCourse] = useState<any>(null)

  useEffect(() => {
    axios
      .get(`/api/courses/created?id=${id}`)
      .then((response) => {
        setCourse(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [id])

  return (
    <Layout>
      <Row align='middle' justify='center'>
        <h4>{id}</h4>
        <div>
          {/* <h1>{course.title}</h1>
          <p>{course.about}</p>
          <p>Category: {course.category}</p>
          <p>Difficulty: {course.difficulty}</p>
          <p>Price: ${course.price}</p> */}
        </div>
      </Row>
    </Layout>
  )
}

export default CourseDetails
