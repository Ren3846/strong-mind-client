import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../components/common/Layout'
import Preloader from '../../components/common/Preloader'
import { SearchOutlined } from '@ant-design/icons'
import {
  Typography,
  Row,
  Col,
  Space,
  Button,
  Select,
  Divider,
  Rate,
} from 'antd'
import { ICourse, IUser } from '../../redux/store/types'
import CustomAvatar from '../../components/common/CustomAvatar'

const CourseTeacher: React.FC<{
  userId: string
}> = ({ userId }) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    axios({
      url: `/api/users/${userId}`,
      method: 'get',
    })
      .then(({ data }) => {
        setUser(data)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setLoaded(true)
      })
  }, [userId])

  return (
    <>
      {loaded && user ? (
        <div
          className='course-user'
          title={user?.email}
          style={{ margin: '5px' }}
        >
          <Space>
            <CustomAvatar avatar={user.avatar} />
            {user.email}
          </Space>
        </div>
      ) : (
        <Preloader />
      )}
    </>
  )
}

const CourseItem: React.FC<ICourse> = (course) => {
  return (
    <div className='course-item course-card'>
      <Space direction='vertical' size='middle' style={{ display: 'flex' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h3>{course.title}</h3>
          <div>
            <Rate
              allowHalf
              disabled
              defaultValue={Math.round(course.ratingAverage * 2) / 2}
              style={{ color: 'rgb(167 167 255)' }}
            />
          </div>
        </div>

        <p>{course.about}</p>
        <div className='course-users'>
          <CourseTeacher
            userId={course.teacher}
            key={course._id + course.teacher}
          />
        </div>
        <span>Price: {course.meetingPrice} $</span>

        <Button type='primary' key={course._id}>
          <Link to={course._id}>Explore</Link>
        </Button>
      </Space>
    </div>
  )
}

const Courses = () => {
  const [courses, setCourses] = useState<ICourse[]>([])
  const [loaded, setLoaded] = useState(false)
  const [filters, setFilters] = useState<Record<string, string>>({
    price: 'all',
    category: 'all',
    difficulty: 'all',
  })

  console.log(courses)

  useEffect(() => {
    axios({
      url: '/api/courses',
      method: 'get',
    })
      .then(({ data }) => {
        console.log('courses', data)
        setCourses(data)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setLoaded(true)
      })
  }, [])

  const handleDifficultyChange = (value: string) => {
    setFilters({ ...filters, difficulty: value })
  }

  const handleCategoryChange = (value: string) => {
    setFilters({ ...filters, category: value })
  }

  const filteredCourses = courses.filter((course) => {
    const difficultyMatch =
      filters.difficulty === 'all' || course.difficulty === filters.difficulty
    const categoryMatch =
      filters.category === 'all' || course.category === filters.category
    return difficultyMatch && categoryMatch
  })

  return (
    <Layout>
      <Row align='middle' justify='center'>
        <Col xs={24} sm={24} md={18} lg={18} xl={20}>
          <div>
            <div>
              <Space>
                <Typography.Text>Filters:</Typography.Text>
                <Select
                  value={filters.difficulty}
                  onChange={handleDifficultyChange}
                >
                  <Select.Option value='all'>All</Select.Option>
                  <Select.Option value='C1'>C1</Select.Option>
                  <Select.Option value='C2'>C2</Select.Option>
                  <Select.Option value='A1'>A1</Select.Option>
                  <Select.Option value='A2'>A2</Select.Option>
                  <Select.Option value='B1'>B1</Select.Option>
                  <Select.Option value='B2'>B2</Select.Option>
                </Select>
                <Select
                  value={filters.category}
                  onChange={handleCategoryChange}
                  style={{ width: 100 }}
                >
                  <Select.Option value='all'>All</Select.Option>
                  <Select.Option value='Grammar'>English</Select.Option>
                  <Select.Option value='Literature'>Russian</Select.Option>
                  <Select.Option value='Grammar2'>Armenian</Select.Option>
                </Select>
                <Button
                  icon={<SearchOutlined />}
                  href='https://www.google.com'
                />
              </Space>
            </div>

            <Divider />

            <Typography.Title level={2} style={{ margin: 0 }}>
              Lessons for Kids/teens A1-A2
            </Typography.Title>

            {loaded ? (
              <div className='courses-wrapper'>
                {filteredCourses.length ? (
                  filteredCourses.map((course) => (
                    <CourseItem {...course} key={course._id} />
                  ))
                ) : (
                  <p>No courses match the selected difficulty and category.</p>
                )}
              </div>
            ) : (
              <Preloader />
            )}
          </div>
          <Divider />
          <Typography.Title level={2} style={{ margin: 0 }}>
            Conversational English A2-C2
          </Typography.Title>

          <Divider />
          <Typography.Title level={2} style={{ margin: 0 }}>
            Test preparation A1-C1
          </Typography.Title>
        </Col>
      </Row>
    </Layout>
  )
}

export default Courses
