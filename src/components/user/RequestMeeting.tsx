import React, { useState } from 'react'
import { Modal, DatePicker, TimePicker, Button } from 'antd'
import axios from 'axios'
import dayjs, { Dayjs } from 'dayjs' // Импортируйте библиотеку dayjs

interface CallRequestProps {
  teacherId: string
}

const RequestMeeting: React.FC<CallRequestProps> = ({ teacherId }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [date, setDate] = useState<Dayjs | null>(null)
  const [time, setTime] = useState<Dayjs | null>(null)
  const [loading, setLoading] = useState(false)

  const showModal = () => {
    setModalVisible(true)
  }

  const handleOk = () => {
    setModalVisible(false)
    if (date && time) {
      sendCallRequest()
    }
  }

  const handleCancel = () => {
    setModalVisible(false)
  }

  const sendCallRequest = async () => {
    setLoading(true)
    try {
      if (date && time) {
        // Проверяем, что date и time не равны null
        const dateTime = new Date(
          date.format('YYYY-MM-DD') + ' ' + time.format('HH:mm:ss'),
        )
        await axios.post('/api/users/meetings/request', {
          teacherId,
          date: dateTime.toISOString(),
        })
        console.log('Call request sent successfully')
      }
    } catch (error) {
      console.error(error)
      console.error('Error while sending call request')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Button onClick={showModal} disabled={loading}>
        Request a Call
      </Button>
      <Modal
        title='Choose Date and Time'
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ loading }}
      >
        <DatePicker
          onChange={(value) => setDate(value)}
          style={{ marginBottom: '10px' }}
        />
        <TimePicker onChange={(value) => setTime(value)} format='HH:mm' />
      </Modal>
    </div>
  )
}

export default RequestMeeting
