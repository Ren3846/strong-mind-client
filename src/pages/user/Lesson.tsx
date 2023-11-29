import React, { useState, useEffect, useMemo } from 'react'
import { Card, Button, Divider, Space, Row, message } from 'antd'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { StoreType } from '../../redux/store'
import MyBreadcrumb from '../../components/common/Breadcrumb'
import { ErrorMessage } from '../../components/common/ErrorMessage'

interface ILesson {
  _id: string
  title: string | null
  description: string | null
  videoKey: string | null
  duration: number | null
  likes: string[]
}

const LessonUser: React.FC = () => {
  const user = useSelector((state: StoreType) => state.auth.user)
  const { id } = useParams()
  const [lesson, setLesson] = useState<ILesson | null>(null)
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const [video, setVideo] = useState<string | null>(null)

  const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Enrolled ', link: '/enrolled' },
    { title: 'Course ', link: '/enrolled' },
    { title: 'Lesson ' },
  ]

  useEffect(() => {
    axios
      .get(`/api/lessons/${id}`)
      .then((response) => {
        console.log(response.data)
        setLesson({ ...response.data, isLiked: false })
      })
      .catch((error) => {
        console.error(error)
        setError('Error while fetching lesson data')
      })

    axios
      .get(`/api/lessons/video/${id}`)
      .then((response) => {
        setVideo(response.data)
        console.log('video', response.data)
      })
      .catch((error) => {
        console.error(error)
        setError('Error while fetching lesson video')
      })
  }, [id])

  const lessonLiked = useMemo(
    () => (lesson ? lesson.likes.includes(user?._id ?? '') : false),
    [lesson, user?._id],
  )

  const handleLikeClick = async () => {
    if (!lesson) return

    setLoading(true)

    try {
      const { data } = await axios.patch(`/api/lessons/like/${lesson._id}`)
      setLesson(data)
    } catch (error) {
      console.error(error)
      message.error('Error while liking the lesson')
    } finally {
      setLoading(false)
    }
  }

  const videoSrc = video || ''

  return (
    <div>
      <Row align='middle' justify='center'>
        <MyBreadcrumb items={breadcrumbItems} />

        <Card
          title={`Lesson Info`}
          style={{ width: '80rem', margin: '20px' }}
          className='lesson-card'
        >
          <Space>
            {lesson && (
              <div style={{ width: '15rem', margin: '5px' }}>
                <h2>{lesson.title}</h2>
                <p>{lesson.description}</p>
                {/* <p>Video Key: {lesson.videoKey}</p> */}
                <p>Duration: {lesson.duration} minutes</p>
                <Divider />
                <Button
                  type='primary'
                  icon={lessonLiked ? <HeartFilled /> : <HeartOutlined />}
                  onClick={handleLikeClick}
                  loading={loading}
                >
                  {lessonLiked ? 'Liked' : 'Like'}
                </Button>
              </div>
            )}
          </Space>
        </Card>
        <Card
          title={`Video`}
          style={{ width: '80rem', margin: '20px' }}
          className='lesson-card'
        >
          {lesson && (
            <video
              src={videoSrc}
              controls
              style={{ width: '100%', maxWidth: '800px', maxHeight: '500px' }}
            >
              Your browser does not support the video tag.
            </video>
          )}
        </Card>
      </Row>

      <ErrorMessage message={error} />
    </div>
  )
}

export default LessonUser
