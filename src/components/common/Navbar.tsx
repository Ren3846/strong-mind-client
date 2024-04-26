import React from 'react'
import { Button, Divider, Space, Tooltip } from 'antd'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MenuDropDown from '../user/MenuDropDown'
import { LoginOutlined, UserOutlined, WalletOutlined } from '@ant-design/icons'
import Notifications from './Notifications'
import SwitchLang from './SwitchLanguage'
import useTranslations from '../../lang/useTranslations'
import Preloader from './Preloader'
import { StoreType } from '../../redux/store'

function Navbar() {
  const t = useTranslations('Navbar')
  const navigate = useNavigate()

  const user = useSelector((state: StoreType) => state.auth.user)
  const isAuthLoaded = useSelector((state: StoreType) => state.auth.loaded)

  return (
    <div className='header-navbar bg-navbar'>
      <Link to='/' className='navbar-logo' children='StrongMind' />
      <nav className='nav-wrapper'>
        <NavLink
          to='/courses'
          className={({ isActive }) =>
            `navbar-link ${isActive ? 'active' : ''}`
          }
          children={t('courses')}
        />
        {/* <NavLink
          to='/teachers'
          className={({ isActive }) =>
            `navbar-link ${isActive ? 'active' : ''}`
          }
          children={t('teachers')}
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
                  <span>
                    {t('balance')} {user.balance.toFixed(2)} $
                  </span>
                  <Tooltip title={t('go_to_wallet')}>
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
                children={t('log_in')}
                onClick={() => navigate('/signin')}
                icon={<LoginOutlined />}
              ></Button>
              <Button
                type='primary'
                children={t('register')}
                onClick={() => navigate('/signup')}
                icon={<UserOutlined />}
              />{' '}
              <SwitchLang />
            </Space>
          )
        ) : (
          <Preloader />
        )}
      </div>
    </div>
  )
}

export default React.memo(Navbar)
