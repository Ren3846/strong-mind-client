import { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../../components/common/Layout'
import {
  Row,
  Col,
  Card,
  Button,
  Space,
  Avatar,
  Skeleton,
  List,
  Pagination,
} from 'antd'
import { ICourse, User } from '../../redux/store/types'
import Preloader from '../../components/common/Preloader'
import TutorShedule from '../../components/tutor/TutorShedule'
import { Link } from 'react-router-dom'
import TeacherMeetings from '../../components/tutor/RequestsMeetings'
import GetLikes from '../../components/common/GetLikes'
import { useSelector } from 'react-redux'
import { StoreType } from '../../redux/store'
import { SearchOutlined, UserOutlined } from '@ant-design/icons'
import { baseImageUrl } from '..'

const TutorDashboard = () => {
  const [courses, setCourses] = useState<ICourse[]>([])
  const [students, setStudents] = useState<User[]>([])
  const [loaded, setLoaded] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const user = useSelector((state: StoreType) => state.auth.user)
  console.log('user', user)

  useEffect(() => {
    axios
      .get('/api/courses/created')
      .then((response) => {
        console.log('Courses', response.data)
        setCourses(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setLoaded(true)
      })
  }, [])

  useEffect(() => {
    const studentIds = user?.students

    const fetchStudentsData = async () => {
      const studentsData = []
      if (studentIds) {
        for (const studentId of studentIds) {
          try {
            const response = await axios.get(`/api/users/${studentId}`)
            studentsData.push(response.data)
          } catch (error) {
            console.error(`Error fetching data for student ${studentId}`)
          }
        }
      }

      setStudents(studentsData)
      setLoaded(true)
    }

    fetchStudentsData()
  }, [user?.students])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = students.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = (page: any) => {
    setCurrentPage(page)
  }

  return (
    <Layout>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title='My courses' style={{ height: '50vh' }}>
            {loaded ? (
              <>
                {' '}
                <ul>
                  {courses.map((item) => (
                    <Card key={item._id} style={{ marginTop: '10px' }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <p key={item._id}>{item.title}</p>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Space size='large'>
                            <GetLikes courseId={item._id} />
                            <Link to={`/mycourses/${item._id}`}>
                              <Button icon={<SearchOutlined />} type='primary'>
                                View
                              </Button>
                            </Link>
                          </Space>
                        </div>
                      </div>
                    </Card>
                  ))}
                </ul>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '10vh',
                    transform: 'translateX(-50%)',
                  }}
                >
                  <Pagination
                    current={currentPage}
                    total={students.length}
                    pageSize={itemsPerPage}
                    onChange={handlePageChange}
                  />
                </div>
              </>
            ) : (
              <Skeleton active />
            )}
          </Card>
        </Col>
        <Col span={12}>
          <Card title='My Students' style={{ height: '50vh' }}>
            {loaded ? (
              <List
                dataSource={currentItems}
                renderItem={(student) => (
                  <List.Item>
                    <Link to={`user/${student._id}`}>
                      <List.Item.Meta
                        avatar={
                          <Avatar src={`${baseImageUrl}/${student.image}`} />
                        }
                        title={student.email}
                      />
                    </Link>
                  </List.Item>
                )}
              />
            ) : (
              <Skeleton active />
            )}
            <div
              style={{
                position: 'absolute',
                bottom: '1rem',
                left: '10vh',
                transform: 'translateX(-50%)',
              }}
            >
              <Pagination
                current={currentPage}
                total={students.length}
                pageSize={itemsPerPage}
                onChange={handlePageChange}
              />
            </div>
          </Card>
          {/* <Card title='My Students'>
            {loaded ? (
              <ul>
                {students.map((student) => (
                  <li style={{ marginTop: '5px' }}>
                    <Avatar
                      icon={<UserOutlined />}
                      style={{ marginRight: '10px' }}
                    />
                    {student.email}
                  </li>
                ))}
              </ul>
            ) : (
              <Skeleton active />
            )}
          </Card> */}
        </Col>

        <Col span={24}>
          <Card title='Requests'>
            <TeacherMeetings />
          </Card>
        </Col>

        <Col span={24}>
          <Card title='Shedule'>
            <TutorShedule />
          </Card>
        </Col>
      </Row>
    </Layout>
  )
}

export default TutorDashboard
