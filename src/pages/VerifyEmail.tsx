import React from 'react'
import { Result, Button } from 'antd'
import { MailOutlined } from '@ant-design/icons'

const VerifyEmail: React.FC = () => {
  return (
    <Result
      icon={<MailOutlined />}
      title='Confirm Your Email'
      subTitle='We have sent you an email with instructions on how to confirm your email address. Please check your inbox.'
      extra={[
        <Button type='primary' key='back' onClick={() => window.history.back()}>
          Done!
        </Button>,
        <Button type='primary' key='home' href='/'>
          Home
        </Button>,
      ]}
    />
  )
}

export default VerifyEmail
