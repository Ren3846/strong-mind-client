import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Button, Row, Card, Space } from 'antd'
import Layout from '../../components/common/Layout'

interface ITeacher {
  userId: string
  email: string
  username: string
}

const TeacherProfile: React.FC<{}> = () => {
  const { id } = useParams()
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
  }, [id])

  return (
    <Layout>
      <Row align='middle' justify='center'>
        <Card title='Teacher`s profile' style={{ width: '60rem' }}>
          <Space direction='vertical'>
            Username: {teacher?.username}
            Email: {teacher?.email}
            <Button>Chat</Button>
          </Space>
        </Card>
      </Row>
    </Layout>
  )
}

export default TeacherProfile
