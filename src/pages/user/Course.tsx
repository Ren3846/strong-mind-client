import { Card, Row, Space, Button, message, Skeleton, Rate } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ITeacher, IUser, USER_ROLE } from '../../redux/store/types'
import { useSelector } from 'react-redux'
import { CDN_BASE } from '../..'
import Preloader from '../../components/common/Preloader'
import useTranslations from '../../lang/useTranslations'

const CourseCoverVideo: React.FC<{ cover: string | null | undefined }> = ({
  cover,
}) => {
  const t = useTranslations('Course');

  if (!cover) return null
  return (
    <Card
      title={t('video_by_teacher')}
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
  const [course, setCourse] = useState<any>()
  const [loaded, setLoaded] = useState(false)
  const [enrollLoading, setEnrollLoading] = useState(false)
  const [purchased, setPurchased] = useState(() =>
    user?.courses.includes(id || ''),
  )
  const t = useTranslations('Course');

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
        message.success(t('enroll_success_message'));
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
      {loaded ? (
        <Card
          title={t('course_details')}
          style={{ width: '60rem', margin: '20px' }}
          extra={
            <Rate
              disabled
              allowHalf
              defaultValue={Math.round(course.ratingAverage * 2) / 2}
              style={{ color: 'rgb(167 167 255)' }}
            />
          }
        >
          <div>
            {course ? (
              <>
                <Space direction='vertical'>
                  <h2>{course.title}</h2>
                  <p>{course.about}</p>
                  <p>{t('price')}: {course.meetingPrice} $</p>
                  <p>{t('category')}: {course.category}</p>
                  <p>{t('difficulty')}: {course.difficulty}</p>
                  <p>{t('tagline')}: {course.tagline}</p>
                  <p>{t('number_of_lessons')}: {course.lessons.length}</p>
                  {/* <p>{t('visible')}: {course.isVisible ? 'Yes' : 'No'}</p> */}
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
                        children={purchased ? t('enrolled') : t('enroll')}
                      />
                      {purchased ? (
                        <Button
                          type='link'
                          onClick={() =>
                            navigate(`/enrolled/${course._id}/info`)
                          }
                          children={t('go_to_course_page')}
                        />
                      ) : null}
                    </Space>
                  )}

                  <GetTeacherInfo userId={course.teacher} />
                </Space>
              </>
            ) : (
              <p>{t('course_not_found')}</p>
            )}
          </div>
        </Card>
      ) : (
        <Preloader />
      )}

      <CourseCoverVideo cover={course?.cover} />
    </Row>
  )
}

const GetTeacherInfo: React.FC<{ userId: string }> = ({ userId }) => {
  const t = useTranslations('Course');
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
      <Button>{t('teacher')}: {teacher?.email}</Button>
    </Link>
  )
}
export default Course
