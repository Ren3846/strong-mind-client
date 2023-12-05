import React from 'react'
import { Button, Divider, Space, Tooltip } from 'antd'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MenuDropDown from '../user/MenuDropDown'
import { WalletOutlined } from '@ant-design/icons'
import Notifications from './Notifications'
import SwitchLang from './SwitchLanguage'

function Navbar() {
  const navigate = useNavigate()
  const userBalance = useSelector((state: any) => state.auth.user)

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
          children='Courses'
        />
        <NavLink
          to='/teachers'
          className={({ isActive }) =>
            `navbar-link ${isActive ? 'active' : ''}`
          }
          children='Teachers'
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
                <Notifications />
                <Divider type='vertical' />
                <div>
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
              <Divider type='vertical' />
              <SwitchLang />
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
