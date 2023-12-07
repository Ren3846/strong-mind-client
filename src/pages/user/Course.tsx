import { Card, Row, Space, Button, message, Skeleton, Rate } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ICourse, ITeacher, IUser, USER_ROLE } from '../../redux/store/types'
import { useSelector } from 'react-redux'
import { StoreType } from '../../redux/store'
import { CDN_BASE } from '../..'

const CourseCoverVideo: React.FC<{ cover: string | null | undefined }> = ({
  cover,
}) => {
  if (!cover) return null
  return (
    <Card
      title={`Video by Teacher`}
      style={{ width: '60rem', margin: '20px' }}
      className='lesson-card'
    >
      <video src={CDN_BASE + cover} controls style={{ width: '100%' }}>
        Your browser does not support the video tag.
      </video>
    </Card>
  )
}

const Course: React.FC<{}> = () => {
  const { id } = useParams()
  const user = useSelector((state: IUser) => state.auth.user)
  const navigate = useNavigate()
  const [course, setCourse] = useState<ICourse | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [enrollLoading, setEnrollLoading] = useState(false)
  const [purchased, setPurchased] = useState(() =>
    user?.courses.includes(id || ''),
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
      .post('/api/users/enroll', { courseId: id })
      .then((response) => {
        message.success('You successfully enrolled!')
        setPurchased(true)
      })
      .catch((error) => {
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
      <Card
        title={`Course details`}
        style={{ width: '60rem', margin: '20px' }}
        extra={
          <Rate
            disabled
            defaultValue={4}
            style={{ color: 'rgb(167 167 255)' }}
          />
        }
      >
        {loaded ? (
          <div>
            {course ? (
              <>
                <Space direction='vertical'>
                  <h2>{course.title}</h2>
                  <p>{course.about}</p>
                  <p>Price: {course.meetingPrice} $</p>
                  <p>Category: {course.category}</p>
                  <p>Difficulty: {course.difficulty}</p>
                  <p>Tagline: {course.tagline}</p>
                  <p>Number of Lessons: {course.lessons.length}</p>
                  {/* <p>Visible: {course.isVisible ? 'Yes' : 'No'}</p> */}
                  {/* <img
                    src={course.thumbnail}
                    alt={course.title}
                    style={{ maxWidth: '100%' }}
                  /> */}
                  {user && user.role === USER_ROLE.TEACHER ? (
                    <></>
                  ) : (
                    <Space>
                      <Button
                        disabled={purchased}
                        loading={enrollLoading}
                        type={purchased ? 'default' : 'primary'}
                        onClick={enrollUser}
                        children={purchased ? 'Enrolled' : 'Enroll'}
                      />
                      {purchased ? (
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
      <CourseCoverVideo cover={course?.cover} />
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
