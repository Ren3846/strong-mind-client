import { useState, ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  message,
  Form,
  Input,
  Button,
  Row,
  Card,
  Statistic,
  Col,
  Divider,
  Select,
  Tabs,
} from 'antd'
import { updateUserDetailsAPI } from '../../api/user'
import Layout from '../../components/common/Layout'
import Preloader from '../../components/common/Preloader'

import {
  ArrowRightOutlined,
  CalendarOutlined,
  WalletOutlined,
} from '@ant-design/icons'
import { updateUser } from '../../redux/actions/user'
import { useNavigate } from 'react-router-dom'
import UploadAvatar from '../../components/common/UploadAvatar'

import GetAvailableDays from '../../components/tutor/GetAvailableDays'
import TabPane from 'antd/es/tabs/TabPane'
import Wallet from './Wallet'

const { Item } = Form

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Profile ' },
]

function Profile() {
  const user = useSelector((state: any) => state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [loaded, setLoaded] = useState(true)
  const [editedUser, setEditedUser] = useState({ ...user })

  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setEditedUser({ ...editedUser, [name]: value })
  }

  const saveProfile = () => {
    updateUserDetailsAPI(editedUser)
      .then((response) => {
        console.log(response)
        message.success('Profile updated successfully', 3)
        dispatch(updateUser(response.data._id, response.data))
      })
      .catch((err) => {
        message.error('Error Request', 3)
        console.error(err)
      })
      .finally(() => {
        setLoaded(true)
      })
  }

  const handleChange = (value: string) => {
    setEditedUser({
      ...editedUser,
      timezone: value,
    })
  }

  const handleChangeGender = (value: string) => {
    setEditedUser({
      ...editedUser,
      gender: value,
    })
  }

  console.log(user)

  return (
    <Layout>
      <Row align='middle' justify='center'>
        <Card title='Profile' style={{ width: '80rem' }}>
          {loaded ? (
            <>
              <Row justify='start'>
                <Col span={4}>
                  <UploadAvatar />
                </Col>
                <Col span={12}>
                  <ul>
                    <p>
                      <ArrowRightOutlined /> {user.fullName}
                    </p>
                    <p>
                      <ArrowRightOutlined /> {user.bio}
                    </p>
                    <p>
                      <ArrowRightOutlined /> {user.email}
                    </p>
                    <p>
                      <ArrowRightOutlined /> {user.phone}
                    </p>
                  </ul>
                </Col>
              </Row>

              <Divider />
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic title='User Role' value={user.role} />
                </Col>
                <Col span={12}>
                  <Statistic
                    title='Account Balance ($)'
                    value={user.balance}
                    precision={2}
                  />
                  {/* <Button
                    icon={<WalletOutlined />}
                    onClick={() => navigate('/profile/wallet')}
                  >
                    Wallet
                  </Button> */}
                </Col>
              </Row>
              <Divider />
              <Tabs defaultActiveKey='1'>
                <TabPane
                  tab={
                    <span>
                      <CalendarOutlined />
                      Calendar
                    </span>
                  }
                  key='1'
                >
                  <GetAvailableDays />
                </TabPane>
                <TabPane
                  tab={
                    <span>
                      <WalletOutlined />
                      Wallet
                    </span>
                  }
                  key='2'
                >
                  <Wallet />
                </TabPane>
              </Tabs>
              {/* <TeacherAvailability /> */}

              <Divider />

              <Form layout='vertical'>
                <Item label='Email'>
                  <Input
                    disabled
                    type='text'
                    name='email'
                    value={editedUser.email}
                    onChange={handleFieldChange}
                  />
                </Item>
                <Divider />

                <Item label='Full Name'>
                  <Input
                    type='text'
                    name='fullName'
                    value={editedUser.fullName}
                    onChange={handleFieldChange}
                  />
                </Item>
                <Item label='Phone'>
                  <Input
                    type='text'
                    name='phone'
                    value={editedUser.phone}
                    onChange={handleFieldChange}
                  />
                </Item>
                <Item label='Country'>
                  <Input
                    type='text'
                    name='country'
                    value={editedUser.country}
                    onChange={handleFieldChange}
                  />
                </Item>
                <Item label='Bio'>
                  <Input.TextArea
                    rows={4}
                    name='bio'
                    value={editedUser.bio}
                    onChange={handleFieldChange}
                  />
                </Item>

                <Item label='Gender'>
                  <Select
                    defaultValue='Male'
                    style={{ width: 120 }}
                    onChange={handleChangeGender}
                    value={editedUser.gender}
                    options={[
                      { value: 'male', label: 'Male' },
                      { value: 'female', label: 'Female' },
                      { value: 'non-binary', label: 'Non-binary' },
                      { value: 'other', label: 'Other' },
                    ]}
                  />
                </Item>

                <Item label='Timezone'>
                  <Select
                    defaultValue='GMT-12:00'
                    style={{ width: 120 }}
                    onChange={handleChange}
                    value={editedUser.timezone}
                    options={[
                      { value: 'GMT-12:00', label: 'GMT-12:00' },
                      { value: 'GMT-11:00', label: 'GMT-11:00' },
                      { value: 'GMT-10:00', label: 'GMT-10:00' },
                      { value: 'disabled', label: 'GMT-9:00', disabled: true },
                    ]}
                  />
                </Item>

                <Divider />

                <Item>
                  <Button type='primary' onClick={saveProfile}>
                    Save
                  </Button>
                </Item>
              </Form>
            </>
          ) : (
            <Preloader />
          )}
        </Card>
      </Row>
    </Layout>
  )
}

export default Profile
