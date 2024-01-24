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
import { ICourse } from '../../redux/store/types'
import useTranslations from '../../lang/useTranslations'

const EditCourse: React.FC = () => {
  const t = useTranslations('EditCourse')

  const { id } = useParams()
  const [course, setCourse] = useState<ICourse>()
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
      message.success(t('CourseUpdatedSuccessfully'))
      navigate('/mycourses/')
      fetchData()
    } catch (error) {
      console.error('Error updating course:', error)
      message.error(t('ErrorUpdatingCourse'))
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
        title={`${t('EditCourse')}: ${course.title}`}
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
            tagline: course.tagline,
            meetingPrice: course.meetingPrice,
          }}
        >
          <Form.Item
            label={t('Title')}
            name='title'
            rules={[
              { required: true, message: t('PleaseEnterCourseTitle') },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={t('About')}
            name='about'
            rules={[{ required: true, message: t('PleaseEnterCourseBio') }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('Category')}
            name='category'
            rules={[
              { required: true, message: t('PleaseEnterCourseCategory') },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={t('Difficulty')}
            name='difficulty'
            rules={[
              { required: true, message: t('PleaseEnterCourseDifficulty') },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={t('Tagline')}
            name='tagline'
            rules={[
              { required: true, message: t('PleaseEnterCourseTagline') },
            ]}
          >
            <Select mode='tags' placeholder={t('EnterTags')}>
            </Select>
          </Form.Item>

          <Form.Item
            label={t('Thumbnail')}
            name='thumbnail'
            rules={[
              {
                required: true,
                message: t('PleaseEnterCourseThumbnailURL'),
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={t('MeetingPrice')}
            name='meetingPrice'
            rules={[
              { required: true, message: t('PleaseEnterMeetingPrice') },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' loading={loading}>
              {t('SaveChanges')}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Row>
  )
}

export default EditCourse
