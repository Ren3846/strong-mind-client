import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider, useDispatch } from 'react-redux'
import store from './redux/store/index'

import Router from './pages'
import './styles/style.sass'
import { getSignedInUserAPI } from './api/user'
import { authLoaded } from './redux/actions/auth'

export const CDN_BASE = 'https://strongmind.fra1.cdn.digitaloceanspaces.com/'

const ApiInit: React.FC<{}> = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    getSignedInUserAPI()
      .then(({ data }) => {
        dispatch(authLoaded(data))
      })
      .catch((err) => {
        dispatch(authLoaded(null))
      })
  }, [dispatch])

  return null
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ApiInit />
      <Router />
    </Provider>
  </BrowserRouter>,
)
