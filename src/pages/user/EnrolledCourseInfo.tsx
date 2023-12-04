import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Card,
  Row,
  Descriptions,
  Skeleton,
  Divider,
} from 'antd'
import { useParams } from 'react-router-dom'
import Preloader from '../../components/common/Preloader'

import { ICourse, ITeacher } from '../../redux/store/types'
import LessonsListUser from '../../components/user/LessonsListUser'
import MyBreadcrumb from '../../components/common/Breadcrumb'
import RequestMeeting from '../../components/user/RequestMeeting'
import PurchaseMeetings from '../../components/user/PurchaseMeetings'
import { useSelector } from 'react-redux'

const CourseInfo: React.FC = () => {
  const [courseInfo, setCourseInfo] = useState<ICourse | null>(null)
  const user = useSelector((state: any) => state.auth.user)
  console.log('user', user)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')
  const { id } = useParams()

  const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Enrolled ', link: '/enrolled' },
    { title: 'Course ' },
  ]

  useEffect(() => {
    axios
      .get(`/api/courses/${id}`)
      .then((response) => {
        console.log(response.data)
        setCourseInfo(response.data)
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setError('Course not found')
        } else {
          console.error(err)
        }
      })
      .finally(() => {
        setLoaded(true)
      })
  }, [id])

  // if (loading) {
  //   return <Preloader />
  // }

  return (
    <Row align='middle' justify='center'>
      <MyBreadcrumb items={breadcrumbItems} />

      <Card title='Course Details' style={{ width: '80rem', margin: '20px' }}>
        {loaded ? (
          <div>
            {courseInfo ? (
              <>
                <Descriptions>
                  <Descriptions.Item label='Title'>
                    {courseInfo.title}
                  </Descriptions.Item>
                  <Descriptions.Item label='About'>
                    {courseInfo.about}
                  </Descriptions.Item>
                  <Descriptions.Item label='Tagline'>
                    {courseInfo.tagline}
                  </Descriptions.Item>
                  <Descriptions.Item label='Category'>
                    {courseInfo.category}
                  </Descriptions.Item>
                  <Descriptions.Item label='Difficulty'>
                    {courseInfo.difficulty}
                  </Descriptions.Item>
                  <Descriptions.Item label='Price for lesson'>
                    ${courseInfo.meetingPrice}
                  </Descriptions.Item>

                  <Descriptions.Item label='Teacher'>
                    <GetTeacher userId={courseInfo.teacher} />
                  </Descriptions.Item>
                </Descriptions>
                {id ? (
                  <RequestMeeting
                    teacherId={courseInfo.teacher}
                    courseId={id}
                  />
                ) : (
                  <></>
                )}
              </>
            ) : (
              <p>{error}</p>
            )}
          </div>
        ) : (
          <Skeleton active />
        )}
        <Divider />
        {id ? <PurchaseMeetings courseId={id} /> : <></>}
      </Card>

      <Card
        title='Lessons in this Course'
        style={{ width: '80rem', margin: '20px' }}
      >
        <div>
          {courseInfo ? <LessonsListUser courseId={id} /> : <p>{error}</p>}
        </div>
      </Card>

      <Card title='Course Shedule' style={{ width: '80rem', margin: '20px' }}>
        {/* <div>{courseInfo ? <Shedule /> : <p>{error}</p>}</div> */}
      </Card>
    </Row>
  )
}

const GetTeacher: React.FC<{
  userId: string
}> = ({ userId }) => {
  const [user, setUser] = useState<ITeacher | null>(null)
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

  return <div>{user?.email}</div>
}

export default CourseInfo
