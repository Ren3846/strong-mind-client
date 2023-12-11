import axios from 'axios'
import { useEffect, useState } from 'react'
import { IUser } from '../../redux/store/types'
import { Skeleton, Space } from 'antd'
import { Link } from 'react-router-dom'
import CustomAvatar from '../common/CustomAvatar'

export const GetTutor: React.FC<{
  userId: string
}> = ({ userId }) => {
  const [user, setUser] = useState<IUser | null>(null)
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
    <>
      {loaded ? (
        <div
          className='course-user'
          title={user?.email}
          style={{ margin: '5px' }}
        >
          <Space>
            <CustomAvatar avatar={user?.avatar} size={'small'} />
            <Link to={`/teacher/${user?._id}`}>{user?.email}</Link>
          </Space>
        </div>
      ) : (
        <Skeleton active />
      )}
    </>
  )
}
