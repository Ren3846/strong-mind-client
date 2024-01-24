import React, { useState } from 'react'
import { Form, Input, Button, message, Card, Row, InputNumber } from 'antd'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import useTranslations from '../../lang/useTranslations'

const AddLesson: React.FC = () => {
  const t = useTranslations('AddLesson')

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
              label={t('title')}
              name='title'
              rules={[{ required: true, message: t('enter-title')
            }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={t('description')}
              name='description'
              rules={[
                { required: true, message: t('enter-description') },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={t('videoKey')}
              name='videoKey'
              rules={[
                { required: true, message: t('enter-video-key') },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={t('duration')}
              name='duration'
              rules={[
                { required: true, message: t('enter-duration') },
              ]}
            >
              <InputNumber />
            </Form.Item>

            <Form.Item>
              <Button type='primary' htmlType='submit'>
                {t('addLessonForm')}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Row>
    </div>
  )
}

export default AddLesson
