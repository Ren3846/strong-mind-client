import React, { useState, useEffect } from 'react'
import { Card, Button, Divider, Space, Row } from 'antd'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

interface ILesson {
  _id: string
  title: string | null
  description: string | null
  videoKey: string | null
  duration: number | null
}

const LessonUser: React.FC = () => {
  const { id } = useParams()
  const [lesson, setLesson] = useState<ILesson | null>(null)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    axios
      .get(`/api/lessons/${id}`)
      .then((response) => {
        setLesson(response.data)
      })
      .catch((error) => {
        console.error(error)
        setError('Error while fetching lesson data')
      })
  }, [id])

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
              </div>
            )}
          </Space>
        </Card>
      </Row>
      <Row align='middle' justify='center'>
        <Card
          title={`Lesson`}
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

          {error && <p>{error}</p>}
        </Card>
      </Row>
    </div>
  )
}

export default LessonUser
