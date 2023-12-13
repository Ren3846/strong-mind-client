import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../../components/common/Layout'
import {
  Row,
  Col,
  Card,
  Button,
  Space,
  Skeleton,
  List,
  Pagination,
  Rate,
} from 'antd'
import { ICourse, IUser } from '../../redux/store/types'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { SearchOutlined } from '@ant-design/icons'
import MyBreadcrumb from '../../components/common/Breadcrumb'
import MeetingsTeacher from '../../components/tutor/MeetingsTeacher'
import useTranslations from '../../lang/useTranslations'
import CustomAvatar from '../../components/common/CustomAvatar'

const breadcrumbItems = [{ title: 'Home', link: '/' }, { title: 'Dashboard' }]

const TutorDashboard: React.FC = () => {
  const t = useTranslations('TutorDashboard')

  const [courses, setCourses] = useState<ICourse[]>([])
  const [students, setStudents] = useState<IUser[]>([])
  const [loaded, setLoaded] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const user = useSelector((state: IUser) => state.auth.user)

  useEffect(() => {
    axios
      .get('/api/courses/created')
      .then((response) => {
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <Layout>
      <Row gutter={[16, 16]}>
        <MyBreadcrumb items={breadcrumbItems} />

        <Col span={12}>
          <Card title={t('courses')} style={{ height: '50vh' }}>
            {loaded ? (
              <>
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
                            <Rate
                              allowHalf
                              disabled
                              defaultValue={
                                Math.round(item.ratingAverage * 2) / 2
                              }
                              style={{ color: 'rgb(167 167 255)' }}
                            />
                            <Link to={`/mycourses/${item._id}`}>
                              <Button icon={<SearchOutlined />} type='primary'>
                                {t('button_view')}
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
          <Card title={t('students')} style={{ height: '50vh' }}>
            {loaded ? (
              <List
                dataSource={currentItems}
                renderItem={(student) => (
                  <List.Item>
                    <Link to={`/user/${student._id}`}>
                      <List.Item.Meta
                        avatar={<CustomAvatar avatar={student.avatar} />}
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
        </Col>

        <Col span={24}>
          <Card title={t('requests')}>
            <MeetingsTeacher />
          </Card>
        </Col>
      </Row>
    </Layout>
  )
}

export default TutorDashboard
