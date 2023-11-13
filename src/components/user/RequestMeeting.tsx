import React, { useState } from 'react'
import { Modal, DatePicker, TimePicker, Button, message } from 'antd'
import axios from 'axios'
import dayjs, { Dayjs } from 'dayjs'
import { PhoneOutlined } from '@ant-design/icons'

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
        const dateTime = new Date(
          date.format('YYYY-MM-DD') + ' ' + time.format('HH:mm:ss'),
        )
        await axios.post(`/api/meetings/${teacherId}`, {
          date: dateTime.toISOString(),
        })
        message.success('Call request sent successfully')
      }
    } catch (error) {
      console.error(error)
      message.error('Error while sending call request')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Button type='primary' onClick={showModal} loading={loading}>
        <PhoneOutlined />
        Request a Call
      </Button>
      <Modal
        title='Choose Date and Time'
        open={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ loading }}
      >
        <DatePicker
          onChange={(value) => setDate(value)}
          style={{ marginBottom: '10px' }}
        />
        <TimePicker
          minuteStep={30}
          onChange={(value) => setTime(value)}
          format='HH:mm'
        />
      </Modal>
    </div>
  )
}

export default RequestMeeting
