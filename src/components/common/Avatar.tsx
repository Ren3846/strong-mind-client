import React from 'react'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { CDN_BASE } from '../..'

interface CustomAvatarProps {
  avatar?: string
  size?: any
}

const CustomAvatar: React.FC<CustomAvatarProps> = ({ avatar, size }) => {
  const avatarSrc = avatar ? CDN_BASE + avatar : null

  return (
    <Avatar
      style={{ backgroundColor: '#3523a9bf' }}
      icon={<UserOutlined />}
      src={avatarSrc}
      size={size}
    />
  )
}

export default CustomAvatar
