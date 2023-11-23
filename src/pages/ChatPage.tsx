import React, { useState, useEffect } from 'react'
import { Input, Button, List, Card } from 'antd'
import io, { Socket } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

const { TextArea } = Input

interface MessageType {
  text: string
}

const Chat = () => {
  const [messages, setMessages] = useState<MessageType[]>([])
  const [messageInput, setMessageInput] = useState('')
  const socket = React.useRef<Socket<DefaultEventsMap, DefaultEventsMap>>()

  useEffect(() => {
    console.log('1: Подключение к сокету...')
    socket.current = io('http://localhost:3001')

    const handleIncomingMessage = (data: MessageType) => {
      console.log('3: Получено сообщение:', data)
      setMessages((prevMessages) => [...prevMessages, data])
    }

    socket.current.on('message', handleIncomingMessage)

    socket.current.emit('message', { text: 'Пользователь подключился' })

    return () => {
      console.log('7: Отключение сокета...')
      if (socket.current) {
        socket.current.disconnect()
      }
    }
  }, [])
  const sendMessage = () => {
    if (socket.current) {
      console.log('8: Отправка сообщения на сервер...')
      socket.current.emit('message', { text: messageInput })
    }
    setMessageInput('')
  }

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <Card title='Chat'>
        <List
          dataSource={messages}
          renderItem={(msg, index) => (
            <List.Item key={index}>
              <List.Item.Meta title={msg.text} />
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
          onClick={sendMessage}
          style={{ marginTop: '8px' }}
        >
          Send
        </Button>
      </Card>
    </div>
  )
}

export default Chat
