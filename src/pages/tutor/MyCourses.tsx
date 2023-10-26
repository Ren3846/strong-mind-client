import React, { useEffect, useState } from 'react'

import { Button, Card, Divider, Row, Space, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import Preloader from '../../components/common/Preloader'
import { ICourse } from '../../redux/store/types'

const MyCourses: React.FC = () => {
  const [data, setData] = useState<ICourse[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    axios
      .get('/api/courses/created')
      .then((response) => {
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
        message.success('Delete course successful')
        setData((data) => data.filter((course) => course._id !== courseId))
      })
      .catch((error) => {
        message.error('Error delete course')
        console.error(error)
      })
  }

  return (
    <Row align='middle' justify='center'>
      <Card title='My courses' style={{ width: '60rem', margin: '20px' }}>
        {loaded ? (
          <ul>
            {data.map((item) => (
              <Card key={item._id} style={{ margin: '20px' }}>
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
