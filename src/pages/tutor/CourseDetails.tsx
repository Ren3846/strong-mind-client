import React, { useEffect, useState } from 'react'
import {
  Button,
  Card,
  Divider,
  Rate,
  Row,
  Space,
  message,
} from 'antd'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import Preloader from '../../components/common/Preloader'
import MyBreadcrumb from '../../components/common/Breadcrumb'
import ManageCourseCover from '../../components/tutor/ManageCourseCover'
import { ICourse, ILesson } from '../../redux/store/types'
import GetUser from '../../components/common/GetUser'
import useTranslations from '../../lang/useTranslations'

const breadcrumbItems = [
  { title: 'Dashboard', link: '/Dashboard' },
  { title: 'My courses', link: '/mycourses' },
  { title: 'Course Info' },
]

const CourseDetails: React.FC = () => {
  const t = useTranslations('CourseDetails')
  const { id } = useParams()
  const [course, setCourse] = useState<ICourse>()
  const [lessonsData, setLessonsData] = useState<ILesson[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    axios
      .get(`/api/courses/${id}`)
      .then((response) => {
        setCourse(response.data)
        console.log(response.data)
        fetchLessonData(response.data.lessons)
      })
      .catch((error) => {
        setError('Error')
      })
  }, [id])

  const handleDeleteLesson = (lessonId: string) => {
    axios
      .delete(`/api/lessons/${lessonId}`)
      .then(() => {
        message.success('Lesson delete success')
        setLessonsData((data) =>
          data.filter((lesson) => lesson._id !== lessonId),
        )
      })
      .catch((error) => {
        message.error('Error while delete')
        console.error(error)
      })
  }

  const fetchLessonData = (lessonIds: string[]) => {
    const promises = lessonIds.map((lessonId) => {
      return axios
        .get(`/api/lessons/${lessonId}`)
        .then((response) => response.data)
        .catch((error) => {
          console.error(`Error get data ID ${lessonId}`)
          return null
        })
    })

    Promise.all(promises).then((lessonData) => {
      setLessonsData(lessonData)
    })
  }

  if (!course) {
    return <Preloader />
  }

  return (
    <Row align='middle' justify='center'>
      <MyBreadcrumb items={breadcrumbItems} />

      <Card
        title={t('CourseDetailsTitle')}
        style={{ width: '80rem', margin: '20px' }}
        extra={
          <>
            <Rate
              allowHalf
              disabled
              defaultValue={Math.round(course.ratingAverage * 2) / 2}
              style={{ color: 'rgb(167 167 255)' }}
            />
          </>
        }
      >
        <ManageCourseCover
          courseId={course._id}
          cover={!!course.cover}
          onChange={(newCover: string | null) => {
            setCourse((course: any) => ({
              ...course,
              cover: newCover,
            }))
          }}
        />
        <div>
          <h1>{course.title}</h1>
          <p>{course.about}</p>
          <p>{t('category')} {course.category}</p>
          <p>{t('difficulty')} {course.difficulty}</p>
          <p>{t('price')} ${course.meetingPrice}</p>
        </div>
      </Card>

      <Card title='Students' style={{ width: '80rem', margin: '20px' }}>
        {course.students.length ? (
          <div>
            <ul>
              {course.students.map((student: any) => (
                <GetUser userId={student} key={course._id + student} />
              ))}
            </ul>
          </div>
        ) : (
          <p>{t('NoStudentsMessage')}</p>
        )}
      </Card>

      <Card title={t('LessonsTitle')} style={{ width: '80rem', margin: '20px' }}>
        <div>
          <ul>
            {lessonsData.map((lesson: any) => (
              <Space>
                <Card
                  key={lesson._id}
                  style={{ width: '15rem', margin: '5px' }}
                >
                  <h2>{lesson.title}</h2>
                  <p>{lesson.description}</p>
                  <p>{t('duration')} {lesson.duration} {t('minutes')}</p>
                  <Divider />
                  <Space>
                    <Link to={`/lessons/${lesson._id}`}>
                      <Button type='primary'>{t('LessonTitle')}</Button>
                    </Link>
                    <Button
                      danger
                      onClick={() => handleDeleteLesson(lesson._id)}
                    >
                      {t('LessonDelete')}
                    </Button>
                  </Space>
                </Card>
              </Space>
            ))}
          </ul>
        </div>
        <Link to={`/lessons/create/${course._id}`}>
          <Button style={{ margin: '20px' }}>{t('add-lesson-button')}</Button>
        </Link>
      </Card>
    </Row>
  )
}

export default CourseDetails
