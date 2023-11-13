import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../../components/common/Layout'
import {
  Row,
  Col,
  Card,
  Typography,
  Button,
  Space,
  Avatar,
  Skeleton,
} from 'antd'
import { ICourse, ITeacher } from '../../redux/store/types'
import Preloader from '../../components/common/Preloader'
import StepsDashboard from '../../components/user/Steps'
import { Link } from 'react-router-dom'
import Shedule from '../../components/user/Shedule'
import LessonsListUser from '../../components/user/LessonsListUser'
import { UserOutlined } from '@ant-design/icons'
import { baseImageUrl } from '..'
import MyBreadcrumb from '../../components/common/Breadcrumb'
import BookedMeetings from '../../components/tutor/ReqMeetings'

const { Title } = Typography

const breadcrumbItems = [{ title: 'Home', link: '/' }, { title: 'Dashboard' }]

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
        <MyBreadcrumb items={breadcrumbItems} />
        {/* <Col span={24}>
          <StepsDashboard />
        </Col> */}
        <Col span={12}>
          <Card title='My Enrolled Courses'>
            {loadingCourses ? (
              <Skeleton active />
            ) : (
              <ul>
                {enrolledCourses.map((course) => (
                  <>
                    <Card key={course._id} style={{ marginTop: '20px' }}>
                      {course.title}
                      <Link to={`/enrolled/${course._id}/info`}>
                        <Button type='primary' style={{ float: 'right' }}>
                          View
                        </Button>
                      </Link>
                    </Card>
                  </>
                ))}
              </ul>
            )}
          </Card>
        </Col>
        <Col span={12}>
          <Card title='My Tutors'>
            {/* {loadingTeachers ? (
              <Skeleton active />
            ) : (
              <ul>
                {topTeachers.map((teacher) => (
                  <Card key={teacher._id} style={{ marginTop: '20px' }}>
                    <Avatar
                      src={`${baseImageUrl}/${teacher.image}`}
                      style={{ marginRight: '10px' }}
                    />
                    {teacher.email}
                    <Link to={`/teacher/${teacher._id}`}>
                      <Button type='primary' style={{ float: 'right' }}>
                        View
                      </Button>
                    </Link>
                  </Card>
                ))}
              </ul>
            )} */}
          </Card>
        </Col>

        <Col span={24}>
          <Card title='My Lessons'>
            {/* <LessonsListUser /> */}
            <BookedMeetings />
          </Card>
        </Col>
        <Col span={24}>
          <Card title='Shedule'>
            <Shedule />
          </Card>
        </Col>
      </Row>
    </Layout>
  )
}

export default Dashboard
