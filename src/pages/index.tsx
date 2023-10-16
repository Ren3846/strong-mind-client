import {
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom'
import React, { useLayoutEffect } from 'react'

import Preloader from '../components/common/Preloader'

import Landing from './Landing'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Profile from './user/Profile'
import Explore from './user/Explore'

import NotFound from './NotFound'

import { useSelector } from 'react-redux'
import { StoreType } from '../redux/store'
import Navbar from '../components/user/Navbar'

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

interface IProtectedRoute {
  condition: boolean
  redirect: string
  children: JSX.Element | JSX.Element[]
}

const ScrollToTop: React.FC<{
  children: JSX.Element
}> = ({ children }) => {
  const location = useLocation()
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0)
  }, [location.pathname])
  return children
}

const ProtectedRoute: React.FC<
  IProtectedRoute
> = ({ condition, redirect, children }) => {
  return (
    <>
      {condition ? (
        children
      ) : (
        <Navigate to={redirect} replace />
      )}
    </>
  )
}

const Router: React.FC<{}> = () => {
  const isLoaded = useSelector<
    StoreType,
    boolean
  >((state: any) => state.auth.loaded)
  const isLoggedIn = useSelector<
    StoreType,
    boolean
  >((state: any) => !!state.auth.user)

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
                condition={!isLoggedIn}
                redirect='/profile'
                children={<SignIn />}
              />
            }
          />
          <Route
            path='/signup'
            element={
              <ProtectedRoute
                condition={!isLoggedIn}
                redirect='/profile'
                children={<SignUp />}
              />
            }
          />
          <Route
            path='/explore'
            element={
              <ProtectedRoute
                condition={!!isLoggedIn}
                redirect='/signin'
                children={<Explore />}
              />
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute
                condition={isLoggedIn}
                redirect='/signin'
                children={<Profile />}
              />
            }
          />
          <Route
            path='*'
            element={<NotFound />}
          />
        </Routes>
      </>
    </ScrollToTop>
  ) : (
    <Preloader />
  )
}

export default Router
