import { useState, ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  message,
  Form,
  Input,
  Button,
  Row,
  Card,
  Avatar,
  Upload,
  Typography,
  Statistic,
  Col,
  Divider,
  Select,
  Tooltip,
} from 'antd'
import { updateUserDetailsAPI } from '../../api/user'
import Layout from '../../components/common/Layout'
import Preloader from '../../components/common/Preloader'

import {
  CaretRightOutlined,
  InfoCircleOutlined,
  MinusOutlined,
  UserOutlined,
  WalletOutlined,
} from '@ant-design/icons'
import { updateUser } from '../../redux/actions/user'
import { useNavigate } from 'react-router-dom'
import UploadAvatar from '../../components/common/UploadAvatar'
import { baseImageUrl } from '../index'
import MyBreadcrumb from '../../components/common/Breadcrumb'

const { Item } = Form
const { Dragger } = Upload

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Profile ' },
]

const genderOptions = [
  'Male',
  'Female',
  'Non-binary',
  'Other',
  'Transgender Male',
  'Transgender Female',
  'Genderfluid',
  'Agender',
  'Bigender',
  'Demiboy',
  'Demigirl',
  'Intersex',
  'Polygender',
  'Not Specified',
]

const timezones = ['GMT-12:00', 'GMT-11:00', 'GMT-10:00']

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

  console.log(user)
  const imageUrl = `${baseImageUrl}/${user.image}`
  return (
    <Layout>
      <Row align='middle' justify='center'>
        <Card title='Profile' style={{ width: '60rem' }}>
          {loaded ? (
            <>
              <Row justify='start'>
                {/* <Col span={4}>
                  <Avatar size={120} src={imageUrl} />
                </Col> */}
                <Col span={4}>
                  <UploadAvatar />
                </Col>
                <Col span={12}>
                  <ul>
                    <p>
                      <CaretRightOutlined /> {user.fullName}
                    </p>
                    <p>
                      <CaretRightOutlined /> {user.bio}
                    </p>
                    <p>
                      <CaretRightOutlined /> {user.email}
                    </p>
                    <p>
                      <CaretRightOutlined /> {user.phone}
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
                  <Button
                    icon={<WalletOutlined />}
                    onClick={() => navigate('/profile/wallet')}
                  >
                    Wallet
                  </Button>
                </Col>
              </Row>
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
                  <Input
                    type='text'
                    name='gender'
                    value={editedUser.gender}
                    onChange={handleFieldChange}
                  />
                </Item>

                {/* <Item label='Gender' name='gender'>
                  <Select
                    style={{ width: 200 }}
                    onChange={handleFieldChange}
                    placeholder='Select a gender'
                  >
                    {genderOptions.map((gender, index) => (
                      <Select.Option key={index} value={gender}>
                        {gender}
                      </Select.Option>
                    ))}
                  </Select>
                </Item> */}

                <Item label='Timezone'>
                  <Input
                    type='text'
                    name='timezone'
                    value={editedUser.timezone}
                    onChange={handleFieldChange}
                  />
                </Item>

                {/* <Item label='Timezone'>
                  <Select
                    id='timezone'
                    value={editedUser.timezone}
                    onChange={handleFieldChange}
                  >
                    {timezones.map((timezone, index) => (
                      <Option key={index} value={timezone}>
                        {timezone}
                      </Option>
                    ))}
                  </Select>
                </Item> */}

                <Divider />

                {/* <Item label='Avatar'>
                  <Dragger>
                    <p className='ant-upload-drag-icon'>
                      <UserOutlined />
                    </p>
                    <p className='ant-upload-text'>
                      Click or drag file to this area to upload
                    </p>
                  </Dragger>
                </Item> */}
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
