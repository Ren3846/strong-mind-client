import React, { useState, useEffect } from 'react'
import { Card, Button, Divider, Space, Row, message } from 'antd'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'

interface ILesson {
  _id: string
  title: string | null
  description: string | null
  videoKey: string | null
  duration: number | null
  isLiked: boolean
}

const LessonUser: React.FC = () => {
  const { id } = useParams()
  const [lesson, setLesson] = useState<ILesson | null>(null)
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

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
  }, [id])

  const handleLikeClick = async () => {
    if (!lesson) return

    setLoading(true)

    try {
      await axios.patch(`/api/lessons/like/${lesson._id}`)
      setLesson({ ...lesson, isLiked: !lesson.isLiked })
      message.success(
        lesson.isLiked ? 'Unliked the lesson' : 'Liked the lesson',
      )
    } catch (error) {
      console.error(error)
      message.error('Error while liking the lesson')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Row align='middle' justify='center'>
        <Card
          title={`Lesson`}
          style={{ width: '60rem', margin: '20px' }}
          className='lesson-card'
        >
          <Space>
            {lesson && (
              <div style={{ width: '15rem', margin: '5px' }}>
                <h2>{lesson.title}</h2>
                <p>{lesson.description}</p>
                <p>Video Key: {lesson.videoKey}</p>
                <p>Duration: {lesson.duration} minutes</p>
                <Divider />
                <Button
                  type='primary'
                  icon={lesson.isLiked ? <HeartFilled /> : <HeartOutlined />}
                  onClick={handleLikeClick}
                  loading={loading}
                >
                  {lesson.isLiked ? 'Liked' : 'Like'}
                </Button>
              </div>
            )}
          </Space>
        </Card>
        <Card
          title={`Video`}
          style={{ width: '60rem', margin: '20px' }}
          className='lesson-card'
        >
          {lesson && lesson.videoKey && (
            <video
              src={lesson.videoKey}
              controls
              style={{ width: '100%', maxWidth: '800px' }}
            >
              Your browser does not support the video tag.
            </video>
          )}
        </Card>
      </Row>

      {error && <p>{error}</p>}
    </div>
  )
}

export default LessonUser
