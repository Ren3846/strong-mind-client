import React, { useState, useEffect } from 'react'
import Card from 'antd/lib/card'
import axios from 'axios'
import { Button, Divider } from 'antd'

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
        setError('Error while data dawnload')
      })
  }, [])

  return (
    <div>
      {lessons.map((lesson) => (
        <Card key={lesson._id} style={{ width: '15rem' }}>
          <h2>{lesson.title}</h2>
          <p>{lesson.description}</p>
          <p>Video Key: {lesson.videoKey}</p>
          <p>Duration: {lesson.duration} minutes</p>
          <Divider />
          <Button type='primary'>View Lesson</Button>
        </Card>
      ))}
      {error && <p>{error}</p>}
    </div>
  )
}

export default LessonsList
