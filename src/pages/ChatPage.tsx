import React, { useState, useEffect } from 'react'
import { Input, Button, List, Card, Avatar } from 'antd'
import io, { Socket } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import CustomAvatar from '../components/common/Avatar'
import { StoreType } from '../redux/store'
import { User } from '../redux/store/types'
import { useSelector } from 'react-redux'

const { TextArea } = Input

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
  const { chatId } = useParams()
  const [connected, setConnected] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [messages, setMessages] = useState<MessageType[]>([])
  const [messageInput, setMessageInput] = useState('')
  const [chat, setChat] = useState<ChatType | null>(null)
  const socket = React.useRef<Socket<DefaultEventsMap, DefaultEventsMap>>()

  const currentUser = useSelector<StoreType, User>(
    (state: any) => state.auth.user,
  )

  useEffect(() => {
    console.log('Подключение к сокету...')
    socket.current = io('http://localhost:3000/api')

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
        handleIncomingMessage(data)
      })
      .catch((err) => {
        console.error('Error sending message', err)
      })
    setMessageInput('')
  }

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <Card title='Chat'>
        <List
          loading={!connected || !loaded}
          dataSource={messages}
          renderItem={(msg, index) => (
            <List.Item key={index}>
              <List.Item.Meta
                title={msg.content}
                avatar={<CustomAvatar avatar={currentUser.avatar} />}
              />
            </List.Item>
          )}
        />
        <TextArea
          rows={3}
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <Button
          type='primary'
          onClick={() => sendMessage(chatId || '', messageInput)}
          style={{ marginTop: '8px' }}
        >
          Send
        </Button>
      </Card>
    </div>
  )
}

export default Chat
