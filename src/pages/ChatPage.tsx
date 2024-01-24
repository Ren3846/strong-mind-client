import React, { useState, useEffect, useRef } from 'react'
import { Input, Button, List, Card, Space, Row, Col } from 'antd'
import io, { Socket } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import CustomAvatar from '../components/common/CustomAvatar'
import { useSelector } from 'react-redux'
import { StoreType } from '../redux/store'
import { IUser } from '../redux/store/types'
import MyBreadcrumb from '../components/common/Breadcrumb'
import useTranslations from '../lang/useTranslations'

const { TextArea } = Input

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Chat' },
]

interface MessageType {
  _id: string
  sender: string
  content: string
  createdAt: string
}

interface ChatType {
  _id: string
  sender: string
  receiver: string
  messages: MessageType[]
  createdAt: string
  updatedAt: string
}

const Chat = () => {
  const t = useTranslations('')
  const { chatId } = useParams()
  const [connected, setConnected] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [messages, setMessages] = useState<MessageType[]>([])
  const [messageInput, setMessageInput] = useState('')
  const [chat, setChat] = useState<ChatType | null>(null)
  const [receiver, setReceiver] = useState<IUser>()

  const currentUser = useSelector<StoreType, IUser>(
    (state: any) => state.auth.user,
  )
  const messageListRef = useRef<HTMLDivElement>(null)

  const socket = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>()

  useEffect(() => {
    console.log('Подключение к сокету...')
    socket.current = io('/api')

    getChat(chatId || '')

    socket.current.on('connect', () => {
      setConnected(true)
    })

    socket.current.on('message', handleIncomingMessage)

    return () => {
      console.log('Отключение сокета...')
      if (socket.current) {
        socket.current.disconnect()
      }
    }
  }, [chatId])

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight
    }
  }, [messages])

  const getChat = (chatId: string) => {
    console.log(`Загружаем историю сообщений чата ${chatId}`)
    setLoaded(false)

    axios({
      url: `/api/chat/${chatId}`,
      method: 'get',
    })
      .then(({ data }) => {
        console.log(`Chat ${chatId} data:`, data)
        setChat(data)
        setMessages(data.messages)
        setLoaded(true)

        axios({
          url: `/api/users/${data.receiver}`,
          method: 'get',
        })
          .then((userData) => {
            console.log(`Receiver user data:`, userData.data)
            setReceiver(userData.data)

            setChat((prevChat) => {
              if (prevChat) {
                return {
                  ...prevChat,
                  receiverDetails: userData.data,
                }
              }
              return null
            })
          })
          .catch((userError) => {
            console.error('Error fetching receiver user details', userError)
          })
      })
      .catch((err) => {
        console.error(`Error fetching chat ${chatId}`, err)
      })
  }

  const handleIncomingMessage = (data: MessageType) => {
    console.log('Получено сообщение:', data)
    setMessages((prevMessages) => [...prevMessages, data])
    setChat((prevChat) => {
      if (prevChat) {
        return {
          ...prevChat,
          messages: [...prevChat.messages, data],
        }
      }
      return null
    })
  }

  const sendMessage = (chatId: string, message: string) => {
    axios({
      url: '/api/chat/message',
      method: 'post',
      data: {
        chatId,
        content: message,
      },
    })
      .then(({ data }) => {
        console.log('Message sent!', data)
      })
      .catch((err) => {
        console.error('Error sending message', err)
      })
    setMessageInput('')
  }

  const getProfileLink = (userId: any, userRole: string) => {
    return userRole === 'teacher' ? `/user/${userId}` : `/teacher/${userId}`
  }

  return (
    <>
      <Row align='middle' justify='center'>
        <Col span={12}>
          <MyBreadcrumb items={breadcrumbItems} />

          <Card
            title={t('title')}
            style={{ marginTop: '20px' }}
            extra={
              <>
                {' '}
                <Link to={getProfileLink(receiver?._id, currentUser.role)}>
                  {receiver?.fullName}{' '}
                  <CustomAvatar avatar={receiver?.avatar} />
                </Link>
              </>
            }
          >
            <div
              ref={messageListRef}
              style={{ maxHeight: '450px', overflowY: 'auto', padding: 25 }}
            >
              <List
                loading={!connected || !loaded}
                dataSource={messages}
                renderItem={(msg, index) => (
                  <List.Item key={index}>
                    <List.Item.Meta
                      title={msg.content}
                      description={new Date(msg.createdAt).toLocaleString()}
                      style={{
                        textAlign:
                          msg.sender === currentUser._id ? 'right' : 'left',
                      }}
                    />
                  </List.Item>
                )}
              />
            </div>
            <Card style={{ marginTop: 25 }}>
              <TextArea
                rows={3}
                value={messageInput}
                onPressEnter={() => sendMessage(chatId || '', messageInput)}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <Space>
                <Button
                  type='primary'
                  onClick={() => sendMessage(chatId || '', messageInput)}
                  style={{ marginTop: '8px' }}
                >
                  {t('send')}
                </Button>
              </Space>
            </Card>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Chat
