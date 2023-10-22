import { Card, Row, Space, Button, message } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Preloader from '../../components/common/Preloader'
import { ICourse, ITeacher } from '../../redux/store/types'

const Course: React.FC<{}> = () => {
  const { id } = useParams()
  const [course, setCourse] = useState<ICourse | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(false)
  const [enrollmentError, setEnrollmentError] = useState(null)

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

  const enrollUser = () => {
    axios
      .patch(`/api/courses/enroll/${id}`)
      .then(() => {
        setEnrollmentSuccess(true)
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status === 403 &&
          error.response.data.message === 'You are already in this course'
        ) {
          message.error('Вы уже зарегистрированы на этот курс')
        } else {
          console.error(error)
        }
      })
  }

  return (
    <Row align='middle' justify='center'>
      <Card title={`Course details`} style={{ width: '60rem', margin: '20px' }}>
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
                  {/* <p>Visible: {course.isVisible ? 'Yes' : 'No'}</p> */}
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    style={{ maxWidth: '100%' }}
                  />

                  {enrollmentSuccess ? (
                    <p>You have successfully enrolled in this course.</p>
                  ) : (
                    <Button type='primary' onClick={enrollUser}>
                      Enroll
                    </Button>
                  )}
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
  )
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
