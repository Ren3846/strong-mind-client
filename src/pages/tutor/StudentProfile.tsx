import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Button, Row, Card, Space } from 'antd'
import Layout from '../../components/common/Layout'
import Preloader from '../../components/common/Preloader'
import { User } from '../../redux/store/types'
import { WechatOutlined } from '@ant-design/icons'

const StudentProfile: React.FC<{}> = () => {
  const { id } = useParams()
  const [loaded, setLoaded] = useState(false)
  const [student, setStudent] = useState<User | null>(null)

  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`/api/users/${id}`)
      .then(({ data }) => {
        console.log(data)
        setStudent(data)
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
        receiver: student?._id,
      })

      setData(response.data)
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
          title='Student`s profile'
          style={{ width: '60rem', margin: '20px' }}
        >
          {loaded ? (
            <Space direction='vertical'>
              fullName: {student?.fullName}
              Email: {student?.email}
              <Button onClick={handleChat}>
                <WechatOutlined />
                Chat
              </Button>
            </Space>
          ) : (
            <Preloader />
          )}
        </Card>
        {/* <Card
          title='Teacher`s courses'
          style={{ width: '60rem', margin: '20px' }}
        >
          {loaded ? (
            <div>
              {student?.courses.length ? (
                student.courses.map((course) => (
                  <Space>
                    <GetCourses courseId={course} key={student._id + course} />
                  </Space>
                ))
              ) : (
                <p>No students :(</p>
              )}
            </div>
          ) : (
            // <Space direction='vertical'>
            //   fullName: {student?.fullName}
            //   Email: {student?.email}
            //   <Button>Chat</Button>
            // </Space>
            <Preloader />
          )}
        </Card> */}
      </Row>
    </Layout>
  )
}

export default StudentProfile
