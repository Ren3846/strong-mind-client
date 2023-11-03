import axios from 'axios'
import { useEffect, useState } from 'react'
import { User } from '../../redux/store/types'
import { Avatar, Skeleton, Space } from 'antd'
import { Link } from 'react-router-dom'
import { baseImageUrl } from '../../pages'

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
    <>
      {loaded ? (
        <div
          className='course-user'
          title={user?.email}
          style={{ margin: '5px' }}
        >
          <Space>
            <Avatar src={`${baseImageUrl}/${user?.image}`} />
            <Link to={`/teacher/${user?._id}`}>{user?.email}</Link>
          </Space>
        </div>
      ) : (
        <Skeleton active />
      )}
    </>
  )
}
