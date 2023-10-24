import React, { useState, useEffect } from 'react'
import Card from 'antd/lib/card'
import axios from 'axios'
import { Button, Divider, Space, message } from 'antd'
import { Link } from 'react-router-dom'

interface Lesson {
  _id: string
  title: string | null
  description: string | null
  videoKey: string | null
  duration: number | null
}

function LessonsList() {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [error, setError] = useState<string>('')
  const [data, setData] = useState<Lesson[]>([])

  const handleDeleteLesson = (lessonId: string) => {
    axios
      .delete(`/api/lessons/${lessonId}`)
      .then(() => {
        message.success('Курс успешно удален')
        setData((data) => data.filter((course) => course._id !== lessonId))
      })
      .catch((error) => {
        message.error('Ошибка при удалении курса')
        console.error(error)
      })
  }

  useEffect(() => {
    axios
      .get('/api/lessons')
      .then((response) => {
        setLessons(response.data)
        console.log(response)
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error)
        setError('Error while data download')
      })
  }, [])

  return (
    <div>
      {lessons.map((lesson) => (
        <Space>
          <Card key={lesson._id} style={{ width: '15rem', margin: '5px' }}>
            <h2>{lesson.title}</h2>
            <p>{lesson.description}</p>
            <p>Video Key: {lesson.videoKey}</p>
            <p>Duration: {lesson.duration} minutes</p>
            <Divider />
            <Link to={`/lessons/${lesson._id}`}>
              <Button type='primary'>View Lesson</Button>
            </Link>
            <Button danger onClick={() => handleDeleteLesson(lesson._id)}>
              Delete
            </Button>
          </Card>
        </Space>
      ))}
      {error && <p>{error}</p>}
    </div>
  )
}

export default LessonsList
