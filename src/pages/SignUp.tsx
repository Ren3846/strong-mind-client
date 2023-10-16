import React, { useState } from 'react'
import {
  Link,
  useNavigate,
} from 'react-router-dom'
import {
  Row,
  Form,
  Input,
  Button,
  Spin,
  Typography,
  Alert,
} from 'antd'
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  LockOutlined,
} from '@ant-design/icons'
import { userSignUpAPI } from '../api/user'
import Logo from '../components/common/Logo'

const { Text } = Typography

function SignUp() {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] =
    useState(false)
  const [error, setError] = useState<
    string | null
  >(null)

  const handleSignUp = (values: any) => {
    setIsLoading(true)
    const userData = {
      username: values.username,
      email: values.email,
      password: values.password,
      phone: values.phone,
    }

    userSignUpAPI(userData)
      .then(() => {
        setIsLoading(false)
        navigate('../signin?new=true')
      })
      .catch((err) => {
        setIsLoading(false)
        const errorMessage =
          err.response?.data?.errors?.message ||
          'An error occurred'
        setError(errorMessage)
      })
  }

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <div className='flex justify-center'>
          <Logo size={1.4} />
        </div>
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          Create a new account
        </h2>
      </div>
      <Row align='middle' justify='center'>
        <Form
          form={form}
          name='signUpForm'
          onFinish={handleSignUp}
          layout='vertical'
          style={{ width: '30rem' }}
        >
          <Form.Item
            name='username'
            label='Full name'
            rules={[
              {
                required: true,
                message:
                  'Please enter your full name',
              },
            ]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item
            name='phone'
            label='Phone Number'
            rules={[
              {
                required: true,
                message:
                  'Please enter your phone number',
              },
            ]}
          >
            <Input
              prefix={<PhoneOutlined />}
              type='tel'
            />
          </Form.Item>
          <Form.Item
            name='email'
            label='Email address'
            rules={[
              {
                required: true,
                message:
                  'Please enter your email address',
              },
              {
                type: 'email',
                message:
                  'Please enter a valid email address',
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              type='email'
            />
          </Form.Item>
          <Form.Item
            name='password'
            label='Password'
            rules={[
              {
                required: true,
                message:
                  'Please enter your password',
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
            />
          </Form.Item>
          {error && (
            <Alert
              message={error}
              type='error'
              showIcon
              style={{ marginBottom: '10px' }}
            />
          )}
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              loading={isLoading}
              block
            >
              {isLoading ? <Spin /> : 'Sign up'}
            </Button>
          </Form.Item>
        </Form>
      </Row>
      <div className='mt-10 text-center text-sm text-gray-500'>
        Already a member?{' '}
        <Link
          to='../signin'
          className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
        >
          Sign in
        </Link>
      </div>
    </div>
  )
}

export default SignUp
