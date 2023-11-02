import React from 'react'
import { Badge, Button, Divider, Space, Tooltip } from 'antd'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MenuDropDown from '../user/MenuDropDown'
import { StoreType } from '../../redux/store'
import { USER_ROLE, User } from '../../redux/store/types'
import { BellOutlined, UserOutlined, WalletOutlined } from '@ant-design/icons'

function Navbar() {
  const navigate = useNavigate()
  const userBalance = useSelector((state: any) => state.auth.user)

  const currentUser = useSelector<StoreType, User>(
    (state: any) => state.auth.user,
  )

  const isAuthLoaded = useSelector((state: any) => state.auth.loaded)
  const user = useSelector((state: any) => state.auth.user)

  return (
    <div className='header-navbar bg-navbar'>
      <Link to='/' className='navbar-logo' children='StrongMind' />
      <nav className='nav-wrapper'>
        <NavLink
          to='/courses'
          className={({ isActive }) =>
            `navbar-link ${isActive ? 'active' : ''}`
          }
          children='All Courses'
        />
        <NavLink
          to='/teachers'
          className={({ isActive }) =>
            `navbar-link ${isActive ? 'active' : ''}`
          }
          children='Top Teachers'
        />
        {/* <NavLink
          to='/enrolled'
          className={({ isActive }) =>
            `navbar-link ${isActive ? 'active' : ''}`
          }
          children='Enrolled'
        />
        <NavLink
          to='/meetings'
          className={({ isActive }) =>
            `navbar-link ${isActive ? 'active' : ''}`
          }
          children='Meetings'
        /> */}
      </nav>

      <div
        style={{
          display: 'flex',
          float: 'right',
          padding: '5px',
          alignItems: 'center',
        }}
      >
        {isAuthLoaded ? (
          user ? (
            <>
              <Space>
                <Badge count={5} size='small' style={{ marginRight: '20px' }}>
                  <Button icon={<BellOutlined />} size='large' shape='circle' />
                </Badge>
                <Divider type='vertical' />
                <div>
                  {/* <UserOutlined
                    style={{ fontSize: '18px', marginRight: '5px' }}
                  /> */}
                  <span>Balance: {userBalance.balance} $</span>
                  <Tooltip title='Go to Wallet'>
                    <Button
                      icon={<WalletOutlined />}
                      size='large'
                      type='link'
                      onClick={() => navigate('/profile/wallet')}
                    />
                  </Tooltip>
                </div>
                <Divider type='vertical' />
              </Space>
              <MenuDropDown user={user} />
            </>
          ) : (
            <Space>
              <Button
                children='Log in'
                onClick={() => navigate('/signin')}
              ></Button>
              <Button
                type='default'
                children='Register'
                onClick={() => navigate('/signup')}
              />
            </Space>
          )
        ) : (
          'Loading...'
        )}
      </div>
    </div>
  )
}

export default React.memo(Navbar)
