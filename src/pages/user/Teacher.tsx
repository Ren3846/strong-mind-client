import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Button, Row, Card, Space } from 'antd'
import Layout from '../../components/common/Layout'
import Preloader from '../../components/common/Preloader'
import { ITeacher } from '../../redux/store/types'
import { GetCourses } from '../../components/tutor/GetCourses'

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
        <Card
          title='Teacher`s profile'
          style={{ width: '60rem', margin: '20px' }}
        >
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
        <Card
          title='Teacher`s courses'
          style={{ width: '60rem', margin: '20px' }}
        >
          {loaded ? (
            <div>
              {teacher?.courses.length ? (
                teacher.courses.map((course) => (
                  <GetCourses courseId={course} key={teacher._id + course} />
                ))
              ) : (
                <p>Пока никого :(</p>
              )}
            </div>
          ) : (
            // <Space direction='vertical'>
            //   fullName: {teacher?.fullName}
            //   Email: {teacher?.email}
            //   <Button>Chat</Button>
            // </Space>
            <Preloader />
          )}
        </Card>
      </Row>
    </Layout>
  )
}

export default TeacherProfile
