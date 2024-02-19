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

function SignUp() {
  const t = useTranslations('SignUp')

  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
          <Card title={t('signUpAndExplore')} style={{ width: '35rem' }}>
            <Form
              form={form}
              name='signUpForm'
              onFinish={handleSignUp}
              layout='vertical'
              style={{ width: '30rem' }}
            >
              <Form.Item
                name='fullName'
                label={t('fullNameLabel')}
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
                label={t('phoneLabel')}
                rules={[
                  {
                    required: true,
                    message: 'Please enter your phone number',
                  },
                ]}
              >
                <Input
                  prefix={<PhoneOutlined />}
                  type='tel'
                  placeholder={t('required')}
                />
              </Form.Item>

              <Form.Item
                name='email'
                label={t('emailLabel')}
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
                label={t('countryLabel')}
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

              <Form.Item
                name='role'
                label={t('roleLabel')}
                rules={[{ required: true, message: 'Please select role!' }]}
              >
                <Select placeholder={t('selectRole')}>
                  <Option value={USER_ROLE.TEACHER}>{t('tutor')}</Option>
                  <Option value={USER_ROLE.USER}>{t('student')}</Option>
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
                  {t('agreementCheckbox')}
                  <a href='/oferta'> {t('agreement')}</a>
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
                  {t('signUpButton')}
                </Button>
              </Form.Item>
            </Form>
            <Space direction='vertical' size='large'>
              <Typography.Text>
                {t('alreadyMemberText')}{' '}
                <Link to='/signin'>{t('signInButton')}</Link>
              </Typography.Text>
            </Space>
          </Card>
        )}
      </Row>
    </Layout>
  )
}

export default SignUp
