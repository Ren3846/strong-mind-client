import React, { useState, useEffect, useMemo } from 'react'
import { Card, Button, Divider, Space, Row, message } from 'antd'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import MyBreadcrumb from '../../components/common/Breadcrumb'
import { ErrorMessage } from '../../components/common/ErrorMessage'
import { ILesson, IUser } from '../../redux/store/types'
import useTranslations from '../../lang/useTranslations';

const LessonUser: React.FC = () => {
  const user = useSelector((state: IUser) => state.auth.user)
  const { id } = useParams()
  const [lesson, setLesson] = useState<ILesson | null>(null)
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const [video, setVideo] = useState<string | null>(null)
  const t = useTranslations('LessonUser');

  const breadcrumbItems = [
    { title: t('dashboard'), link: '/dashboard' },
    { title: t('enrolled'), link: '/enrolled' },
    { title: t('course'), link: '/enrolled' },
    { title: t('lesson') },
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
        setError(t('error_fetching_lesson_data'));
      })

    axios
      .get(`/api/lessons/video/${id}`)
      .then((response) => {
        setVideo(response.data)
        console.log('video', response.data)
      })
      .catch((error) => {
        console.error(error)
        setError(t('error_fetching_lesson_video'));
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
      message.error(t('error_liking_lesson'));
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
          title={t('lesson_info')}
          style={{ width: '80rem', margin: '20px' }}
          className='lesson-card'
        >
          <Space>
            {lesson && (
              <div style={{ width: '15rem', margin: '5px' }}>
                <h2>{lesson.title}</h2>
                <p>{lesson.description}</p>
                <p>{t('duration')}: {lesson.duration} minutes</p>
                <Divider />
                <Button
                  type='primary'
                  icon={lessonLiked ? <HeartFilled /> : <HeartOutlined />}
                  onClick={handleLikeClick}
                  loading={loading}
                >
                  {lessonLiked ? t('liked') : t('like')}
                </Button>
              </div>
            )}
          </Space>
        </Card>
        <Card
          title={t('video')}
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
