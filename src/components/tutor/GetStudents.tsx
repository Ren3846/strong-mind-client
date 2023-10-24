import axios from 'axios'
import { useEffect, useState } from 'react'
import { User } from '../../redux/store/types'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Space } from 'antd'

export const GetStudents: React.FC<{
  userId: string
}> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    axios({
      url: `/api/users/${userId}`,
      method: 'get',
    })
      .then(({ data }) => {
        setUser(data)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setLoaded(true)
      })
  }, [userId])

  return (
    <div className='course-user' title={user?.email} style={{ margin: '5px' }}>
      <Space>
        <Avatar icon={<UserOutlined />} />
        <a>{user?.email}</a>
      </Space>
    </div>
  )
}
