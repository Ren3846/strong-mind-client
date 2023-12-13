import React, { useState, useEffect } from 'react'
import { Card, Button, Divider, Space, Row, Upload, message } from 'antd'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { UploadOutlined } from '@ant-design/icons'

interface ILesson {
  _id: string
  title: string | null
  description: string | null
  videoKey: string | null
  duration: number | null
}

const Lesson: React.FC = () => {
  const { id } = useParams()
  const [lesson, setLesson] = useState<ILesson | null>(null)
  const [error, setError] = useState<string>('')
  const [videoUrl, setVideoUrl] = useState('')

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

  const customRequest = ({ file, onSuccess, onError }: any) => {
    const formData = new FormData()
    formData.append('video', file)

    axios
      .post(`/api/lessons/video/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        onSuccess(response, file)
        message.success('Video uploaded successfully')
      })
      .catch((error) => {
        onError('Error uploading video', error, file)
        message.error('Error uploading video')
      })
  }

  return (
    <div>
      <Row align='middle' justify='center'>
        <Card title={`Lesson`} style={{ width: '60rem', margin: '20px' }}>
          <Space>
            {lesson && (
              <div style={{ width: '15rem', margin: '5px' }}>
                <h2>{lesson.title}</h2>
                <p>{lesson.description}</p>
                <p>{lesson.duration}</p>
                <p>{lesson.videoKey}</p>
                <Divider />

                {videoUrl ? (
                  <video controls width='640' height='360'>
                    <source src={videoUrl} type='video/mp4' />
                    Your browser does not support the video.
                  </video>
                ) : (
                  <Upload customRequest={customRequest} showUploadList={false}>
                    <Button icon={<UploadOutlined />}>Upload Video</Button>
                  </Upload>
                )}
                <Divider />

                <p>Duration: {lesson.duration} minutes</p>
              </div>
            )}
          </Space>
        </Card>
      </Row>

      {error && <p>{error}</p>}
    </div>
  )
}

export default Lesson
