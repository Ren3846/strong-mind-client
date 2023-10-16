import React, { useState } from 'react'
import {
  Link,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import {
  Input,
  Button,
  Typography,
  Form,
  message,
} from 'antd'
import {
  useDispatch,
  useSelector,
} from 'react-redux'
import { userSignInAPI } from '../api/user'
import { authLogin } from '../redux/actions/auth'
import Logo from '../components/common/Logo'

const { Text } = Typography

function SignIn() {
  const [form] = Form.useForm()
  const user = useSelector(
    (state: any) => state.user,
  )
  const dispatch = useDispatch()
  // const [searchParams] = useSearchParams()
  // const accessedPrivate =
  //   searchParams.get('private')
  // const fromLocation = searchParams.get('from')
  // const sessionExpired =
  //   searchParams.get('expired')
  // const newUser = searchParams.get('new')
  // const logout = searchParams.get('logout')
  const [error, setError] = useState<
    string | null
  >(null)

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
        .catch((err) => {
          console.log(err)
          setError(
            err?.response?.data?.errors
              ?.message || 'An error occurred.',
          )
          showErrorNotification(error)
        })
    })
  }

  const handleSignInSuccess = (user: any) => {
    showSuccessNotification(
      `Hey ${user.name}, Welcome back to StrongMind!`,
    )
    dispatch(authLogin(user))
    // if (fromLocation) {
    //   return navigate(fromLocation)
    // }
    return navigate('/user')
  }

  const showErrorNotification = (
    errorMessage: string | null,
  ) => {
    if (errorMessage) {
      message.error(errorMessage)
      setTimeout(() => {
        message.destroy()
      }, 3000)
    }
  }

  const showSuccessNotification = (
    messageText: string,
  ) => {
    message.success(messageText)
    setTimeout(() => {
      message.destroy()
    }, 6000)
  }

  return (
    <>
      <div>
        <div className='flex nexa-font min-h-full flex-1 flex-col justify-center px-6 lg:px-8 h-screen'>
          <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
            <div className='flex justify-center'>
              <Logo size={1.7} />
            </div>
            <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
              Sign in and explore
            </h2>
          </div>

          <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
            <Form
              form={form}
              name='signInForm'
              onFinish={handleSignIn}
              className='space-y-6'
              action='#'
              method='POST'
            >
              <Form.Item
                label='Email address'
                name='email'
                rules={[
                  {
                    required: true,
                    message:
                      'Please enter your email!',
                  },
                ]}
              >
                <Input
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
                    message:
                      'Please enter your password!',
                  },
                ]}
              >
                <Input
                  type='password'
                  autoComplete='current-password'
                  placeholder='Password'
                />
              </Form.Item>

              <Form.Item
                shouldUpdate
                className='flex justify-center'
              >
                <Text type='danger'>{error}</Text>
              </Form.Item>

              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='w-full'
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>

            <p className='mt-10 text-center text-xs text-gray-500'>
              Ready to start exploring new
              perspectives?{' '}
              <Link
                to='/signup'
                className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
              >
                Create an account!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn
