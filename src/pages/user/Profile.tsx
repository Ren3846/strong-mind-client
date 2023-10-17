import React, { useState, ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { message, Form, Input, Button, Row, Card } from 'antd'
import { updateUserDetailsAPI } from '../../api/user' // Подключите функцию для обновления данных пользователя
import Layout from '../../components/layout'
import Preloader from '../../components/common/Preloader'

const { Item } = Form

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
        <Card title='Profile' style={{ width: '60rem' }}>
          {loaded ? (
            <>
              <h3 style={{ color: 'red' }}>Role: {user.role}</h3>

              <Form layout='vertical'>
                <Item label='Username'>
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
