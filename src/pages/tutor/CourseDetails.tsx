import React, { useEffect, useState } from 'react'
import { Card, Row, Typography } from 'antd'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Layout from 'antd/es/layout/layout'
import Preloader from '../../components/common/Preloader'

const { Title, Paragraph, Text } = Typography

const CourseDetails: React.FC = () => {
  const { id } = useParams()

  const [course, setCourse] = useState<any>(null)

  useEffect(() => {
    axios
      .get(`/api/courses/${id}`)
      .then((response) => {
        setCourse(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [id])

  if (!course) {
    return <Preloader />
  }

  return (
    <Row align='middle' justify='center'>
      <Card title='Course Details' style={{ width: '60rem' }}>
        <div>
          <h1>{course.title}</h1>
          <p>{course.about}</p>
          <p>Category: {course.category}</p>
          <p>Difficulty: {course.difficulty}</p>
          <p>Price: ${course.price}</p>

          {course.students.length > 0 && (
            <div>
              <h2>Students:</h2>
              <ul>
                {course.students.map((student: any) => (
                  <li key={student._id}>{student.name}</li>
                ))}
              </ul>
            </div>
          )}

          {course.lessons.length > 0 && (
            <div>
              <h2>Lessons:</h2>
              <ul>
                {course.lessons.map((lesson: any) => (
                  <li key={lesson._id}>{lesson.title}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Card>
    </Row>
  )
}

export default CourseDetails
