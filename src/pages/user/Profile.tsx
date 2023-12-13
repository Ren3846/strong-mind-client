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
  Descriptions,
} from 'antd'
import { updateUserDetailsAPI } from '../../api/user'
import Layout from '../../components/common/Layout'
import Preloader from '../../components/common/Preloader'

import { CalendarOutlined, WalletOutlined } from '@ant-design/icons'
import { updateUser } from '../../redux/actions/user'
import UploadAvatar from '../../components/common/UploadAvatar'

import GetAvailableDays from '../../components/tutor/GetAvailableDays'
import TabPane from 'antd/es/tabs/TabPane'
import Wallet from './Wallet'
import { IUser, USER_ROLE } from '../../redux/store/types'
import useTranslations from '../../lang/useTranslations'

const { Item } = Form

function Profile() {
  const t = useTranslations('Profile')
  const user = useSelector((state: IUser) => state.auth.user)
  const dispatch = useDispatch()

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

  return (
    <Layout>
      <Row align='middle' justify='center'>
        <Card title={t('profile')} style={{ width: '80rem' }}>
          {loaded ? (
            <>
              <Row justify='start'>
                <Col span={5}>
                  <UploadAvatar />
                </Col>

                <Col span={19}>
                  <Descriptions bordered column={3}>
                    <Descriptions.Item label='Full Name'>
                      {user.fullName}
                    </Descriptions.Item>
                    <Descriptions.Item label='Email'>
                      {user.email}
                      {user.isEmailVerified ? (
                        <p>verified</p>
                      ) : (
                        <p>not verified</p>
                      )}
                    </Descriptions.Item>
                    <Descriptions.Item label='Phone'>
                      {user.phone}
                    </Descriptions.Item>
                    <Descriptions.Item label='Bio'>
                      {user.bio}
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>

              <Divider />
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic title={t('user_role')} value={user.role} />
                </Col>
                <Col span={12}>
                  <Statistic
                    title={t('account_balance')}
                    value={user.balance}
                    precision={2}
                  />
                </Col>
              </Row>
              <Divider />
              <Tabs defaultActiveKey='1'>
                {user.role === USER_ROLE.TEACHER ? (
                  <TabPane
                    tab={
                      <span>
                        <CalendarOutlined />
                        {t('calendar')}
                      </span>
                    }
                    key='1'
                  >
                    <GetAvailableDays />
                  </TabPane>
                ) : (
                  <></>
                )}
                <TabPane
                  tab={
                    <span>
                      <WalletOutlined />
                      {t('wallet')}
                    </span>
                  }
                  key='2'
                >
                  <Wallet />
                </TabPane>
              </Tabs>

              <Divider />

              <Form layout='vertical'>
                <Item label={t('email')}>
                  <Input
                    disabled
                    type='text'
                    name='email'
                    value={editedUser.email}
                    onChange={handleFieldChange}
                  />
                </Item>
                <Divider />

                <Item label={t('full_name')}>
                  <Input
                    type='text'
                    name='fullName'
                    value={editedUser.fullName}
                    onChange={handleFieldChange}
                  />
                </Item>
                <Item label={t('phone')}>
                  <Input
                    type='text'
                    name='phone'
                    value={editedUser.phone}
                    onChange={handleFieldChange}
                  />
                </Item>
                <Item label={t('country')}>
                  <Input
                    type='text'
                    name='country'
                    value={editedUser.country}
                    onChange={handleFieldChange}
                  />
                </Item>
                <Item label={t('bio')}>
                  <Input.TextArea
                    rows={4}
                    name='bio'
                    value={editedUser.bio}
                    onChange={handleFieldChange}
                  />
                </Item>

                <Item label={t('gender')}>
                  <Select
                    defaultValue=''
                    style={{ width: 150 }}
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

                <Item label={t('timezone')}>
                  <Select
                    defaultValue='+1'
                    virtual={false}
                    style={{ width: 120 }}
                    onChange={handleChange}
                    value={editedUser.timezone}
                    options={[
                      { value: '+12', label: 'UTC+12' },
                      { value: '+11', label: 'UTC+11' },
                      { value: '+10', label: 'UTC+10' },
                      { value: '+9', label: 'UTC+09' },
                      { value: '+8', label: 'UTC+08' },
                      { value: '+7', label: 'UTC+07' },
                      { value: '+6', label: 'UTC+06' },
                      { value: '+5', label: 'UTC+05' },
                      { value: '+4', label: 'UTC+04' },
                      { value: '+3', label: 'UTC+03' },
                      { value: '+2', label: 'UTC+02' },
                      { value: '+1', label: 'UTC+01' },
                      { value: '+0', label: 'UTC+0' },
                      { value: '-1', label: 'UTC-01' },
                      { value: '-2', label: 'UTC-02' },
                      { value: '-3', label: 'UTC-03' },
                      { value: '-4', label: 'UTC-04' },
                      { value: '-5', label: 'UTC-05' },
                      { value: '-6', label: 'UTC-06' },
                      { value: '-7', label: 'UTC-07' },
                      { value: '-8', label: 'UTC-08' },
                      { value: '-9', label: 'UTC-09' },
                      { value: '-10', label: 'UTC-10' },
                      { value: '-11', label: 'UTC-11' },
                      { value: '-12', label: 'UTC-12' },
                    ]}
                  />
                </Item>

                <Divider />

                <Item>
                  <Button type='primary' onClick={saveProfile}>
                    {t('save')}
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
