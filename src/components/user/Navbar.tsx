import React from 'react'
import { Button, Space } from 'antd'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MenuDropDown from './MenuDropDown'
import Logo from '../common/Logo'
import { SettingOutlined } from '@ant-design/icons'

function Navbar() {
  const navigate = useNavigate()

  const isAuthLoaded = useSelector((state: any) => state.auth.loaded)
  const user = useSelector((state: any) => state.auth.user)

  return (
    <div className='header-navbar'>
      <Link to='/' className='navbar-logo' children='StrongMind' />
      <nav className='nav-wrapper'>
        <NavLink
          to='/dashboard'
          className={({ isActive }) =>
            `navbar-link ${isActive ? 'active' : ''}`
          }
          children='Home'
        />
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
        <NavLink
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
        />
        <NavLink
          to='/profile'
          className={({ isActive }) =>
            `navbar-link ${isActive ? 'active' : ''}`
          }
          children='Profile'
        />
      </nav>
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
