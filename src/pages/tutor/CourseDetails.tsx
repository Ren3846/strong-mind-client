import React, { useEffect, useState } from 'react'
import {
  Button,
  Card,
  Divider,
  Rate,
  Row,
  Space,
  Typography,
  message,
} from 'antd'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import Preloader from '../../components/common/Preloader'
import { GetTutor } from '../../components/tutor/GetTutor'
import MyBreadcrumb from '../../components/common/Breadcrumb'
import ManageCourseCover from '../../components/tutor/ManageCourseCover'
import { ICourse, ILesson } from '../../redux/store/types'

const breadcrumbItems = [
  { title: 'Dashboard', link: '/Dashboard' },
  { title: 'My courses', link: '/mycourses' },
  { title: 'Course Info' },
]

const CourseDetails: React.FC = () => {
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
        setError('Error while dawnload data')
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
        title='Course Details'
        style={{ width: '80rem', margin: '20px' }}
        extra={
          <>
            {/* {courseLikes} <LikeFilled /> */}
            <Rate
              allowHalf
              disabled
              defaultValue={course.ratingAverage}
              style={{ color: 'rgb(167 167 255)' }}
            />
          </>
        }
        // cover={
        //   <img
        //     alt='example'
        //     src={`${baseImageUrl}${course.cover}`}
        //     style={{ maxHeight: '450px' }}
        //   />
        // }
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
          <p>Category: {course.category}</p>
          <p>Difficulty: {course.difficulty}</p>
          <p>Price: ${course.meetingPrice}</p>
        </div>
      </Card>

      <Card title='Students' style={{ width: '80rem', margin: '20px' }}>
        {course.students.length ? (
          <div>
            <ul>
              {course.students.map((student: any) => (
                <GetTutor userId={student} key={course._id + student} />
              ))}
            </ul>
          </div>
        ) : (
          <p>Nobody :(</p>
        )}
      </Card>

      <Card title='Lessons' style={{ width: '80rem', margin: '20px' }}>
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
                  {/* <p>Video Key: {lesson.videoKey}</p> */}
                  <p>Duration: {lesson.duration} minutes</p>
                  <Divider />
                  <Space>
                    <Link to={`/lessons/${lesson._id}`}>
                      <Button type='primary'>View Lesson</Button>
                    </Link>
                    <Button
                      danger
                      onClick={() => handleDeleteLesson(lesson._id)}
                    >
                      Delete
                    </Button>
                  </Space>
                </Card>
              </Space>
            ))}
          </ul>
        </div>
        <Link to={`/lessons/create/${course._id}`}>
          <Button style={{ margin: '20px' }}>Add Lesson</Button>
        </Link>
      </Card>
    </Row>
  )
}

export default CourseDetails
