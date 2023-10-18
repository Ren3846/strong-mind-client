import { useState, ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { message, Form, Input, Button, Row, Card, Avatar, Upload } from 'antd'
import { updateUserDetailsAPI } from '../../api/user'
import Layout from '../../components/common/layout'
import Preloader from '../../components/common/Preloader'

import { UserOutlined } from '@ant-design/icons'
import { updateUser } from '../../redux/actions/user'

const { Item } = Form
const { Dragger } = Upload

function Profile() {
  const user = useSelector((state: any) => state.auth.user)
  const dispatch = useDispatch()

  const [editedUser, setEditedUser] = useState({ ...user })

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
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
  const [loaded, setLoaded] = useState(true)

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

              <h3 style={{ color: 'red' }}>Role: {user.role}</h3>
              <h3 style={{ color: 'red' }}>Balance: {user.balance}</h3>

              <Form layout='vertical'>
                <Item label='Full Name'>
                  <Input
                    type='text'
                    name='username'
                    value={editedUser.username}
                    onChange={handleFieldChange}
                  />
                </Item>
                <Item label='Email'>
                  <Input
                    type='text'
                    name='email'
                    value={editedUser.email}
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
                    name='description'
                    value={editedUser.bio}
                    // onChange={handleFieldChange}
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
