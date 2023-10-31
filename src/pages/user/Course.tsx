import { Card, Row, Space, Button, message, Skeleton } from 'antd'
import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Preloader from '../../components/common/Preloader'
import { ICourse, ITeacher } from '../../redux/store/types'
import { useSelector } from 'react-redux'
import { StoreType } from '../../redux/store'
import GetLikes from '../../components/common/GetLikes'

const Course: React.FC<{}> = () => {
  const { id } = useParams()
  const user = useSelector((state: StoreType) => state.auth.user)
  const navigate = useNavigate()
  const [course, setCourse] = useState<ICourse | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(false)
  const [enrollmentError, setEnrollmentError] = useState(null)
  const [enrollLoading, setEnrollLoading] = useState(false)

  const course_purchased = useMemo(
    () => user?.courses.includes(id || ''),
    [id, user],
  )

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
    setEnrollLoading(true)
    axios
      .post('/api/users/purchase', { courseId: id })
      .then((response) => {
        if (response.data.success) {
          message.success(`You paid ${response.data.amount} $`)
          setEnrollmentSuccess(true)
        }
        // else {
        //   message.error('You are already purchase this course')
        // }
      })
      .catch((error) => {
        // message.error('You are already purchase this course')
        if (error.response) {
          message.error(error.response.data.message, 6)
        } else {
          console.error(error)
        }
      })
      .finally(() => {
        setEnrollLoading(false)
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
                  <GetLikes courseId={course._id} />

                  {enrollmentSuccess ? (
                    <p>You have successfully enrolled in this course.</p>
                  ) : (
                    <Space>
                      <Button
                        disabled={course_purchased}
                        loading={enrollLoading}
                        type={course_purchased ? 'default' : 'primary'}
                        onClick={enrollUser}
                        children={course_purchased ? 'Enrolled' : 'Enroll'}
                      />
                      {course_purchased ? (
                        <Button
                          type='link'
                          onClick={() =>
                            navigate(`/enrolled/${course._id}/info`)
                          }
                          children='Go to course page'
                        />
                      ) : null}
                    </Space>
                  )}
                  <GetTeacherInfo userId={course.teacher} />
                </Space>
              </>
            ) : (
              <p>Course not found or an error occurred.</p>
            )}
          </div>
        ) : (
          <Skeleton active />
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
