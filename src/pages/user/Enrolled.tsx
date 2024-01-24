import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, Row, Col, Button, Descriptions, Divider } from 'antd'
import { Link } from 'react-router-dom'
import Preloader from '../../components/common/Preloader'

import { ICourse, ITeacher } from '../../redux/store/types'
import MyBreadcrumb from '../../components/common/Breadcrumb'
import useTranslations from '../../lang/useTranslations'

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Enrolled courses' },
]

const Enrolled: React.FC = () => {
  const [enrolledCourses, setEnrolledCourses] = useState<ICourse[]>([])
  const [teacher, setTeacher] = useState<ITeacher | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const t = useTranslations('Enrolled');

  useEffect(() => {
    axios
      .get('/api/courses/user/enrolled')
      .then((response) => {
        console.log(response.data)
        setEnrolledCourses(response.data)
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setError(t('you_are_not_registered'));
        } else {
          console.error(err)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <Preloader />
  }

  return (
    <Row align='middle' justify='center'>
      <MyBreadcrumb items={[
        { title: t('dashboard'), link: '/dashboard' },
        { title: t('enrolled_courses') }
      ]} />

      <Card
        title={t('my_enrolled_courses')}
        style={{ width: '80rem', margin: '20px' }}
      >
        <div>
          {enrolledCourses.length === 0 ? (
            <p>{error}</p>
          ) : (
            <Row gutter={16}>
              {enrolledCourses.map((course) => (
                <Col span={24} key={course._id}>
                  <Card
                    title={course.title}
                    extra={
                      <Link to={`${course._id}/info`}>
                        <Button type='primary'>{t('view_course')}</Button>
                      </Link>
                    }
                    style={{ margin: '20px' }}
                  >
                    <Descriptions>
                      <Descriptions.Item label={t('about')}>
                        {course.about}
                      </Descriptions.Item>
                      <Descriptions.Item label={t('category')}>
                        {course.category}
                      </Descriptions.Item>
                      <Descriptions.Item label={t('difficulty')}>
                        {course.difficulty}
                      </Descriptions.Item>
                    </Descriptions>
                    <Divider />

                    <Descriptions>
                      <h3>{t('teacher')}:</h3>
                      <Descriptions.Item label=''>
                        <Link to={`/teacher/${course.teacher}`}>
                          <GetTeacher userId={course.teacher} />
                        </Link>
                      </Descriptions.Item>
                    </Descriptions>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </Card>
    </Row>
  )
}

const GetTeacher: React.FC<{
  userId: string
}> = ({ userId }) => {
  const [user, setUser] = useState<ITeacher | null>(null)
  const [loaded, setLoaded] = useState(false)
  const t = useTranslations('Enrolled');

  useEffect(() => {
    axios({
      url: `/api/users/${userId}`,
      method: 'get',
    })
      .then(({ data }) => {
        setUser(data)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setLoaded(true)
      })
  }, [userId])

  return (
    <div>
      <a>{user?.email}</a>
      {/* <a>{user?.fullName}</a> */}
    </div>
  )
}

export default Enrolled