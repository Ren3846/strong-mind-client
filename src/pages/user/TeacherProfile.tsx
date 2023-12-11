import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Button, Row, Card, Space, Avatar } from 'antd'
import Layout from '../../components/common/Layout'
import Preloader from '../../components/common/Preloader'
import { ITeacher } from '../../redux/store/types'
import { GetCourses } from '../../components/tutor/GetCourses'
import { WechatOutlined } from '@ant-design/icons'
import CustomAvatar from '../../components/common/CustomAvatar'

const TeacherProfile: React.FC<{}> = () => {
  const { id } = useParams()
  const [loaded, setLoaded] = useState(false)
  const [teacher, setTeacher] = useState<ITeacher | null>(null)

  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`/api/users/${id}`)
      .then(({ data }) => {
        console.log(data)
        setTeacher(data)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setLoaded(true)
      })
  }, [id])

  const handleChat = async () => {
    try {
      const response = await axios.post('/api/chat', {
        receiver: teacher?._id,
      })

      setError(null)

      if (response.data?._id) {
        navigate(`/chat/${response.data._id}`)
      }
    } catch (error) {
      setError('Произошла ошибка при выполнении запроса')
      console.error('Ошибка Axios:', error)
    }
  }

  return (
    <Layout>
      <Row align='middle' justify='center'>
        <Card
          title={`Teacher Profile`}
          style={{ width: '60rem', margin: '20px' }}
          extra={<CustomAvatar avatar={teacher?.avatar} />}
        >
          {loaded ? (
            <Space direction='vertical'>
              {`FullName: ${teacher?.fullName}`}
              {`Email: ${teacher?.email}`}
              <Button onClick={handleChat}>
                <WechatOutlined />
                Chat
              </Button>
            </Space>
          ) : (
            <Preloader />
          )}
        </Card>
        <Card
          title='Teacher`s courses'
          style={{ width: '60rem', margin: '20px' }}
        >
          {loaded ? (
            <div>
              {teacher?.courses.length ? (
                teacher.courses.map((course) => (
                  <Space key={teacher._id + course}>
                    <GetCourses courseId={course} />
                  </Space>
                ))
              ) : (
                <p>No courses :(</p>
              )}
            </div>
          ) : (
            <Preloader />
          )}
        </Card>
      </Row>
    </Layout>
  )
}

export default TeacherProfile
