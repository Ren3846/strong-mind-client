import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Button, Row, Card, Space } from 'antd'
import Layout from '../../components/common/Layout'
import Preloader from '../../components/common/Preloader'

interface ITeacher {
  userId: string
  email: string
  fullName: string
}

const TeacherProfile: React.FC<{}> = () => {
  const { id } = useParams()
  const [loaded, setLoaded] = useState(false)
  const [teacher, setTeacher] = useState<ITeacher | null>(null)

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

  return (
    <Layout>
      <Row align='middle' justify='center'>
        <Card title='Teacher`s profile' style={{ width: '60rem' }}>
          {loaded ? (
            <Space direction='vertical'>
              fullName: {teacher?.fullName}
              Email: {teacher?.email}
              <Button>Chat</Button>
            </Space>
          ) : (
            <Preloader />
          )}
        </Card>
      </Row>
    </Layout>
  )
}

export default TeacherProfile
