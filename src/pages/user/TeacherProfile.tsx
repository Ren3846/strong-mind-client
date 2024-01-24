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
import useTranslations from '../../lang/useTranslations'

const TeacherProfile: React.FC<{}> = () => {
  const { id } = useParams()
  const [loaded, setLoaded] = useState(false)
  const [teacher, setTeacher] = useState<ITeacher | null>(null)

  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()
  const t = useTranslations('TeacherProfile');

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
      setError(t('error_chat'));
      console.error('Axios Error:', error)
    }
  }

  return (
    <Layout>
      <Row align='middle' justify='center'>
        <Card
          title={t('teacher_profile')}
          style={{ width: '60rem', margin: '20px' }}
          extra={<CustomAvatar avatar={teacher?.avatar} />}
        >
          {loaded ? (
            <Space direction='vertical'>
              {`${t('full_name')}: ${teacher?.fullName}`}
              {`${t('email')}: ${teacher?.email}`}
              <Button onClick={handleChat}>
                <WechatOutlined />
                {t('chat')}
              </Button>
            </Space>
          ) : (
            <Preloader />
          )}
        </Card>
        <Card
          title={t('teacher_courses')}
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
                <p>{t('no_courses')}</p>
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