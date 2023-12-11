import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, Row, Descriptions, Skeleton, Divider, Rate } from 'antd'
import { useParams } from 'react-router-dom'

import { ICourse, ITeacher } from '../../redux/store/types'
import LessonsListUser from '../../components/user/LessonsListUser'
import MyBreadcrumb from '../../components/common/Breadcrumb'
import RequestMeeting from '../../components/user/RequestMeeting'
import PurchaseMeetings from '../../components/user/PurchaseMeetings'
import { GetTutor } from '../../components/tutor/GetTutor'

const CourseInfo: React.FC = () => {
  const [courseInfo, setCourseInfo] = useState<ICourse | null>(null)
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

  return (
    <Row align='middle' justify='center'>
      <MyBreadcrumb items={breadcrumbItems} />

      <Card
        title='Course Details'
        style={{ width: '80rem', margin: '20px' }}
        extra={<Rate disabled defaultValue={courseInfo?.ratingAverage} />}
      >
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
                    <GetTutor userId={courseInfo.teacher} />
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
    </Row>
  )
}

export default CourseInfo
