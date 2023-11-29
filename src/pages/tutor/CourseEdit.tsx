import React, { useEffect, useState } from 'react'
import {
  Button,
  Card,
  Input,
  Form,
  message,
  Skeleton,
  InputNumber,
  Select,
  Row,
} from 'antd'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const EditCourse: React.FC = () => {
  const { id } = useParams()
  const [course, setCourse] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/courses/${id}`)
      setCourse(response.data)
    } catch (error) {
      console.error('Error fetching course data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  const onFinish = async (values: any) => {
    setLoading(true)
    try {
      await axios.patch(`/api/courses/${id}`, values)
      message.success('Course updated successfully')
      navigate('/mycourses/')
      fetchData()
    } catch (error) {
      console.error('Error updating course:', error)
      message.error('Error updating course')
    } finally {
      setLoading(false)
    }
  }

  if (!course) {
    return <Skeleton active />
  }

  return (
    <Row align='middle' justify='center'>
      <Card
        title={`Edit Course: ${course.title}`}
        style={{ width: '80rem', margin: '20px' }}
      >
        <Form
          name='edit-course-form'
          onFinish={onFinish}
          initialValues={{
            title: course.title,
            about: course.about,
            category: course.category,
            difficulty: course.difficulty,
            tagline: course.tagline, // tagline is an array, so no need to join it
            thumbnail: course.thumbnail,
            meetingPrice: course.meetingPrice,
          }}
        >
          <Form.Item
            label='Title'
            name='title'
            rules={[
              { required: true, message: 'Please enter the course title' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='About'
            name='about'
            rules={[{ required: true, message: 'Please enter the course bio' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Category'
            name='category'
            rules={[
              { required: true, message: 'Please enter the course category' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Difficulty'
            name='difficulty'
            rules={[
              { required: true, message: 'Please enter the course difficulty' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Tagline'
            name='tagline'
            rules={[
              { required: true, message: 'Please enter the course tagline' },
            ]}
          >
            {/* Use Select with mode="tags" for multiple tagline values */}
            <Select mode='tags' placeholder='Enter tags'>
              {/* Add options here if you have predefined tags */}
            </Select>
          </Form.Item>

          <Form.Item
            label='Thumbnail'
            name='thumbnail'
            rules={[
              {
                required: true,
                message: 'Please enter the course thumbnail URL',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Meeting Price'
            name='meetingPrice'
            rules={[
              { required: true, message: 'Please enter the meeting price' },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' loading={loading}>
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Row>
  )
}

export default EditCourse
