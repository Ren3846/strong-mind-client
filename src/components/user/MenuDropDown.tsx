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
import { Button, Dropdown, Menu, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authLogout } from '../../redux/actions/auth'
import { handleLogOutAPI } from '../../api/user'
import { StoreType } from '../../redux/store'
import { USER_ROLE, IUser } from '../../redux/store/types'
import useTranslations from '../../lang/useTranslations'
import CustomAvatar from '../common/CustomAvatar'

interface MenuDropDownProps {
  user: any
}

function MenuDropDown({ user }: MenuDropDownProps) {
  const t = useTranslations('Navbar.Dropdown')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const currentUser = useSelector<StoreType, IUser>(
    (state: any) => state.auth.user,
  )

  const handleLogOut = () => {
    dispatch(authLogout())
    handleLogOutAPI().then(({ data }) => {
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
        {t('dashboard')}
      </Menu.Item>

      {currentUser.role === USER_ROLE.TEACHER ? (
        <Menu.Item
          icon={<FileOutlined />}
          key='mycourses'
          onClick={() => navigate('/mycourses')}
        >
          {t('my_courses')}
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
          {t('courses')}
        </Menu.Item>
      )}

      <Menu.Item
        icon={<CalendarOutlined />}
        key='meetings'
        onClick={() => navigate('/meetings')}
      >
        {t('calendar')}
      </Menu.Item>

      <Menu.Item
        icon={<UserOutlined />}
        key='profile'
        onClick={() => navigate('/profile')}
      >
        {t('profile')}
      </Menu.Item>

      <Menu.Item
        icon={<LogoutOutlined />}
        key='logout'
        onClick={handleLogOut}
        danger
      >
        {t('exit')}
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu} trigger={['hover']}>
      <Button size='middle' type='text'>
        <Space direction='horizontal'>
          <CustomAvatar avatar={user.avatar} size='small' />
          {user?.email} <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  )
}

export default React.memo(MenuDropDown)
