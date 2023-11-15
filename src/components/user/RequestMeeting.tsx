import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Modal, DatePicker, TimePicker, Button, message, Space } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { PhoneOutlined } from '@ant-design/icons'

interface CallRequestProps {
  teacherId: string
  courseId: string
}

const RequestMeeting: React.FC<CallRequestProps> = ({
  teacherId,
  courseId,
}) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [date, setDate] = useState<Dayjs | null>(null)
  const [time, setTime] = useState<Dayjs | null>(null)
  const [loading, setLoading] = useState(false)
  const [busySchedule, setBusySchedule] = useState<Record<string, string[]>>({})

  useEffect(() => {
    const fetchBusySchedule = async () => {
      try {
        const response = await axios.get(
          `/api/users/two-week-free-schedule/6551f2ea4213ff0156c4ced1`,
        )
        setBusySchedule(response.data)
        const keys = Object.keys(response.data)
        console.log('shedule', keys)
      } catch (error) {
        console.error('Error fetching busy schedule:', error)
      }
    }

    fetchBusySchedule()
  }, [teacherId])

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
        await axios.post(`/api/meetings/${courseId}`, {
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

  const disabledDate = (current: Dayjs | null) => {
    if (!current) {
      return false
    }
    const isBeforeToday = current.isBefore(dayjs().startOf('day'))
    return isBeforeToday
  }

  const disabledHours = () => {
    if (!date) {
      return []
    }

    const currentDay = date.format('DD.MM.YYYY')
    const busyHoursForDay = busySchedule[currentDay] || []

    if (busyHoursForDay.length === 0) {
      return Array.from({ length: 24 }).map((_, index) => index)
    }

    const busyHoursArray = busyHoursForDay.map((hour) =>
      parseInt(hour.split(':')[0]),
    )

    return Array.from({ length: 24 })
      .map((_, index) => index)
      .filter((hour) => !busyHoursArray.includes(hour))
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
          style={{ marginBottom: '10px', marginRight: '10px' }}
          disabledDate={disabledDate}
        />
        <TimePicker
          onChange={(value) => setTime(value)}
          format='HH'
          disabledHours={disabledHours}
        />
      </Modal>
    </div>
  )
}

export default RequestMeeting
