import { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../../components/common/Layout'
import { Row, Col, Card, Button, Space } from 'antd'
import { ICourse, ITeacher } from '../../redux/store/types'
import Preloader from '../../components/common/Preloader'
import TutorShedule from '../../components/tutor/TutorShedule'
import { Link } from 'react-router-dom'
import TeacherMeetings from '../../components/tutor/RequestsMeetings'
import GetLikes from '../../components/common/GetLikes'
import { GetStudents } from '../../components/tutor/GetTutor'
import { useSelector } from 'react-redux'
import { StoreType } from '../../redux/store'

const TutorDashboard = () => {
  const [data, setData] = useState<ICourse[]>([])
  const [loaded, setLoaded] = useState(false)

  const user = useSelector((state: StoreType) => state.auth.user)
  console.log('user', user)

  useEffect(() => {
    axios
      .get('/api/courses/created')
      .then((response) => {
        console.log('Courses', response.data)
        setData(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setLoaded(true)
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
                    <p key={item._id}>{item.title}</p>
                    <GetLikes courseId={item._id} />
                    <Link to={`/mycourses/${item._id}`}>
                      <Button type='primary' style={{ float: 'right' }}>
                        View
                      </Button>
                    </Link>
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
