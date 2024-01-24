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
import { useNavigate } from 'react-router-dom'
import useTranslations from '../../lang/useTranslations'

const { Option } = Select

const CreateCourse: React.FC = () => {
  const t = useTranslations('CreateCourse')
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleCreate = (values: any) => {
    setLoading(true)

    axios
      .post('/api/courses', values)
      .then((response) => {
        message.success('Course created successfully')
        console.log(response.data)

        const courseId = response.data._id
        navigate(`/mycourses/${courseId}`)
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
      <Card title={t('create-course')} style={{ width: '60rem' }}>
        <Form form={form} name='create-course' onFinish={handleCreate}>
          <Form.Item
            label={t('title')}
            name='title'
            rules={[{ required: true, message: t('enter-title') }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('description')}
            name='about'
            rules={[
              { required: true, message: t('enter-description') },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label={t('category')}
            name='category'
            rules={[{ required: true, message: t('select-category') }]}
          >
            <Select>
              <Option value='English'>English</Option>
              <Option value='Russian'>Russian</Option>
              <Option value='Armenian'>Armenian</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label={t('difficulty')}
            name='difficulty'
            rules={[{ required: true, message: t('select-difficulty') }]}
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
            label={t('tagline')}
            name='tagline'
            rules={[{ required: true, message: t('enter-tag') }]}
          >
            <Select mode='tags' placeholder={t('enter-tag')}></Select>
          </Form.Item>

          <Form.Item
            label={t('price-per-meeting')}
            name='meetingPrice'
            rules={[
              { required: true, message: t('enter-price') },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' loading={loading}>
            {t('create-course-button')}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Row>
  )
}

export default CreateCourse
