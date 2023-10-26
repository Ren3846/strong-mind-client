import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../../components/common/Layout'
import {
  Row,
  Col,
  Card,
  Typography,
  Space,
  Divider,
  Button,
  message,
  List,
} from 'antd'
import { ICourse, ITeacher } from '../../redux/store/types'
import Preloader from '../../components/common/Preloader'
import TutorShedule from './TutorShedule'
import { Link } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons'
import TeacherMeetings from '../../components/tutor/Tutor meetings'

const { Title } = Typography

const TutorDashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState<ICourse[]>([])
  const [topTeachers, setTopTeachers] = useState<ITeacher[]>([])

  const [loadingCourses, setLoadingCourses] = useState(true)
  const [loadingTeachers, setLoadingTeachers] = useState(true)

  const [data, setData] = useState<ICourse[]>([])
  const [loaded, setLoaded] = useState(false)

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
      .get('/api/courses/created')
      .then((response) => {
        console.log(response.data)
        setData(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setLoaded(true)
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
          <Card title='My courses'>
            {loaded ? (
              <ul>
                {data.map((item) => (
                  <Card key={item._id} style={{ marginTop: '10px' }}>
                    <Space>
                      <Link to={`/mycourses/${item._id}`}>
                        <li key={item._id}>{item.title}</li>
                      </Link>
                      {/* <Link
                        to={`/mycourses/${item._id}`}
                        style={{ float: 'right' }}
                      >
                        <Button type='primary'>View</Button>
                      </Link> */}
                    </Space>
                  </Card>
                ))}
              </ul>
            ) : (
              <Preloader />
            )}
          </Card>
        </Col>
        <Col span={12}>
          <Card title='My Students'></Card>
        </Col>
        {/* <Col span={12}>
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
        </Col> */}
        <Col span={24}>
          <Card title='Requests'>
            <TeacherMeetings />
          </Card>
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
