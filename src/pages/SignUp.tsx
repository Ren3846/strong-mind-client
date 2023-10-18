import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Row,
  Form,
  Input,
  Button,
  Typography,
  Alert,
  Select,
  Checkbox,
  Col,
  Card,
  Space,
} from 'antd'
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  LockOutlined,
} from '@ant-design/icons'
import { userSignUpAPI } from '../api/user'
import Layout from '../components/common/Layout'

const { Option } = Select
const { Text } = Typography

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
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
          err.response?.data?.errors?.message || 'An error occurred'
        setError(errorMessage)
      })
  }

  return (
    <Layout>
      <Row align='middle' justify='center'>
        <Card title='Sign Up and explore' style={{ width: '35rem' }}>
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

            {/* <Form.Item
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
          </Form.Item> */}

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
                <Option value='tutor'>Tutor</Option>
                <Option value='student'>Student</Option>
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
      </Row>
    </Layout>
  )
}

export default SignUp
