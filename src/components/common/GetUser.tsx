import { HeartOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Rate, message } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IUser } from '../../redux/store/types'
import Preloader from './Preloader'
import CustomAvatar from './CustomAvatar'

interface GetUserProps {
  userId: string
  avatar?: string
}

const GetUser: React.FC<GetUserProps> = ({ userId, avatar }) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    axios
      .get(`/api/users/${userId}`)
      .then((response) => {
        console.log('user', response.data)
        setUser(response.data)
        setLoading(true)
      })
      .catch((error) => {
        console.error(error)
        message.error('Error while fetching course likes')
      })
  }, [userId])

  return (
    <div>
      {loading ? (
        <>
          {/* <CustomAvatar avatar={avatar} /> */}
          <UserOutlined /> {user?.fullName}
        </>
      ) : (
        <Preloader />
      )}
    </div>
  )
}

export default GetUser
