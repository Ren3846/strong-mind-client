import React, { useEffect, useState } from 'react'

import { Button, Card, Divider, Row, Space, message } from 'antd'
import Layout from 'antd/es/layout/layout'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
  BulbTwoTone,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import Preloader from '../../components/common/Preloader'
import { deleteCourse } from '../../redux/actions/course'

export interface ICourse {
  _id: string
  title: string
  about: string
  price: number
  students: string[]
}

const MyCourses: React.FC = () => {
  const [data, setData] = useState<ICourse[]>([])
  const [loaded, setLoaded] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    axios
      .get('/api/courses/created')
      .then((response) => {
        console.log(response)
        console.log(response.data)

        setData(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setLoaded(true)
      })
  }, [])

  const handleDeleteCourse = (courseId: string) => {
    axios
      .delete(`/api/courses/${courseId}`)
      .then(() => {
        message.success('Курс успешно удален')
        dispatch(deleteCourse(courseId))
      })
      .catch((error) => {
        message.error('Ошибка при удалении курса')
        console.error(error)
      })
  }

  return (
    <Row align='middle' justify='center'>
      <Card title='My courses' style={{ width: '60rem' }}>
        {loaded ? (
          <ul>
            {data.map((item) => (
              <Card style={{ margin: '20px' }}>
                <Space>
                  <Link to={item._id}>
                    <li key={item._id}>{item.title}</li>
                  </Link>
                  <Divider type='vertical' />
                  <Button
                    type='primary'
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteCourse(item._id)}
                  />

                  <Link to={item._id}>
                    <Button type='primary' icon={<SearchOutlined />} />
                  </Link>

                  <Button type='default' icon={<EditOutlined />} />
                </Space>
              </Card>
            ))}
          </ul>
        ) : (
          <Preloader />
        )}

        <Divider />
        <Link to='/mycourses/addcourse'>
          <Button type='primary' icon={<PlusOutlined />}>
            Add course
          </Button>
        </Link>
      </Card>
    </Row>
  )
}

export default MyCourses
