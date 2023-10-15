import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import Navbar from '../components/user/Navbar'
import UserPrivate from '../components/auth/UserPrivate'

import SignIn from '../pages/user/SignIn'
import SignUp from '../pages/user/SignUp'
import HeroUser from '../pages/user/HeroUser'
import NotFound from '../pages/NotFound'
import Explore from '../pages/user/Explore'
import Course from '../pages/user/Course'
// import Enrolled from '../pages/user/Enrolled'
// import ViewCourse from '../pages/user/ViewCourse'
import Profile from '../pages/user/Profile'

// import CourseOwned from '../pages/user/CourseOwned'
// import ViewTransactions from '../pages/user/ViewTransactions'

import { setUser } from '../redux/features/userSlice'
import { getSignedInUserAPI } from '../api/user'
import { useDispatch } from 'react-redux'

import {
  USER,
  EXPLORE,
  SIGNIN,
  SIGNUP,
  COURSES,
  USER_PROFILE,
  USER_COURSES,
  USER_TRANSACTIONS,
  COURSES_ENROLLED,
  COURSES_ENROLLED_ID,
} from '../paths'

function UserRoutes() {
  const dispatch = useDispatch()

  useEffect(() => {
    getSignedInUserAPI()
      .then((response: any) => {
        let userData = response.data?.userData || null
        if (!userData) {
          console.log('user not logged in')
        }
        dispatch(setUser({ ...response.data?.userData, userId: response.data.userData._id }))
      })
      .catch((err: any) => {
        console.log('error', err)
      })
  }, [dispatch])

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path={USER} element={<HeroUser />} />
        <Route path={EXPLORE} element={<Explore />} />
        <Route path={SIGNIN} element={<SignIn />} />
        <Route path={SIGNUP} element={<SignUp />} />
        <Route path={`${COURSES}/:id`} element={<Course />} />

        <Route element={<UserPrivate />}>
          <Route path={USER_PROFILE} element={<Profile />} />
          {/* <Route path={USER_COURSES} element={<CourseOwned />} />
          <Route path={USER_TRANSACTIONS} element={<ViewTransactions />} />
          <Route path={COURSES_ENROLLED} element={<Enrolled />} />
          <Route path={COURSES_ENROLLED_ID} element={<ViewCourse />} /> */}
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default UserRoutes
