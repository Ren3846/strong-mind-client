import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Input,
  Button,
  Typography,
  Form,
  message,
  Row,
  Space,
  Card,
} from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { userSignInAPI } from '../api/user'
import { authLogin } from '../redux/actions/auth'
import Layout from '../components/common/Layout'
import { ErrorMessage } from '../components/common/ErrorMessage'
import { IUser } from '../redux/store/types'

function SignIn() {
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()

  const handleSignIn = () => {
    form.validateFields().then((values) => {
      userSignInAPI({
        email: values.email,
        password: values.password,
      })
        .then((response: any) => {
          handleSignInSuccess(response.data.user)
        })
        .catch((error) => {
          if (error.response) {
            const responseData = error.response.data
            setError(responseData.message || 'An error occurred.')
          } else if (error.request) {
            setError('Request failed. Please check your connection.')
          } else {
            setError('An unexpected error occurred.')
          }
        })
    })
  }

  const handleSignInSuccess = (user: IUser) => {
    showSuccessNotification(`Hey ${user.email}, Welcome back to StrongMind!`)
    dispatch(authLogin(user))

    return navigate('/dashboard')
  }

  const showSuccessNotification = (messageText: string) => {
    message.success(messageText)
    setTimeout(() => {
      message.destroy()
    }, 6000)
  }

  return (
    <Layout>
      <Row align='middle' justify='center'>
        <Card title='Sign in and explore' style={{ width: '35rem' }}>
          <Form
            form={form}
            name='signInForm'
            onFinish={handleSignIn}
            layout='vertical'
            style={{ width: '30rem' }}
            action='#'
            method='POST'
          >
            <Form.Item
              label='Email address'
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
                type='email'
                autoComplete='email'
                placeholder='Email'
              />
            </Form.Item>

            <Form.Item
              label='Password'
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Please enter your password!',
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type='password'
                autoComplete='current-password'
                placeholder='Password'
              />
            </Form.Item>

            <Form.Item shouldUpdate className='flex justify-center'>
              <ErrorMessage message={error || ''} />
            </Form.Item>

            <Form.Item>
              <Button type='primary' htmlType='submit' className='w-full'>
                Sign In
              </Button>
            </Form.Item>
          </Form>

          <Space direction='vertical' size='large'>
            <Typography.Text>
              Ready to start exploring new perspectives?{' '}
              <Link to='/signup'>Create an account!</Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  )
}

export default SignIn
