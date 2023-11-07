// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import {
//   List,
//   Card,
//   Tag,
//   Space,
//   Button,
//   Form,
//   TimePicker,
//   Modal,
//   message,
// } from 'antd'
// import { EditOutlined } from '@ant-design/icons'

// const GetAvailableDays = () => {
//   const [data, setData] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [modalVisible, setModalVisible] = useState(false)
//   const [form] = Form.useForm()
//   const [selectedDayOfWeek, setSelectedDayOfWeek] = useState(null)

//   const showModal = (dayOfWeek: any) => {
//     setSelectedDayOfWeek(dayOfWeek)
//     setModalVisible(true)
//   }

//   const handleOk = async () => {
//     try {
//       const values = await form.validateFields()
//       const requestBody = {
//         dayOfWeek: selectedDayOfWeek, // Pass the selected day of the week
//         timeSlots: [
//           {
//             start: values.start.format('HH:mm'),
//             end: values.end.format('HH:mm'),
//             isAvailable: true,
//             meetingId: values.meetingId || '',
//           },
//         ],
//       }

//       await axios.patch(`/api/users/availability`, requestBody)
//       message.success('Changes successfully saved')
//       setModalVisible(false)
//       form.resetFields()
//     } catch (error) {
//       console.error(error)
//       message.error('Error while saving changes')
//     }
//   }

//   const handleCancel = () => {
//     setModalVisible(false)
//     form.resetFields()
//   }

//   useEffect(() => {
//     axios
//       .get('/api/users/availability/all')
//       .then((response) => {
//         setData(response.data)
//       })
//       .catch((error) => {
//         console.error('Error while making the GET request:', error)
//       })
//   }, [])

//   return (
//     <div>
//       <List
//         grid={{ gutter: 16, column: 4 }}
//         dataSource={data}
//         renderItem={(item: any) => (
//           <List.Item>
//             <Card
//               title={`${getDayOfWeek(item.dayOfWeek)}`}
//               extra={
//                 <Button
//                   type='primary'
//                   onClick={() => showModal(item.dayOfWeek)}
//                 >
//                   <EditOutlined />
//                 </Button>
//               }
//             >
//               {item.timeSlots.map((timeSlot: any, index: any) => (
//                 <div key={index}>
//                   <Space>
//                     {timeSlot.isAvailable ? (
//                       <Tag color='green'>Available</Tag>
//                     ) : (
//                       <Tag color='red'>Unavailable</Tag>
//                     )}
//                     Time: {timeSlot.start} - {timeSlot.end}
//                   </Space>
//                 </div>
//               ))}
//             </Card>
//           </List.Item>
//         )}
//       />{' '}
//       <Modal
//         title='Edit Available Time'
//         visible={modalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         okButtonProps={{ loading }}
//       >
//         <Form form={form}>
//           <Form.Item
//             name='start'
//             label='Start Time'
//             rules={[
//               { required: true, message: 'Please specify the start time' },
//             ]}
//           >
//             <TimePicker format='HH:mm' minuteStep={30} />
//           </Form.Item>
//           <Form.Item
//             name='end'
//             label='End Time'
//             rules={[
//               {
//                 required: true,
//                 message: 'Please specify the end time',
//               },
//             ]}
//           >
//             <TimePicker format='HH:mm' minuteStep={30} />
//           </Form.Item>
//           {/* <Form.Item name='isAvailable' label='Available'>
//             <Input type='checkbox' />
//           </Form.Item>
//           <Form.Item name='meetingId' label='Meeting ID'>
//             <Input />
//           </Form.Item> */}
//         </Form>
//       </Modal>
//     </div>
//   )
// }

// const getDayOfWeek = (dayOfWeek: any) => {
//   const days = [
//     'Monday',
//     'Tuesday',
//     'Wednesday',
//     'Thursday',
//     'Friday',
//     'Saturday',
//     'Sunday',
//   ]
//   return days[dayOfWeek - 1]
// }

// export default GetAvailableDays

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  List,
  Card,
  Tag,
  Space,
  Button,
  Form,
  Checkbox,
  Modal,
  message,
  Input,
  Row,
  Col,
  Switch,
} from 'antd'
import { CheckCircleOutlined, EditOutlined } from '@ant-design/icons'

const GetAvailableDays: React.FC = () => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [form] = Form.useForm()
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState<number | null>(
    null,
  )
  const [hourCheckboxes, setHourCheckboxes] = useState<JSX.Element[]>([])
  const [showUnavailable, setShowUnavailable] = useState(false)

  const showModal = (dayOfWeek: number) => {
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
        setData(response.data)
      })
      .catch((error) => {
        console.error('Error while making the GET request:', error)
      })
  }, [])

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      const selectedHourSlots = values.availableHours.map((hour: number) => ({
        start: `${hour}:00`,
        end: `${hour + 1}:00`,
        isAvailable: true,
        meetingId: values.meetingId || '',
      }))

      const requestBody = {
        dayOfWeek: selectedDayOfWeek,
        timeSlots: selectedHourSlots,
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
                <Button
                  type='primary'
                  onClick={() => showModal(item.dayOfWeek)}
                >
                  <EditOutlined />
                </Button>
              }
            >
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {item.timeSlots.map((timeSlot: any, index: any) => (
                  <div
                    key={index}
                    style={{ whiteSpace: 'nowrap', margin: '1px' }}
                  >
                    {timeSlot.isAvailable ? (
                      <Tag icon={<CheckCircleOutlined />} color='green'>
                        {timeSlot.start} - {timeSlot.end}
                      </Tag>
                    ) : (
                      <Tag color='red'>Unavailable</Tag>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </List.Item>
        )}
      />
      <Modal
        title='Edit Available Time'
        open={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ loading }}
      >
        <Form form={form}>
          <Form.Item
            name='availableHours'
            rules={[
              { required: true, message: 'Please specify available hours' },
            ]}
          >
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                <Col span={24}>{hourCheckboxes}</Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>

          {/* <Form.Item name='meetingId' label='Meeting ID'>
            <Input />
          </Form.Item> */}
        </Form>
      </Modal>
    </div>
  )
}

const getDayOfWeek = (dayOfWeek: number) => {
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
