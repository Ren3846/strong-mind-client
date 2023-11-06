import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  List,
  Card,
  Tag,
  Space,
  Button,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Modal,
  message,
} from 'antd'
import { EditOutlined } from '@ant-design/icons'

const GetAvailableDays = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [form] = Form.useForm()

  const showModal = () => {
    setModalVisible(true)
  }

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      const requestBody = {
        timeSlots: [
          {
            start: values.start.format('HH:mm'),
            end: values.end.format('HH:mm'),
            isAvailable: values.isAvailable,
            meetingId: values.meetingId || '',
          },
        ],
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

  useEffect(() => {
    axios
      .get('/api/users/availability/all')
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.error('Error while making the GET request:', error)
      })
  }, [])

  return (
    <div>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={data}
        renderItem={(item: any) => (
          <List.Item>
            <Card
              title={`${getDayOfWeek(item.dayOfWeek)}`}
              extra={
                <Button type='primary' onClick={showModal}>
                  <EditOutlined />
                </Button>
              }
            >
              {item.timeSlots.map((timeSlot: any, index: any) => (
                <div key={index}>
                  <Space>
                    {timeSlot.isAvailable ? (
                      <Tag color='green'>Available</Tag>
                    ) : (
                      <Tag color='red'>Unavailable</Tag>
                    )}
                    Time: {timeSlot.start} - {timeSlot.end}
                  </Space>
                </div>
              ))}
            </Card>
          </List.Item>
        )}
      />{' '}
      <Modal
        title='Edit Available Time'
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ loading }}
      >
        <Form form={form}>
          <Form.Item
            name='start'
            label='Start Time'
            rules={[
              { required: true, message: 'Please specify the start time' },
            ]}
          >
            <TimePicker format='HH:mm' minuteStep={30} />
          </Form.Item>
          <Form.Item
            name='end'
            label='End Time'
            rules={[
              {
                required: true,
                message: 'Please specify the end time',
              },
            ]}
          >
            <TimePicker format='HH:mm' minuteStep={30} />
          </Form.Item>
          {/* <Form.Item name='isAvailable' label='Available'>
            <Input type='checkbox' />
          </Form.Item>
          <Form.Item name='meetingId' label='Meeting ID'>
            <Input />
          </Form.Item> */}
        </Form>
      </Modal>
    </div>
  )
}

const getDayOfWeek = (dayOfWeek: any) => {
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]
  return days[dayOfWeek - 1]
}

export default GetAvailableDays
