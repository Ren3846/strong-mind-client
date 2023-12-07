import React, { useState, useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import {
  Alert,
  Button,
  Calendar,
  Card,
  Col,
  Input,
  List,
  Row,
  Space,
  Tag,
  Tooltip,
  message,
} from 'antd'
import MeetingsTeacher from '../../components/tutor/MeetingsTeacher'
import MeetingsStudent from '../../components/user/MeetingsStudent'
import { useSelector } from 'react-redux'
import { IMeeting, USER_ROLE } from '../../redux/store/types'
import { Link, NavLink } from 'react-router-dom'
import {
  ArrowRightOutlined,
  ClockCircleOutlined,
  CopyOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
} from '@ant-design/icons'
import GetUser from '../../components/common/GetUser'

const CalendarPage: React.FC = () => {
  const [value, setValue] = useState(() => dayjs())
  const [selectedValue, setSelectedValue] = useState(() => dayjs())
  const [meetings, setMeetings] = useState<any[]>([])
  const [agenda, setAgenda] = useState<IMeeting[]>([])

  const user = useSelector((state: any) => state.auth.user)

  useEffect(() => {
    fetchMeetingsData()
  }, [])

  const onSelect = (newValue: Dayjs) => {
    setValue(newValue)
    setSelectedValue(newValue)
    updateAgenda(newValue)
  }

  const onPanelChange = (newValue: Dayjs) => {
    setValue(newValue)
    updateAgenda(newValue)
  }

  const fetchMeetingsData = async () => {
    try {
      const response = await fetch('/api/meetings/booked')
      const data = await response.json()
      setMeetings(data)
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error)
    }
  }

  const updateAgenda = (selectedDate: Dayjs) => {
    const meetingsOnDate = meetings.filter((meeting) =>
      dayjs(meeting.start_date).isSame(selectedDate, 'day'),
    )

    const agendaData: IMeeting[] = meetingsOnDate.map((meeting) => ({
      course: meeting.course,
      teacher: meeting.teacher,
      student: meeting.student,
      startDate: dayjs(meeting.start_date).format('YYYY-MM-DD HH:mm:ss'),
      zoomUrl: meeting.zoomUrl,
      status: meeting.status,
      meetingId: meeting._id,
      rate: meeting.rate,
      report: meeting.report,
    }))

    setAgenda(agendaData)
  }

  const openZoomInNewTab = (e: any, zoomUrl: string) => {
    e.preventDefault()
    window.open(zoomUrl, '_blank')
    return false
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    message.success('Copied to clipboard')
  }

  return (
    <>
      <Row style={{ marginLeft: '30px' }}>
        {/* <MyBreadcrumb items={breadcrumbItems} /> */}
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={7}>
          <Card title='Agenda' style={{ margin: '20px 0px 0px 20px' }}>
            {user.role === USER_ROLE.TEACHER ? (
              <MeetingsTeacher />
            ) : (
              <MeetingsStudent />
            )}
          </Card>

          <Card
            title='Meetings'
            style={{ margin: '20px 0px 0px 20px' }}
            extra={
              <Alert
                message={`You selected date: ${selectedValue?.format(
                  'YYYY-MM-DD',
                )}`}
              />
            }
          >
            <List
              dataSource={agenda}
              renderItem={(item: any, index) => (
                <List.Item>
                  <Space direction='horizontal'>
                    <GetUser userId={item.student} /> <ArrowRightOutlined />{' '}
                    <GetUser userId={item.teacher} />
                  </Space>{' '}
                  <br />
                  <ClockCircleOutlined /> {item.startDate}
                  <br />
                  Status: <Tag>{item.status} </Tag>
                  <br />
                  {item.zoomUrl ? (
                    <div style={{ margin: 10 }}>
                      ZoomURL:{' '}
                      <Input
                        readOnly
                        value={item.zoomUrl}
                        addonAfter={
                          <Tooltip title='Copy to clipboard'>
                            <CopyOutlined
                              onClick={() => copyToClipboard(item.zoomUrl)}
                              style={{ cursor: 'pointer' }}
                            />
                          </Tooltip>
                        }
                      />
                    </div>
                  ) : (
                    <>Zoom link will be here..</>
                  )}
                  <Space>
                    {item.zoomUrl ? (
                      <NavLink to={item.zoomUrl}>
                        <Button
                          type='primary'
                          onClick={(e) => openZoomInNewTab(e, item.zoomUrl)}
                          icon={<PhoneOutlined />}
                        >
                          Start zoom
                        </Button>
                      </NavLink>
                    ) : (
                      <></>
                    )}

                    <Link to={`/meeting/${item.meetingId}`}>
                      <Button>View</Button>
                    </Link>
                    <Button danger>Reshedule</Button>
                  </Space>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={17}>
          <Card title='Calendar' style={{ margin: '20px 20px 20px 0px' }}>
            <Calendar
              value={value}
              onSelect={onSelect}
              onPanelChange={onPanelChange}
              dateCellRender={(date: Dayjs) => {
                const meetingsOnDate = meetings.filter((meeting) =>
                  dayjs(meeting.start_date).isSame(date, 'day'),
                )

                return (
                  <div>
                    {meetingsOnDate.length > 0 && (
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {meetingsOnDate.map((meeting) => (
                          <li key={meeting._id}>
                            {/* <strong>{meeting.course}</strong>: {meeting.student}{' '} */}
                            <InfoCircleOutlined style={{ color: 'blue' }} />{' '}
                            {new Date(meeting.start_date).toLocaleTimeString(
                              [],
                              { hour: '2-digit', minute: '2-digit' },
                            )}
                            <br />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )
              }}
            />
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default CalendarPage
