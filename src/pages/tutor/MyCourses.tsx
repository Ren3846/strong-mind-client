import React, { useEffect, useState } from 'react'

import { Button, Card, Divider, Row } from 'antd'
import Layout from 'antd/es/layout/layout'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'

export interface ICourse {
  _id: string
  title: string
  about: string
  price: number
  students: string[]
}

const MyCourses: React.FC = () => {
  const [data, setData] = useState<ICourse[]>([])

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
  }, [])

  return (
    <Row align='middle' justify='center'>
      <Card title='My courses' style={{ width: '60rem' }}>
        <ul>
          {data.map((item) => (
            <Card>
              <Link to={item._id}>
                <li key={item._id}>{item.title}</li>
              </Link>
            </Card>
          ))}
        </ul>

        <Divider />
        <Link to='/mycourses/addcourse'>
          <Button type='primary'>Add course</Button>
        </Link>
      </Card>
    </Row>
  )
}

export default MyCourses
