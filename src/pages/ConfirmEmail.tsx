import React, { useEffect, useState } from 'react'
import { Spin, message } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { authLogin } from '../redux/actions/auth'
import { IUser } from '../redux/store/types'
import useTranslations from '../lang/useTranslations'

const ConfirmEmail: React.FC = () => {
  const t = useTranslations('ConfirmEmail')
  const { token } = useParams<{ token: string }>()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        setLoading(true)

        const response = await axios.get(`/api/auth/confirm/${token}`)
        console.log(response.data.user)
        setUser(response.data.user)
        handleSignInSuccess(response.data.user)
      } catch (error) {
        message.error(t('confirmationError'))
      } finally {
        setLoading(false)
      }
    }

    confirmEmail()
  }, [token])

  const handleSignInSuccess = (user: IUser) => {
    message.info(`Hey ${user.email}, ${t('welcomeBackMessage')}`)
    dispatch(authLogin(user))

    return navigate('/dashboard')
  }

  return <Spin spinning={loading} />
}

export default ConfirmEmail
