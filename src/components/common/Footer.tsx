import { Divider } from 'antd'
import React from 'react'

const Footer: React.FC = () => {
  return (
    <div className='footer-navbar'>
      <div>
        <p>&copy; 2024 STRONG MIND ACADEMY. All rights reserved</p>
      </div>
      <div>
        <a style={{ paddingLeft: 10 }} href='/oferta'>
          Публічна оферта
        </a>
        <Divider type='vertical' />
        <a style={{ paddingLeft: 10 }} href='/cookies'>
          Політика Cookie
        </a>
      </div>
    </div>
  )
}

export default Footer
