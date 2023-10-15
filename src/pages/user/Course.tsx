import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface ICourse {
  _id: string
  title: string
  about: string
  price: number
  students: string[]
}

interface IUser {
  _id: string
  email: string
  username: string
  role: "user" | "teacher" | "admin"
  balance: number
}

const CourseStudentItem: React.FC<{userId: string}> = ({userId}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios({
      url: `/api/users/${userId}`,
      method: "get"
    }).then(({data}) => {
      console.log(data)
      setUser(data);
    }).finally(() => {
      setLoaded(true)
    })
  }, [userId])

  return (
    <div className='course-user' title={user?.email}>

    </div>
  )
}

const CourseItem: React.FC<ICourse> = (course) => {
  return (
    <div className='course-item'>
        <h3>{course.title}</h3>
        <p>{course.about}</p>
        <div className='course-users'>
          {
            course.students.length
              ? course.students.map((user) => <CourseStudentItem userId={user} key={course._id + user} />)
              : <p>Пока никого :(</p>
          }
        </div>
    </div>
  )
}

const Course = () => {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios({
      url: "/api/courses",
      method: "get"
    }).then(({data}) => {
      console.log("courses", data);
      setCourses(data);
    }).catch((error) => {
      console.error(error)
    }).finally(() => {
      setLoaded(true);
    })
  }, [])

  return (
    <div>
      {
        loaded
          ? (
            <div className='courses-wrapper'>
              {
                courses.length
                  ? courses.map(course => <CourseItem {...course} key={course._id} />)
                  : <p>Нет курсов :(</p>
              }
            </div>
          )
          :
          (
            <div className='preloader'>
              loading...
            </div>
          )
      }
    </div>
  )
}

export default Course