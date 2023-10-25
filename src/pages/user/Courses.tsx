import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../components/common/Layout'
import Preloader from '../../components/common/Preloader'
import { SearchOutlined, UserOutlined } from '@ant-design/icons'
import {
  Typography,
  Row,
  Col,
  Space,
  Avatar,
  Button,
  Select,
  Divider,
  Input,
} from 'antd'
import { ICourse, ITeacher, User } from '../../redux/store/types'
import { SearchBar } from '../../components/common/SearchBar'

const { Title, Paragraph } = Typography

const CourseStudentItem: React.FC<{
  userId: string
}> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null)
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
    <div className='course-user' title={user?.email} style={{ margin: '5px' }}>
      <Space>
        <Avatar icon={<UserOutlined />} />
        {user?.email}
      </Space>
    </div>
  )
}

const CourseItem: React.FC<ICourse> = (course) => {
  return (
    <div className='course-item course-card'>
      <Space direction='vertical' size='middle' style={{ display: 'flex' }}>
        <h3>{course.title}</h3>
        <p>{course.about}</p>
        <div className='course-users'>
          {/* {course.students.length ? (
            course.students.map((user) => (
              <CourseStudentItem userId={user} key={course._id + user} />
            ))
          ) : (
            <p>Пока никого :(</p>
          )} */}{' '}
          <CourseStudentItem
            userId={course.teacher}
            key={course._id + course.teacher}
          />
        </div>
        <span>Price: {course.price} $</span>
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

  // const handleSearch = (query: string) => {
  //   const filtered = courses.filter((course) => {
  //     return course.title.toLowerCase().includes(query.toLowerCase())
  //   })

  //   setFilteredCourses(filtered)
  // }
  return (
    <Layout>
      <Row align='middle' justify='center'>
        <Col xs={24} sm={24} md={18} lg={18} xl={20}>
          <div>
            <div>
              <Space>
                {' '}
                <Typography.Text>Filters:</Typography.Text>
                {/* <SearchBar onSearch={handleSearch} /> */}
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
                  {/* нужно заменить только Armenian Russian English пока  */}
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
        </Col>
      </Row>
    </Layout>
  )
}

export default Courses
