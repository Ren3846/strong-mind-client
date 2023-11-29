import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import React, { useLayoutEffect } from 'react'

import Preloader from '../components/common/Preloader'

import Landing from './Landing'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Profile from './user/Profile'
import Courses from './user/AllCourses'

import NotFound from './NotFound'

import { useSelector } from 'react-redux'
import { StoreType } from '../redux/store'
import Navbar from '../components/common/Navbar'

import { USER_ROLE, User } from '../redux/store/types'
import Dashboard from './user/Dashboard'
import Enrolled from './user/Enrolled'
import Meetings from './user/Meetings'
import Course from './user/Course'
import Teachers from './user/Teachers'
import TeacherProfile from './user/TeacherProfile'
import MyCourses from './tutor/MyCourses'
import CreateCourse from './tutor/AddCourse'
import CourseDetails from './tutor/CourseDetails'
import CourseInfo from './user/EnrolledCourseInfo'
import AddLesson from './tutor/AddLesson'
import Lesson from './tutor/Lesson'
import TutorDashboard from './tutor/TutorDashboard'
import LessonUser from './user/Lesson'
import Wallet from './user/Wallet'
import StudentProfile from './tutor/StudentProfile'
import CourseEdit from './tutor/CourseEdit'
import ChatPage from './ChatPage'
import MeetingPage from './MeetingPage'

interface IProtectedRoute {
  condition: boolean
  redirect: string
  children: JSX.Element | JSX.Element[]
}

export const baseImageUrl = 'https://strongmind.fra1.cdn.digitaloceanspaces.com'

export const baseVideoUrl = 'https://strongmind.fra1.digitaloceanspaces.com/'

const ScrollToTop: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const location = useLocation()
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0)
  }, [location.pathname])
  return children
}

const ProtectedRoute: React.FC<IProtectedRoute> = ({
  condition,
  redirect,
  children,
}) => {
  return <>{condition ? children : <Navigate to={redirect} replace />}</>
}

const Router: React.FC<{}> = () => {
  const isLoaded = useSelector<StoreType, boolean>(
    (state: any) => state.auth.loaded,
  )

  const currentUser = useSelector<StoreType, User | null>(
    (state: any) => state.auth.user,
  )

  const isAuthenticated = !!currentUser

  return isLoaded ? (
    <ScrollToTop>
      <>
        <Navbar />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route
            path='/signin'
            element={
              <ProtectedRoute
                condition={!isAuthenticated}
                redirect='/profile'
                children={<SignIn />}
              />
            }
          />
          <Route
            path='/signup'
            element={
              <ProtectedRoute
                condition={!isAuthenticated}
                redirect='/profile'
                children={<SignUp />}
              />
            }
          />

          <Route
            path='/dashboard'
            element={
              <ProtectedRoute
                condition={isAuthenticated}
                redirect='/signin'
                children={
                  isAuthenticated && currentUser.role === USER_ROLE.TEACHER ? (
                    <TutorDashboard />
                  ) : (
                    <Dashboard />
                  )
                }
              />
            }
          />

          <Route
            path='/chat/:chatId'
            element={
              <ProtectedRoute
                condition={isAuthenticated}
                redirect='/signin'
                children={<ChatPage />}
              />
            }
          />

          <Route
            path='/meeting/:meetingId'
            element={
              <ProtectedRoute
                condition={isAuthenticated}
                redirect='/signin'
                children={<MeetingPage />}
              />
            }
          />

          <Route
            path='/meetings'
            element={
              <ProtectedRoute
                condition={isAuthenticated}
                redirect='/signin'
                children={<Meetings />}
              />
            }
          />

          <Route
            path='/enrolled'
            element={
              <ProtectedRoute
                condition={isAuthenticated}
                redirect='/signin'
                children={<Enrolled />}
              />
            }
          />

          <Route
            path='/enrolled/:id/info'
            element={
              <ProtectedRoute
                condition={isAuthenticated}
                redirect='/signin'
                children={<CourseInfo />}
              />
            }
          />

          <Route path='/courses' element={<Courses />} />

          <Route path='/courses/:id' element={<Course />} />

          <Route
            path='/lessons/create/:id'
            element={
              <ProtectedRoute
                condition={
                  isAuthenticated && currentUser.role === USER_ROLE.TEACHER
                }
                redirect='/signin'
                children={<AddLesson />}
              />
            }
          />
          <Route
            path='/lessons/:id'
            element={
              <ProtectedRoute
                condition={
                  isAuthenticated && currentUser.role === USER_ROLE.TEACHER
                }
                redirect='/signin'
                children={<Lesson />}
              />
            }
          />

          <Route
            path='/lessonsuser/:id'
            element={
              <ProtectedRoute
                condition={isAuthenticated}
                redirect='/signin'
                children={<LessonUser />}
              />
            }
          />

          <Route path='/teachers' element={<Teachers />} />
          <Route path='/teacher/:id' element={<TeacherProfile />} />
          <Route path='/user/:id' element={<StudentProfile />} />

          <Route
            path='/profile'
            element={
              <ProtectedRoute
                condition={isAuthenticated}
                redirect='/signin'
                children={<Profile />}
              />
            }
          />

          <Route
            path='/profile/wallet'
            element={
              <ProtectedRoute
                condition={isAuthenticated}
                redirect='/signin'
                children={<Wallet />}
              />
            }
          />
          <Route
            path='/mycourses'
            element={
              <ProtectedRoute
                condition={
                  isAuthenticated && currentUser.role === USER_ROLE.TEACHER
                }
                redirect='/profile'
                children={<MyCourses />}
              />
            }
          />

          <Route
            path='/mycourses/edit/:id'
            element={
              <ProtectedRoute
                condition={
                  isAuthenticated && currentUser.role === USER_ROLE.TEACHER
                }
                redirect='/profile'
                children={<CourseEdit />}
              />
            }
          />
          <Route
            path='/mycourses/addcourse'
            element={
              <ProtectedRoute
                condition={
                  isAuthenticated && currentUser.role === USER_ROLE.TEACHER
                }
                redirect='/profile'
                children={<CreateCourse />}
              />
            }
          />
          <Route
            path='/mycourses/:id'
            element={
              <ProtectedRoute
                condition={
                  isAuthenticated && currentUser.role === USER_ROLE.TEACHER
                }
                redirect='/profile'
                children={<CourseDetails />}
              />
            }
          />

          <Route path='*' element={<NotFound />} />
        </Routes>
        {/* <Footer /> */}
      </>
    </ScrollToTop>
  ) : (
    <Preloader />
  )
}

export default Router
