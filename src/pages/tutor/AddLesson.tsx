import React, { useState, useEffect } from 'react'
import { Form, Input, Button, message, Card, Row, InputNumber } from 'antd'
import { redirect, useParams } from 'react-router-dom'
import axios from 'axios'

const AddLesson: React.FC = () => {
  const [form] = Form.useForm()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)

  const handleCreate = (values: any) => {
    setLoading(true)
    axios
      .post(`/api/lessons/${id}`, values)
      .then((response) => {
        message.success('Course created successfully')
        console.log('Lesson added successfully:', response.data)

        form.resetFields()
      })
      .catch((error) => {
        console.error(error)
        message.error('Error while creating the course')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <Row align='middle' justify='center'>
        <Card title='Add lesson' style={{ width: '80rem', margin: '20px' }}>
          <Form form={form} name='addLessonForm' onFinish={handleCreate}>
            <Form.Item
              label='Title'
              name='title'
              rules={[{ required: true, message: 'Please enter the title!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Description'
              name='description'
              rules={[
                { required: true, message: 'Please enter the description!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Video Key'
              name='videoKey'
              rules={[
                { required: true, message: 'Please enter the video key!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Duration'
              name='duration'
              rules={[
                { required: true, message: 'Please enter the duration!' },
              ]}
            >
              <InputNumber />
            </Form.Item>

            <Form.Item>
              <Button type='primary' htmlType='submit'>
                Add Lesson
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Row>
    </div>
  )
}

export default AddLesson
