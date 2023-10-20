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
  Space,
  Divider,
  Select,
} from 'antd'
import { updateUserDetailsAPI } from '../../api/user'
import Layout from '../../components/common/Layout'
import Preloader from '../../components/common/Preloader'

import { UserOutlined } from '@ant-design/icons'
import { updateUser } from '../../redux/actions/user'

const { Item } = Form
const { Dragger } = Upload
const { Title } = Typography

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

function Profile() {
  const user = useSelector((state: any) => state.auth.user)
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

  return (
    <Layout>
      <Row align='middle' justify='center'>
        <Card title='Profile' style={{ width: '60rem' }}>
          {loaded ? (
            <>
              <Row justify='center'>
                <Avatar size={120} icon={<UserOutlined />} />
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
                <Divider />

                <Item label='Avatar'>
                  <Dragger>
                    <p className='ant-upload-drag-icon'>
                      <UserOutlined />
                    </p>
                    <p className='ant-upload-text'>
                      Click or drag file to this area to upload
                    </p>
                  </Dragger>
                </Item>
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
