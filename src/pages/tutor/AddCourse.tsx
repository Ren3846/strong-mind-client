import React, { useState } from 'react'
import {
  Form,
  Input,
  Button,
  Select,
  Card,
  Row,
  message,
  InputNumber,
} from 'antd'
import axios from 'axios'

const { Option } = Select

const CreateCourse: React.FC = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleCreate = (values: any) => {
    setLoading(true)
    axios
      .post('/api/courses', values)
      .then((response) => {
        message.success('Course created successfully')
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
    <Row align='middle' justify='center'>
      <Card title='Create Course' style={{ width: '60rem' }}>
        <Form form={form} name='create-course' onFinish={handleCreate}>
          <Form.Item
            label='Title'
            name='title'
            rules={[{ required: true, message: 'Enter the course title' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Description'
            name='about'
            rules={[
              { required: true, message: 'Enter the course description' },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label='Category'
            name='category'
            rules={[{ required: true, message: 'Select a category' }]}
          >
            <Select>
              <Option value='English'>English</Option>
              <Option value='Russian'>russian</Option>
              <Option value='Armenian'>Armenian</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label='Difficulty'
            name='difficulty'
            rules={[{ required: true, message: 'Select a difficulty level' }]}
          >
            <Select>
              <Option value='A1'>A1</Option>
              <Option value='A2'>A2</Option>
              <Option value='B1'>B1</Option>
              <Option value='B2'>B2</Option>
              <Option value='C1'>C1</Option>
              <Option value='C2'>C2</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label='Tagline'
            name='tagline'
            rules={[{ required: true, message: 'Enter a tag' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Thumbnail Link'
            name='thumbnail'
            rules={[{ required: true, message: 'Enter the thumbnail link' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Price'
            name='price'
            rules={[{ required: true, message: 'Enter the price' }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' loading={loading}>
              Create Course
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Row>
  )
}

export default CreateCourse
