import React, { useState, useEffect } from 'react'
import Card from 'antd/lib/card'
import axios from 'axios'
import { Button, Skeleton, Space, message } from 'antd'
import { Link } from 'react-router-dom'
import { ILesson } from '../../redux/store/types'

function CourseDetailsUser({ courseId }: any) {
  const [course, setCourse] = useState<any | null>(null)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    axios
      .get(`/api/courses/${courseId}`)
      .then((response) => {
        const courseData = response.data
        setCourse(courseData)
        console.log(courseData)

        const lessonPromises = courseData.lessons.map((lessonId: string) =>
          axios.get(`/api/lessons/${lessonId}`),
        )

        Promise.all(lessonPromises)
          .then((lessonResponses) => {
            const updatedCourseData = {
              ...courseData,
              lessons: lessonResponses.map(
                (lessonResponse) => lessonResponse.data,
              ),
            }
            setCourse(updatedCourseData)
          })
          .catch((lessonError) => {
            console.error(lessonError)
            setError('Error while fetching lesson data')
          })
      })
      .catch((error) => {
        console.error(error)
        setError('Error while data download')
      })
  }, [courseId])

  return (
    <div>
      {course ? (
        <>
          {course.lessons.map((lesson: ILesson) => (
            <Space direction='horizontal'>
              <Card style={{ width: '15rem', margin: '5px' }}>
                <Space direction='vertical'>
                  <h4>{lesson.title}</h4>
                  <p>{lesson.description}</p>
                  {/* <p>Video Key: {lesson.videoKey}</p> */}
                  <p>Duration: {lesson.duration} minutes</p>
                  <Space>
                    <Link to={`/lessonsuser/${lesson._id}`}>
                      <Button type='primary'>View Lesson</Button>
                    </Link>
                  </Space>
                </Space>
              </Card>
            </Space>
          ))}
        </>
      ) : (
        <Skeleton active />
      )}
    </div>
  )
}

export default CourseDetailsUser
