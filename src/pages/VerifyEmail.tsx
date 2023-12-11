import React from 'react'
import { Result, Button } from 'antd'
import { CheckCircleOutlined, MailOutlined } from '@ant-design/icons'

const VerifyEmail: React.FC = () => {
  return (
    <Result
      icon={<MailOutlined />}
      title='Подтвердите свой email'
      subTitle='Мы отправили вам письмо с инструкциями по подтверждению email. Пожалуйста, проверьте свою почту.'
      extra={[
        <Button type='primary' key='back' onClick={() => window.history.back()}>
          Вернуться назад
        </Button>,
        <Button type='primary' key='home' href='/'>
          На главную
        </Button>,
      ]}
    />
  )
}

export default VerifyEmail
