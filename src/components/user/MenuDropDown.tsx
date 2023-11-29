import React from 'react'
import {
  CalendarOutlined,
  DownOutlined,
  FileDoneOutlined,
  FileOutlined,
  HomeOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Dropdown, Menu, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authLogout } from '../../redux/actions/auth'
import { handleLogOutAPI } from '../../api/user'
import { StoreType } from '../../redux/store'
import { USER_ROLE, User } from '../../redux/store/types'
import { baseImageUrl } from '../../pages'

interface MenuDropDownProps {
  user: any
}

function MenuDropDown({ user }: MenuDropDownProps) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const currentUser = useSelector<StoreType, User>(
    (state: any) => state.auth.user,
  )

  const handleLogOut = () => {
    dispatch(authLogout())
    handleLogOutAPI().then(({ data }) => {
      console.log('dhdhdhd', data)
      navigate('/signin?logout=true')
    })
  }

  const menu = (
    <Menu>
      <Menu.Item
        icon={<HomeOutlined />}
        key='dashboard'
        onClick={() => navigate('/dashboard')}
      >
        Dashboard
      </Menu.Item>

      {currentUser.role === USER_ROLE.TEACHER ? (
        <Menu.Item
          icon={<FileOutlined />}
          key='mycourses'
          onClick={() => navigate('/mycourses')}
        >
          My courses
        </Menu.Item>
      ) : (
        <></>
      )}

      {currentUser.role === USER_ROLE.TEACHER ? (
        <></>
      ) : (
        <Menu.Item
          icon={<FileDoneOutlined />}
          key='enrolled'
          onClick={() => navigate('/enrolled')}
        >
          Enrolled Courses
        </Menu.Item>
      )}

      <Menu.Item
        icon={<CalendarOutlined />}
        key='meetings'
        onClick={() => navigate('/meetings')}
      >
        Meetings
      </Menu.Item>

      <Menu.Item
        icon={<UserOutlined />}
        key='profile'
        onClick={() => navigate('/profile')}
      >
        Profile
      </Menu.Item>

      <Menu.Item
        icon={<LogoutOutlined />}
        key='logout'
        onClick={handleLogOut}
        danger
      >
        Log out
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu} trigger={['hover']}>
      <Button size='middle' type='text'>
        <Space direction='horizontal'>
          <Avatar
            size='small'
            style={{ backgroundColor: '#6466f1' }}
            src={`${baseImageUrl}/${currentUser.avatar}`}
          />
          {user?.email} <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  )
}

export default React.memo(MenuDropDown)

// import React from 'react'
// import { useSelector } from 'react-redux'

// import { DownOutlined, UserOutlined } from '@ant-design/icons'
// import type { MenuProps } from 'antd'
// import { Button, Dropdown, message, Space } from 'antd'

// const handleMenuClick: MenuProps['onClick'] = (e) => {
//   message.info('Click on menu item.')
//   console.log('click', e)
// }

// const items: MenuProps['items'] = [
//   {
//     label: '1st menu item',
//     key: '1',
//     icon: <UserOutlined />,
//   },
//   {
//     label: '2nd menu item',
//     key: '2',
//     icon: <UserOutlined />,
//   },
//   {
//     label: '3rd menu item',
//     key: '3',
//     icon: <UserOutlined />,
//     danger: true,
//   },
//   {
//     label: '4rd menu item',
//     key: '4',
//     icon: <UserOutlined />,
//     danger: true,
//     disabled: true,
//   },
// ]

// const menuProps = {
//   items,
//   onClick: handleMenuClick,
// }

// const MenuDropDown: React.FC = () => (
//   <Space wrap>
//     <Dropdown menu={menuProps}>
//       <Button>
//         <Space>
//           <UserOutlined />
//           Button
//           <DownOutlined />
//         </Space>
//       </Button>
//     </Dropdown>
//   </Space>
// )

// export default React.memo(MenuDropDown)
