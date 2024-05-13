import { useState } from 'react'
import { Link } from 'react-router-dom'
import { USER_ROLE } from '../redux/store/types'
import {
  Row,
  Form,
  Input,
  Button,
  Typography,
  Select,
  Checkbox,
  Card,
  Space,
  Result,
  message,
} from 'antd'
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  LockOutlined,
} from '@ant-design/icons'
import { userResetPasswordRequestAPI, userSignUpAPI } from '../api/user'
import Layout from '../components/common/Layout'
import { ErrorMessage } from '../components/common/ErrorMessage'

import useTranslations from '../lang/useTranslations'

const { Option } = Select

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
}

function ResetPasswordRequest() {
  const t = useTranslations('SignIn')

  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false);

  const handlePasswordReset = (values: any) => {
    setIsLoading(true)
    const data = {
      email: values.email,
    }

    userResetPasswordRequestAPI(data)
      .then((res) => {
        setSuccess(true);
      })
      .catch((error) => {
        setIsLoading(false)
        if (error.response) {
          const responseData = error.response.data
          message.error(responseData.message || 'An error occurred.')
        } else if (error.request) {
          message.error('Request failed. Please check your connection.')
        } else {
          message.error('An unexpected error occurred.')
        }
      }).finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Layout>
      <Row align='middle' justify='center'>
        <Card title={t('passwordResetTitle')} style={{ width: '35rem' }}>
          {
            success ? (
              <div className='password-reset-info'>
                {t("passwordResetInfo")}
              </div>
            ) : null
          }
          <Form
            form={form}
            name='passwordResetForm'
            onFinish={handlePasswordReset}
            layout='vertical'
            action='#'
            method='POST'
          >
            <Form.Item
              label={t('emailLabel')}
              name='email'
              rules={[
                {
                  required: true,
                  message: 'Please enter your email address',
                },
                {
                  type: 'email',
                  message: 'Please enter a valid email address',
                },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                disabled={isLoading || success}
                type='email'
                autoComplete='email'
                placeholder={t('emailPlaceholder')}
              />
            </Form.Item>
            <Form.Item>
              <Button disabled={isLoading || success} type='primary' htmlType='submit' className='w-full'>
                {t('forgotPasswordLink')}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Row>
    </Layout>
  )
}

export default ResetPasswordRequest
