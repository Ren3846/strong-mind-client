import React, { useState, useEffect } from 'react'
import Card from 'antd/lib/card'
import axios from 'axios'
import { Button, Divider, Space, message } from 'antd'
import { Link } from 'react-router-dom'
import useTranslations from '../../lang/useTranslations'

interface Lesson {
  _id: string
  title: string | null
  description: string | null
  videoKey: string | null
  duration: number | null
}

function LessonsList() {
  const t = useTranslations('LessonsList')

  const [lessons, setLessons] = useState<Lesson[]>([])
  const [error, setError] = useState<string>('')

  const handleDeleteLesson = (lessonId: string) => {
    axios
      .delete(`/api/lessons/${lessonId}`)
      .then(() => {
        message.success(t('lesson-delete-success'))
        setLessons((data) => data.filter((lesson) => lesson._id !== lessonId))
      })
      .catch((error) => {
        message.error(t('error-while-delete'))
        console.error(error)
      })
  }

  useEffect(() => {
    axios
      .get('/api/lessons')
      .then((response) => {
        setLessons(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error)
        setError(t('error-while-data-download'))
      })
  }, [])

  return (
    <div>
      {lessons.map((lesson) => (
        <Space>
          <Card key={lesson._id} style={{ width: '15rem', margin: '5px' }}>
            <h2>{lesson.title}</h2>
            <p>{lesson.description}</p>
            <p>{t('video-key')} {lesson.videoKey}</p>
            <p>{t('duration')} {lesson.duration} {t('minutes')}</p>
            <Divider />
            <Space>
              <Link to={`/lessons/${lesson._id}`}>
                <Button type='primary'>{t('view-lesson')}</Button>
              </Link>
              <Button danger onClick={() => handleDeleteLesson(lesson._id)}>
              {t('delete')}
              </Button>
            </Space>
          </Card>
        </Space>
      ))}
      {error && <p>{error}</p>}
    </div>
  )
}

export default LessonsList
