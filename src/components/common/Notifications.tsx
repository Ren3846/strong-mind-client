import React, { useEffect, useState } from 'react'
import { BellOutlined, MailOutlined, MessageOutlined } from '@ant-design/icons'
import { Badge, Button, Dropdown, Empty, Menu } from 'antd'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { IUser } from '../../redux/store/types'
import { Link } from 'react-router-dom'
import Preloader from './Preloader'

const Notifications = () => {
  const user = useSelector((state: any) => state.auth.user)
  const [receivers, setReceivers] = useState<{ [key: string]: IUser }>({})
  const [loading, setLoading] = useState(true)

  console.log(user)

  useEffect(() => {
    const fetchOtherUsers = async () => {
      const promises = user.chats.map((chat: any) =>
        axios({
          url: `/api/users/${chat.otherUserId}`,
          method: 'get',
        }).then(({ data }) => ({ [chat.otherUserId]: data })),
      )

      Promise.all(promises)
        .then((users) => {
          const mergedUsers = Object.assign({}, ...users)
          setReceivers(mergedUsers)
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          setLoading(false)
        })
    }

    fetchOtherUsers()
  }, [user.chats])

  const markChatAsRead = async (chatId: string) => {
    try {
      const response = await axios.patch(`/api/chat/${chatId}`, {
        userId: user._id,
      })
      console.log(user, response)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleChatClick = (chatId: string) => {
    markChatAsRead(chatId)
  }

  const chatsWithUnreadMessages = user.chats.filter(
    (chat: any) => chat.hasUnreadMessages === true,
  )

  const numberOfChatsWithUnreadMessages = chatsWithUnreadMessages.length

  const chatMenu = (
    <Menu>
      {user.chats.length === 0 ? (
        <Menu.Item key='no-data'>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='No chats' />
        </Menu.Item>
      ) : (
        user.chats.map((chat: any) => (
          <Menu.Item key={chat.chatId}>
            {loading ? (
              <Preloader />
            ) : (
              <Link
                to={`/chat/${chat.chatId}`}
                onClick={() => handleChatClick(chat.chatId)}
              >
                {chat.hasUnreadMessages ? (
                  <span style={{ color: 'red' }}>
                    <MessageOutlined
                      style={{ color: 'red', marginRight: '8px' }}
                    />
                    {receivers[chat.otherUserId]?.fullName}
                  </span>
                ) : (
                  <span>
                    <MailOutlined
                      style={{ color: 'black', marginRight: '8px' }}
                    />
                    {receivers[chat.otherUserId]?.fullName}
                  </span>
                )}
              </Link>
            )}
          </Menu.Item>
        ))
      )}
    </Menu>
  )

  return (
    <Dropdown overlay={chatMenu} placement='bottom'>
      <Badge
        count={numberOfChatsWithUnreadMessages}
        size='small'
        style={{ marginRight: '20px' }}
      >
        <Button
          icon={<BellOutlined />}
          // type='primary'
          size='large'
          shape='circle'
          // ghost
        />
      </Badge>
    </Dropdown>
  )
}

export default Notifications
