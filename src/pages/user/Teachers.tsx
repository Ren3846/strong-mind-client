import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../../components/common/Layout'
import { Row, Card, Space } from 'antd'
import Preloader from '../../components/common/Preloader'
import { Link } from 'react-router-dom'

interface ITeacher {
  _id: string
  email: string
  password: string
  fullName: string
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
        console.log(response.data)
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
          style={{ width: '80rem', padding: '20px' }}
        >
          {loaded ? (
            <Space direction='horizontal'>
              {topTeachers.map((teacher, index) => (
                <Card key={teacher._id} title={teacher.fullName}>
                  <p>Email: {teacher.email}</p>
                  {/* <p>Phone: {teacher.phone}</p>
                  <p>Balance: {teacher.balance}</p> */}
                  <p>Students: {teacher.students.length}</p>
                  <Link to={`/teacher/${teacher._id}`}>View Details</Link>
                </Card>
              ))}
            </Space>
          ) : (
            <Preloader />
          )}
        </Card>
      </Row>
    </Layout>
  )
}

export default Teachers
