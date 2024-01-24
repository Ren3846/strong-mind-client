import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, Row, Descriptions, Skeleton, Divider, Rate } from 'antd'
import { useParams } from 'react-router-dom'

import LessonsListUser from '../../components/user/LessonsListUser'
import MyBreadcrumb from '../../components/common/Breadcrumb'
import RequestMeeting from '../../components/user/RequestMeeting'
import PurchaseMeetings from '../../components/user/PurchaseMeetings'
import { GetTutor } from '../../components/tutor/GetTutor'
import useTranslations from '../../lang/useTranslations';

const CourseInfo: React.FC = () => {
  const [courseInfo, setCourseInfo] = useState<any>()
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')
  const { id } = useParams()
  const t = useTranslations('CourseInfo');

  const breadcrumbItems = [
    { title: t('dashboard'), link: '/dashboard' },
    { title: t('enrolled'), link: '/enrolled' },
    { title: t('course') },
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
          setError(t('course_not_found'));
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
        title={t('course_details')}
        style={{ width: '80rem', margin: '20px' }}
        extra={
          <Rate
            disabled
            style={{ color: 'rgb(167 167 255)' }}
            defaultValue={Math.round(courseInfo?.ratingAverage * 2) / 2}
          />
        }
      >
        {loaded ? (
          <div>
            {courseInfo ? (
              <>
                <Descriptions>
                  <Descriptions.Item label={t('title')}>
                    {courseInfo.title}
                  </Descriptions.Item>
                  <Descriptions.Item label={t('about')}>
                    {courseInfo.about}
                  </Descriptions.Item>
                  <Descriptions.Item label={t('tagline')}>
                    {courseInfo.tagline}
                  </Descriptions.Item>
                  <Descriptions.Item label={t('category')}>
                    {courseInfo.category}
                  </Descriptions.Item>
                  <Descriptions.Item label={t('difficulty')}>
                    {courseInfo.difficulty}
                  </Descriptions.Item>
                  <Descriptions.Item label={t('price_for_lesson')}>
                    ${courseInfo.meetingPrice}
                  </Descriptions.Item>

                  <Descriptions.Item label={t('teacher')}>
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
        title={t('lessons_in_this_course')}
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
