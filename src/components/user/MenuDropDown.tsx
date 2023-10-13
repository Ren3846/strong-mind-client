import React from 'react'
import { Menu, Button, Dropdown } from 'antd' // Импортируйте компоненты Ant Design
import { DownOutlined, UserOutlined } from '@ant-design/icons' // Импортируйте иконки Ant Design
import { useDispatch } from 'react-redux'
import { removeUser } from '../../redux/features/userSlice'
// import { handleLogOutAPI } from '../../api/user'
import { useNavigate } from 'react-router-dom'

interface MenuDropDownProps {
  user: any // Замените 'UserType' на тип вашего пользователя из Redux
}

function MenuDropDown({ user }: MenuDropDownProps) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogOut = () => {
    dispatch(removeUser())
    localStorage.removeItem('isAuth')
    // handleLogOutAPI().then(({ data }) => {
    //   navigate('/signin?logout=true')
    // })
  }

  const menu = (
    <Menu>
      {/* Добавьте пункты меню с использованием компонентов Ant Design */}
      <Menu.Item key='profile' onClick={() => navigate('/user/profile')}>
        Profile
      </Menu.Item>
      <Menu.Item key='logout' onClick={handleLogOut}>
        Log out
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button>
        <UserOutlined />
        {user?.name} <DownOutlined />
      </Button>
    </Dropdown>
  )
}

export default React.memo(MenuDropDown)
