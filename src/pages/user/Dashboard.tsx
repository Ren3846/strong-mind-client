import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../../components/common/Layout'
import { Row, Col, Card, Typography, Button } from 'antd'
import { ICourse, ITeacher } from '../../redux/store/types'
import Preloader from '../../components/common/Preloader'

const { Title } = Typography

const Dashboard = () => {
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
          <Card title='My Enrolled Courses'>
            {loadingCourses ? (
              <Preloader />
            ) : (
              <ul>
                {enrolledCourses.map((course) => (
                  <>
                    <Card key={course._id}>
                      {course.title}
                      <Button type='primary' style={{ float: 'right' }}>
                        View
                      </Button>
                    </Card>
                  </>
                ))}
              </ul>
            )}
          </Card>
        </Col>
        <Col span={12}>
          <Card title='My Tutors'>
            {loadingTeachers ? (
              <Preloader />
            ) : (
              <ul>
                {topTeachers.map((teacher) => (
                  <Card key={teacher._id}>
                    {teacher.email}
                    <Button type='primary' style={{ float: 'right' }}>
                      View
                    </Button>
                  </Card>
                ))}
              </ul>
            )}
          </Card>
        </Col>
        <Col span={24}>
          <Card title='My Lessons'></Card>
        </Col>
        <Col span={24}>
          <Card title='Shedule'></Card>
        </Col>
      </Row>
    </Layout>
  )
}

export default Dashboard
