import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../../components/common/Layout'
import { Row, Col, Card, Typography } from 'antd'
import { ICourse, ITeacher } from '../../redux/store/types'
import Preloader from '../../components/common/Preloader'
import TutorShedule from './TutorShedule'

const { Title } = Typography

const TutorDashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState<ICourse[]>([])
  const [topTeachers, setTopTeachers] = useState<ITeacher[]>([])
  const [loadingCourses, setLoadingCourses] = useState(true)
  const [loadingTeachers, setLoadingTeachers] = useState(true)

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

    axios
      .get('/api/users/top')
      .then((response) => {
        setTopTeachers(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setLoadingTeachers(false)
      })
  }, [])

  return (
    <Layout>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title='My Courses'></Card>
        </Col>
        <Col span={12}>
          <Card title='Top Teachers'>
            {loadingTeachers ? (
              <Preloader />
            ) : (
              <ul>
                {topTeachers.map((teacher) => (
                  <li key={teacher._id}>{teacher.email}</li>
                ))}
              </ul>
            )}
          </Card>
        </Col>
        <Col span={12}>
          <Card title='My Lessons'></Card>
        </Col>
        <Col span={12}>
          <Card title='My Students'></Card>
        </Col>
        <Col span={24}>
          <Card title='Shedule'>
            <TutorShedule />
          </Card>
        </Col>
      </Row>
    </Layout>
  )
}

export default TutorDashboard
