import React, { useEffect, useState } from 'react'
import { Button, Card, Row, Typography } from 'antd'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import Layout from 'antd/es/layout/layout'
import Preloader from '../../components/common/Preloader'
import LessonsList from '../../components/user/LessonsList'
import { ICourse } from '../../redux/store/types'
import { GetStudents } from '../../components/tutor/GetStudents'

const { Title, Paragraph, Text } = Typography

const CourseDetails: React.FC = () => {
  const { id } = useParams()
  const [courseInfo, setCourseInfo] = useState<ICourse | null>(null)
  const [error, setError] = useState('')

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
      <Card title='Course Details' style={{ width: '80rem', margin: '20px' }}>
        <div>
          <h1>{course.title}</h1>
          <p>{course.about}</p>
          <p>Category: {course.category}</p>
          <p>Difficulty: {course.difficulty}</p>
          <p>Price: ${course.price}</p>
        </div>
      </Card>
      <Card title='Students' style={{ width: '80rem', margin: '20px' }}>
        {course.students.length ? (
          <div>
            <ul>
              {course.students.map((student: any) => (
                <GetStudents userId={student} key={course._id + student} />
              ))}
            </ul>
          </div>
        ) : (
          <p>Пока никого :(</p>
        )}
      </Card>

      <Card title='Lessons' style={{ width: '80rem', margin: '20px' }}>
        <div>
          <LessonsList />
        </div>
        <Link to={`/lessons/create`}>
          <Button style={{ margin: '20px' }}>Add Lesson</Button>
        </Link>
      </Card>
    </Row>
  )
}

export default CourseDetails
