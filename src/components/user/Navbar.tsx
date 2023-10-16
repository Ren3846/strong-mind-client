import React from 'react'
import { Menu, Button, Space } from 'antd'
import {
  Link,
  useLocation,
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import MenuDropDown from './MenuDropDown'
import Logo from '../common/Logo'
import { SettingOutlined } from '@ant-design/icons'

function Navbar() {
  const { pathname } = useLocation()
  const isAuthLoaded = useSelector(
    (state: any) => state.auth.loaded,
  )
  const user = useSelector(
    (state: any) => state.auth.user,
  )

  const menuItems = [
    {
      key: 'home',
      label: <Logo to={'/'} size={1.3} />,
    },
    {
      key: 'user',
      label: (
        <Button>
          <Link to={`/user`}>Home</Link>
        </Button>
      ),
    },
    {
      key: 'explore',
      label: (
        <Button>
          <Link to={`/explore`}>Explore</Link>
        </Button>
      ),
    },
    {
      key: 'enrolled',
      label: (
        <Button>
          <Link to={`/enrolled`}>Enrolled</Link>
        </Button>
      ),
    },
    {
      key: 'profile',
      label: (
        <Button>
          <Link to={`/profile`}>Profile</Link>
        </Button>
      ),
    },
    {
      key: 'dropdown',
      label: (
        <div
          style={{
            display: 'flex',
            float: 'right',
            padding: '5px',
          }}
        >
          {isAuthLoaded ? (
            user ? (
              <MenuDropDown user={user} />
            ) : (
              <Button>
                <Link
                  to={`signin?from=${pathname}`}
                >
                  Sign In
                </Link>
              </Button>
            )
          ) : (
            'Loading...'
          )}
        </div>
      ),
    },
  ]

  return (
    <div
      style={{
        marginTop: '10px',
      }}
    >
      <Menu
        mode='horizontal'
        style={{
          backgroundColor: 'rgb(243 244 246)',
        }}
        items={menuItems}
      ></Menu>
    </div>
  )
}

export default React.memo(Navbar)
