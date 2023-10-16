import React from 'react'
import {
  DownOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Button, Dropdown, Menu } from 'antd'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authLogout } from '../../redux/actions/auth'
import { handleLogOutAPI } from '../../api/user'

interface MenuDropDownProps {
  user: any
}

function MenuDropDown({
  user,
}: MenuDropDownProps) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
        key='profile'
        onClick={() => navigate('/profile')}
      >
        Profile
      </Menu.Item>
      <Menu.Item
        key='logout'
        onClick={handleLogOut}
      >
        Log out
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button>
        <UserOutlined />
        {user?.email} <DownOutlined />
      </Button>
    </Dropdown>
  )
}

export default React.memo(MenuDropDown)
