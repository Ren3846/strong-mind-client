import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'

export const baseImageUrl = 'https://strongmind.fra1.cdn.digitaloceanspaces.com'

const CustomAvatar = ({ avatar }: any) => {
  const avatarSrc = avatar ? `${baseImageUrl}/${avatar}` : null

  return (
    <Avatar
      style={{ backgroundColor: '#3523a9bf' }}
      icon={<UserOutlined />}
      src={avatarSrc}
    />
  )
}

export default CustomAvatar
