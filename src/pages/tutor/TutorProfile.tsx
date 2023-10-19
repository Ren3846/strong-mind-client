import React, { useState, ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { message, Form, Input, Button, Row, Card, Avatar, Upload } from 'antd'
import { updateUserDetailsAPI } from '../../api/user'
import Layout from '../../components/common/Layout'
import Preloader from '../../components/common/Preloader'

import { UserOutlined } from '@ant-design/icons'

const { Item } = Form
const { Dragger } = Upload

function TutorProfile() {
  const user = useSelector((state: any) => state.auth.user)
  const dispatch = useDispatch()

  const [editedUser, setEditedUser] = useState({ ...user })

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedUser({ ...editedUser, [name]: value })
  }

  const saveTutorProfile = () => {
    updateUserDetailsAPI(editedUser)
      .then((response) => {
        console.log(response)
        message.success('TutorProfile updated successfully', 3)
        dispatch({ type: 'UPDATE_USER', payload: editedUser })
      })
      .catch((err) => {
        console.error(err)
        // message.error(err?.response.errors.message)
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
        <Card title='TutorProfile' style={{ width: '60rem' }}>
          {loaded ? (
            <>
              <Row justify='center'>
                <Avatar size={120} icon={<UserOutlined />} />
              </Row>

              <h3 style={{ color: 'red' }}>Role: {user.role}</h3>

              <Form layout='vertical'>
                <Item label='fullName'>
                  <Input
                    type='text'
                    name='fullName'
                    value={editedUser.fullName}
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
                <Item label='Bio'>
                  <Input.TextArea
                    rows={4}
                    name='description'
                    value={editedUser.description}
                    // onChange={handleFieldChange}
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
                  <Button type='primary' onClick={saveTutorProfile}>
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

export default TutorProfile
