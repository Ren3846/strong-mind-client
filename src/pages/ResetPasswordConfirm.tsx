import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { IUser, USER_ROLE } from '../redux/store/types'
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
import { userResetPasswordConfirmAPI, userResetPasswordRequestAPI, userSignUpAPI } from '../api/user'
import Layout from '../components/common/Layout'
import { ErrorMessage } from '../components/common/ErrorMessage'

import useTranslations from '../lang/useTranslations'
import { useDispatch } from 'react-redux'
import { authLogin } from '../redux/actions/auth'

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

function ResetPasswordConfirm() {
  const { token } = useParams();
  const t = useTranslations('SignIn')
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePasswordReset = (values: any) => {
    setIsLoading(true)
    const data = {
      token: token || "",
      password: values.password
    }
    
    const handleSignInSuccess = (user: IUser) => {
      message.success(`${user.email}, ${t('welcome')}`)
      dispatch(authLogin(user))
  
      return navigate('/dashboard')
    }

    userResetPasswordConfirmAPI(data)
      .then((res) => {
        handleSignInSuccess(res.data.user)
      })
      .catch((error) => {
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
          <div className='password-reset-info'>
            {t("passwordResetConfirmInfo")}
          </div>
          <Form
            form={form}
            name='passwordResetForm'
            onFinish={handlePasswordReset}
            layout='vertical'
            action='#'
            method='POST'
          >
            <Form.Item
                name='password'
                label={t('passwordLabel')}
                tooltip={t('password_contain')}
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                    whitespace: true,
                  },
                ]}
                hasFeedback
              >
                <Input.Password prefix={<LockOutlined />} />
              </Form.Item>

              <Form.Item
                name='confirm'
                label={t('confirmPasswordLabel')}
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(
                        new Error(
                          'The new password that you entered do not match!',
                        ),
                      )
                    },
                  }),
                ]}
              >
                <Input.Password prefix={<LockOutlined />} />
              </Form.Item>
            <Form.Item>
              <Button disabled={isLoading} type='primary' htmlType='submit' className='w-full'>
                {t('setPassword')}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Row>
    </Layout>
  )
}

export default ResetPasswordConfirm;
