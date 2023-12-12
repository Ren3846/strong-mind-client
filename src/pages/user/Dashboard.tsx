import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../../components/common/Layout'
import { Row, Col, Card, Button, Skeleton } from 'antd'
import { ICourse, ITeacher } from '../../redux/store/types'
import { Link } from 'react-router-dom'
import MyBreadcrumb from '../../components/common/Breadcrumb'
import MeetingsStudent from '../../components/user/MeetingsStudent'
import useTranslations from '../../lang/useTranslations'

const breadcrumbItems = [{ title: 'Home', link: '/' }, { title: 'Dashboard' }]

const Dashboard = () => {
  const t = useTranslations('UserDashboard')

  const [enrolledCourses, setEnrolledCourses] = useState<ICourse[]>([])
  const [loadingCourses, setLoadingCourses] = useState(true)

  useEffect(() => {
    axios
      .get('/api/courses/user/enrolled')
      .then((response) => {
        setEnrolledCourses(response.data)
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setEnrolledCourses([])
        } else {
          console.error(err)
        }
      })
      .finally(() => {
        setLoadingCourses(false)
      })
  }, [])

  return (
    <Layout>
      <Row gutter={[16, 16]}>
        <MyBreadcrumb items={breadcrumbItems} />
        <Col span={12}>
          <Card title={t('courses')}>
            {loadingCourses ? (
              <Skeleton active />
            ) : (
              <ul>
                {enrolledCourses.map((course) => (
                  <Card key={course._id} style={{ marginTop: '20px' }}>
                    {course.title}
                    <Link to={`/enrolled/${course._id}/info`}>
                      <Button type='primary' style={{ float: 'right' }}>
                        {t('view_button')}
                      </Button>
                    </Link>
                  </Card>
                ))}
              </ul>
            )}
          </Card>
        </Col>
        <Col span={24}>
          <Card title={t('accepted_meetings')}>
            <MeetingsStudent />
          </Card>
        </Col>
      </Row>
    </Layout>
  )
}

export default Dashboard
