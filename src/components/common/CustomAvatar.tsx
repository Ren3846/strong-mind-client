import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { CDN_BASE } from '../..'

const CustomAvatar = ({ avatar }: any) => {
  const avatarSrc = avatar ? CDN_BASE + avatar : null

  return (
    <Avatar
      style={{ backgroundColor: '#3523a9bf' }}
      icon={<UserOutlined />}
      src={avatarSrc}
    />
  )
}

export default CustomAvatar
