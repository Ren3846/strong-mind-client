import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Drawer, DatePicker, TimePicker, Button, message, Space } from 'antd'
import { Dayjs } from 'dayjs'
import { PhoneOutlined } from '@ant-design/icons'
import useTranslations from '../../lang/useTranslations'

interface CallRequestProps {
  teacherId: string
  courseId: string
}

const RequestMeeting: React.FC<CallRequestProps> = ({
  teacherId,
  courseId,
}) => {
   
  const t = useTranslations('RequestMeeting')

  const [drawerVisible, setDrawerVisible] = useState(false)
  const [date, setDate] = useState<Dayjs | null>(null)
  const [time, setTime] = useState<Dayjs | null>(null)
  const [loading, setLoading] = useState(false)
  const [busySchedule, setBusySchedule] = useState<Record<string, string[]>>({})

  useEffect(() => {
    const fetchBusySchedule = async () => {
      try {
        const response = await axios.get(
          `/api/users/two-week-free-schedule/${teacherId}`,
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

  const showDrawer = () => {
    setDrawerVisible(true)
  }

  const handleOk = () => {
    setDrawerVisible(false)
    if (date && time) {
      sendCallRequest()
    }
  }

  const handleCancel = () => {
    setDrawerVisible(false)
  }

  const sendCallRequest = async () => {
    setLoading(true)
    try {
      if (date && time) {
        const formattedDate = date.utcOffset(0).format('DD.MM.YYYY')
        const formattedHour = time.format('HH')

        console.log(formattedDate, formattedHour)

        await axios.post(`/api/meetings/${courseId}`, {
          date: formattedDate,
          hour: formattedHour,
        })

        message.success(t('call-request-sent'))
        console.log(formattedDate, formattedHour)
      }
    } catch (error) {
      console.error(error)
      message.error(t('error-sending-request'))
    } finally {
      setLoading(false)
    }
  }

  const disabledDate = (current: Dayjs) => {
    const dateAvailable = Object.keys(busySchedule).includes(
      current.format('DD.MM.YYYY'),
    )
    return !dateAvailable
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
      <Button type='primary' onClick={showDrawer} loading={loading}>
        <PhoneOutlined />
        {t('request-call')}
      </Button>
      <Drawer
        title={t('choose-date-time')}
        placement='right'
        visible={drawerVisible}
        onClose={handleCancel}
        width={360}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={handleCancel} style={{ marginRight: 8 }}>
            {t('cancel')}
            </Button>
            <Button onClick={handleOk} type='primary'>
            {t('submit')}
            </Button>
          </div>
        }
      >
        <DatePicker
          onChange={(value) => setDate(value)}
          style={{ marginBottom: '10px', marginRight: '10px' }}
          disabledDate={disabledDate}
        />
        <TimePicker
          onChange={(value) => setTime(value)}
          showNow={false}
          format='HH'
          disabledHours={disabledHours}
        />
      </Drawer>
    </div>
  )
}

export default RequestMeeting
