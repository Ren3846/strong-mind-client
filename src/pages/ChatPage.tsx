import React, { useState, useEffect } from 'react'
import { Input, Button, List, Card } from 'antd'
import io, { Socket } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const { TextArea } = Input

interface MessageType {
  text: string
}

const Chat = () => {
  const {chatId} = useParams();
  const [connected, setConnected] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([])
  const [messageInput, setMessageInput] = useState('')
  const socket = React.useRef<Socket<DefaultEventsMap, DefaultEventsMap>>()

  useEffect(() => {
    console.log('Подключение к сокету...')
    socket.current = io('http://localhost:3000/api')

    getChat(chatId || "");

    const handleIncomingMessage = (data: MessageType) => {
      console.log('Получено сообщение:', data)
      setMessages((prevMessages) => [...prevMessages, data])
    }

    socket.current.on("connect", () => {
      setConnected(true);
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
    setLoaded(false);
    axios({
      url: `/api/chat/${chatId}`,
      method: "get"
    }).then(({data}) => {
      console.log(`chat ${chatId} data:`, data);
    }).catch(err => {
      console.error(`Error fetching chat ${chatId}`)
    })
  }

  const sendMessage = (chatId: string, message: string) => {
    axios({
      url: "/api/chat/message",
      method: "post",
      data: {
        chatId,
        content: message
      }
    }).then(({data}) => {
      console.log("Message sent!", data)
    }).catch(err => {
      console.error("Error sending message", err);
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
          onClick={() => sendMessage(chatId || "", messageInput)}
          style={{ marginTop: '8px' }}
        >
          Send
        </Button>
      </Card>
    </div>
  )
}

export default Chat
