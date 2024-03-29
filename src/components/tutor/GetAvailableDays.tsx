import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Card,
  Tag,
  Button,
  Form,
  Checkbox,
  Modal,
  message,
  Col,
  Row,
} from 'antd'
import { CheckCircleOutlined, EditOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { IUser } from '../../redux/store/types'

import useTranslations from '../../lang/useTranslations'


const GetAvailableDays: React.FC = () => {
  const t = useTranslations('GetAvailableDays')

  const user = useSelector((state: IUser) => state.auth.user)
  const [modalVisible, setModalVisible] = useState(false)
  const [form] = Form.useForm()
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState<string | null>(
    null,
  )
  const [hourCheckboxes, setHourCheckboxes] = useState<JSX.Element[]>([])
  const [selectedHours, setSelectedHours] = useState<any>([])

  const showModal = (dayOfWeek: string) => {
    setSelectedDayOfWeek(dayOfWeek)
    setModalVisible(true)

    form.setFieldsValue({
      UnavailableHours: selectedHours[dayOfWeek] || [],
    })
  }

  useEffect(() => {
    const fetchTeacherSchedule = async () => {
      try {
        const response = await axios.get(`/api/users/teacher-schedule`)
        const teacherSchedule = response.data
        setSelectedHours(teacherSchedule)
        console.log(teacherSchedule)
      } catch (error) {
        console.error(error)
      }
    }
    fetchTeacherSchedule()

    const hoursInDay = Array.from({ length: 24 }, (_, i) => i)
    const checkboxes = hoursInDay.map((hour) => (
      <Tag style={{ width: 80, marginBottom: 5 }} color='warning' key={hour}>
        <Checkbox value={hour} style={{ paddingRight: 10 }}>
          {hour}:00
        </Checkbox>
      </Tag>
    ))
    setHourCheckboxes(checkboxes)
  }, [user._id])

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      const selectedHourSlots = values.UnavailableHours.map(
        (hour: number) => hour,
      )

      const updatedSelectedHours = {
        ...selectedHours,
        [selectedDayOfWeek!]: selectedHourSlots,
      }

      setSelectedHours(updatedSelectedHours)

      const requestBody = {
        day: selectedDayOfWeek,
        slots: selectedHourSlots,
      }

      await axios.patch('/api/users/availability/', requestBody)
      message.success(t('changes-successfully-saved'))
      setModalVisible(false)
      form.resetFields()
    } catch (error) {
      console.error(error)
      message.error(t('error-while-saving-changes'))
    }
  }

  const handleCancel = () => {
    setModalVisible(false)
    form.resetFields()
  }

  const renderTimeSlots = (dayOfWeek: string) => {
    const dayData = selectedHours[dayOfWeek] || []

    if (!Array.isArray(dayData)) {
      return null
    }

    return (
      <div>
        {dayData.map((timeSlot: any, index: any) => (
          <span key={index}>
            <Tag
              icon={<CheckCircleOutlined />}
              color='green'
              style={{ margin: '1px' }}
            >
              {timeSlot}:00
            </Tag>
          </span>
        ))}
      </div>
    )
  }

  const getDayOfWeek = (dayOfWeek: string) => {
    const days: { [key: string]: string } = {
      MON: t('Monday'),
      TUE: t('Tuesday'),
      WED: t('Wednesday'),
      THU: t('Thursday'),
      FRI: t('Friday'),
      SAT: t('Saturday'),
      SUN: t('Sunday'),
    }
    return (days as { [key: string]: string })[dayOfWeek] || ''
  }

  return (
    <div>
      <Row gutter={16}>
        {Object.keys(selectedHours).map((dayOfWeek) => (
          <Col span={6} key={dayOfWeek}>
            <Card
              title={getDayOfWeek(dayOfWeek)}
              style={{ margin: 5 }}
              extra={
                <Button type='primary' onClick={() => showModal(dayOfWeek)}>
                  <EditOutlined />
                </Button>
              }
            >
              {renderTimeSlots(dayOfWeek)}
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        title={t('select-available-time')}
        open={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item name='UnavailableHours'>
            <Checkbox.Group style={{ width: '100%' }}>
              {hourCheckboxes}
            </Checkbox.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}


export default GetAvailableDays
