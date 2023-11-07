import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  List,
  Card,
  Tag,
  Button,
  Form,
  Checkbox,
  Modal,
  message,
  Input,
  Col,
  Row,
} from 'antd'
import { CheckCircleOutlined, EditOutlined } from '@ant-design/icons'

const GetAvailableDays: React.FC = () => {
  const [data, setData] = useState<any>({})
  // const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [form] = Form.useForm()
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState<string | null>(
    null,
  )
  const [hourCheckboxes, setHourCheckboxes] = useState<JSX.Element[]>([])
  // const [showUnavailable, setShowUnavailable] = useState(false)

  const showModal = (dayOfWeek: string) => {
    console.log(dayOfWeek)
    setSelectedDayOfWeek(dayOfWeek)
    setModalVisible(true)
  }

  useEffect(() => {
    const hoursInDay = Array.from({ length: 24 }, (_, i) => i)
    const checkboxes = hoursInDay.map((hour) => (
      <Checkbox key={hour} value={hour} style={{ paddingRight: 10 }}>
        {hour}:00
      </Checkbox>
    ))
    setHourCheckboxes(checkboxes)

    axios
      .get('/api/users/availability/all')
      .then((response) => {
        console.log(response.data)
        setData(response.data)
      })
      .catch((error) => {
        console.error('Error while making the GET request:', error)
      })
  }, [])

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      const selectedHourSlots = values.availableHours.map(
        (hour: number) => hour,
      )

      const requestBody = {
        day: selectedDayOfWeek,
        slots: selectedHourSlots,
      }

      await axios.patch(`/api/users/availability`, requestBody)
      message.success('Changes successfully saved')
      setModalVisible(false)
      form.resetFields()
    } catch (error) {
      console.error(error)
      message.error('Error while saving changes')
    }
  }

  const handleCancel = () => {
    setModalVisible(false)
    form.resetFields()
  }

  const renderTimeSlots = (dayOfWeek: string) => {
    const dayData = data[dayOfWeek] || []

    if (!Array.isArray(dayData)) {
      return null
    }

    return (
      <div>
        {dayData.map((timeSlot: any, index: any) => (
          <span key={index}>
            {/* {timeSlot.isAvailable ? (
              <Tag icon={<CheckCircleOutlined />} color='green'>
                {timeSlot}
              </Tag>
            ) : ( */}
            <Tag color='red' style={{ margin: '1px' }}>
              {timeSlot}:00
            </Tag>
            {/* )} */}
          </span>
        ))}
      </div>
    )
  }

  return (
    <div>
      <Row gutter={16}>
        {Object.keys(data).map((dayOfWeek) => (
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
        title='Select Unvailable Time'
        open={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        // okButtonProps={{ loading }}
      >
        <Form form={form}>
          <Form.Item
            name='UnavailableHours'
            rules={[
              { required: true, message: 'Please specify unavailable hours' },
            ]}
          >
            <Checkbox.Group style={{ width: '100%' }}>
              {hourCheckboxes}
            </Checkbox.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

const getDayOfWeek = (dayOfWeek: string) => {
  const days: { [key: string]: string } = {
    MON: 'Monday',
    TUE: 'Tuesday',
    WED: 'Wednesday',
    THU: 'Thursday',
    FRI: 'Friday',
    SAT: 'Saturday',
    SUN: 'Sunday',
  }
  return (days as { [key: string]: string })[dayOfWeek] || ''
}

export default GetAvailableDays
