import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../../components/common/layout'
import { Row, Card, Space } from 'antd'
import Preloader from '../../components/common/Preloader'

interface ITeacher {
  _id: string
  email: string
  password: string
  username: string
  phone: string
  isBlocked: boolean
  students: string[]
  liveLessonSchedule: any[]
  balance: number
  history: any[]
  courses: string[]
  meetings: any[]
}

const Teachers: React.FC = () => {
  const [topTeachers, setTopTeachers] = useState<ITeacher[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    axios
      .get<ITeacher[]>('/api/users/top')
      .then((response) => {
        console.log(response)
        setTopTeachers(response.data)
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
      <Row align='middle' justify='center'>
        <Card
          title={`Top 5 tutors`}
          style={{ width: '60rem', padding: '20px' }}
        >
          {loaded ? (
            <ul>
              {topTeachers.map((teacher, index) => (
                <li key={teacher._id}>
                  {index + 1}. {teacher.username}
                </li>
              ))}
            </ul>
          ) : (
            <Preloader />
          )}
        </Card>
      </Row>
    </Layout>
  )
}

export default Teachers
