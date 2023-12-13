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
} from 'antd'
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  LockOutlined,
} from '@ant-design/icons'
import { userSignUpAPI } from '../api/user'
import Layout from '../components/common/Layout'
import { authLogin } from '../redux/actions/auth'
import { useDispatch } from 'react-redux'
import { ErrorMessage } from '../components/common/ErrorMessage'

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

function SignUp() {
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const dispatch = useDispatch()

  const [registrationSuccess, setRegistrationSuccess] = useState(false)

  const handleSignUp = (values: any) => {
    setIsLoading(true)
    const userData = {
      fullName: values.fullName,
      email: values.email,
      password: values.password,
      phone: values.phone,
      country: values.country,
      role: values.role,
    }

    userSignUpAPI(userData)
      .then((res) => {
        setIsLoading(false)
        // dispatch(authLogin(res.data.user))
        setRegistrationSuccess(true)
      })
      .catch((error) => {
        setIsLoading(false)
        if (error.response) {
          const responseData = error.response.data
          setError(responseData.message || 'An error occurred.')
        } else if (error.request) {
          setError('Request failed. Please check your connection.')
        } else {
          setError('An unexpected error occurred.')
        }
      })
  }

  return (
    <Layout>
      <Row align='middle' justify='center'>
        {registrationSuccess ? (
          <Card>
            <Result
              icon={<MailOutlined />}
              title='Confirm Your Email'
              subTitle='We have sent you an email with instructions on how to confirm your email address. Please check your inbox.'
              extra={[
                <Button type='primary' key='done' href='/profile'>
                  Done!
                </Button>,
                <Button type='primary' key='home' href='/'>
                  Home
                </Button>,
              ]}
            />
          </Card>
        ) : (
          <Card title='Sign Up and explore' style={{ width: '35rem' }}>
            <Form
              form={form}
              name='signUpForm'
              onFinish={handleSignUp}
              layout='vertical'
              style={{ width: '30rem' }}
            >
              <Form.Item
                name='fullName'
                label='Full name'
                rules={[
                  {
                    required: true,
                    message: 'Please enter your full name',
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
                    message: 'Please enter your phone number',
                  },
                ]}
              >
                <Input prefix={<PhoneOutlined />} type='tel' />
              </Form.Item>

              <Form.Item
                name='email'
                label='Email address'
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
                <Input prefix={<MailOutlined />} type='email' />
              </Form.Item>

              <Form.Item
                name='country'
                label='Country'
                rules={[
                  {
                    required: true,
                    message: 'Please enter your country',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name='password'
                label='Password'
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
                hasFeedback
              >
                <Input.Password prefix={<LockOutlined />} />
              </Form.Item>

              <Form.Item
                name='confirm'
                label='Confirm Password'
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

              <Form.Item
                name='role'
                label='Role'
                rules={[{ required: true, message: 'Please select role!' }]}
              >
                <Select placeholder='Select your role'>
                  <Option value={USER_ROLE.TEACHER}>Tutor</Option>
                  <Option value={USER_ROLE.USER}>Student</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name='agreement'
                valuePropName='checked'
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(new Error('Should accept agreement')),
                  },
                ]}
                {...tailFormItemLayout}
              >
                <Checkbox>
                  I have read the <a href='/'>agreement</a>
                </Checkbox>
              </Form.Item>

              <ErrorMessage message={error || ''} />

              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  loading={isLoading}
                  block
                >
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
            <Space direction='vertical' size='large'>
              <Typography.Text>
                Already a member? <Link to='/signin'>Sign in</Link>
              </Typography.Text>
            </Space>
          </Card>
        )}
      </Row>
    </Layout>
  )
}

export default SignUp
