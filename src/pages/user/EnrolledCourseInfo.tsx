import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from 'antd/es/layout/layout'
import { Card, Row, Descriptions, Avatar } from 'antd'
import { useParams } from 'react-router-dom'
import Shedule from '../../components/user/Shedule'
import Preloader from '../../components/common/Preloader'
import { UserOutlined } from '@ant-design/icons'

interface ICourseInfo {
  _id: string
  title: string
  teacher: string
  students: string[]
  about: string
  tagline: string
  category: string
  difficulty: string
  thumbnail: string
  price: number
  isVisible: boolean
  lessons: string[]
  __v: number
}
interface ITeacher {
  _id: string
  email: string
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

const CourseInfo: React.FC = () => {
  const [courseInfo, setCourseInfo] = useState<ICourseInfo | null>(null)
  const [teacher, setTeacher] = useState<ITeacher | null>(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { id } = useParams()

  useEffect(() => {
    axios
      .get(`/api/courses/${id}`)
      .then((response) => {
        console.log(response.data)
        setCourseInfo(response.data)
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setError('Course not found')
        } else {
          console.error(err)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <Preloader />
  }

  return (
    <Row align='middle' justify='center'>
      <Card title='Course Details' style={{ width: '80rem' }}>
        <div>
          {courseInfo ? (
            <Descriptions>
              <Descriptions.Item label='Title'>
                {courseInfo.title}
              </Descriptions.Item>
              <Descriptions.Item label='About'>
                {courseInfo.about}
              </Descriptions.Item>
              <Descriptions.Item label='Tagline'>
                {courseInfo.tagline}
              </Descriptions.Item>
              <Descriptions.Item label='Category'>
                {courseInfo.category}
              </Descriptions.Item>
              <Descriptions.Item label='Difficulty'>
                {courseInfo.difficulty}
              </Descriptions.Item>
              <Descriptions.Item label='Price'>
                ${courseInfo.price}
              </Descriptions.Item>
              <Descriptions.Item label='Is Visible'>
                {courseInfo.isVisible ? 'Yes' : 'No'}
              </Descriptions.Item>
              <Descriptions.Item label='Teacher'>
                <GetTeacher userId={courseInfo.teacher} />
              </Descriptions.Item>
            </Descriptions>
          ) : (
            <p>{error}</p>
          )}
        </div>
      </Card>
      <Card
        title='Course Shedule'
        style={{ width: '80rem', marginTop: '20px' }}
      >
        <div>{courseInfo ? <Shedule /> : <p>{error}</p>}</div>
      </Card>
    </Row>
  )
}

const GetTeacher: React.FC<{
  userId: string
}> = ({ userId }) => {
  const [user, setUser] = useState<ITeacher | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    axios({
      url: `/api/users/${userId}`,
      method: 'get',
    })
      .then(({ data }) => {
        setUser(data)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setLoaded(true)
      })
  }, [userId])

  return <div>{user?.email}</div>
}

export default CourseInfo
