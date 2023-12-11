import React, { useState, useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'

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
import { useSelector } from 'react-redux'
import { IMeeting, IUser, USER_ROLE } from '../../redux/store/types'
import { Link, NavLink } from 'react-router-dom'
import {
  ArrowRightOutlined,
  ClockCircleOutlined,
  CopyOutlined,
  PhoneOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import GetUser from '../../components/common/GetUser'
import MeetingsStudent from '../../components/user/MeetingsStudent'
import Layout from '../../components/common/Layout'

dayjs.extend(utc)

const CalendarPage: React.FC = () => {
  const [value, setValue] = useState(() => dayjs())
  const [selectedValue, setSelectedValue] = useState(() => dayjs())
  const [meetings, setMeetings] = useState<IMeeting[]>([])
  const [agenda, setAgenda] = useState<IMeeting[]>([])

  const user = useSelector((state: IUser) => state.auth.user)

  useEffect(() => {
    fetchMeetingsData()
  }, [user])

  const fetchMeetingsData = async () => {
    try {
      const response = await fetch('/api/meetings/personal')
      const data = await response.json()
      setMeetings(data)
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error)
    }
  }

  const onSelect = (newValue: Dayjs) => {
    setValue(newValue)
    setSelectedValue(newValue)
    updateAgenda(newValue)
  }

  const onPanelChange = (newValue: Dayjs) => {
    setValue(newValue)
    updateAgenda(newValue)
  }

  const updateAgenda = (selectedDate: Dayjs) => {
    const meetingsOnDate = meetings.filter((meeting) =>
      dayjs(meeting.start_date).isSame(selectedDate, 'day'),
    )

    const agendaData: IMeeting[] = meetingsOnDate.map((meeting) => ({
      course: meeting.course,
      teacher: meeting.teacher,
      student: meeting.student,
      start_date: dayjs.utc(meeting.start_date).format('YYYY-MM-DD HH:mm'),
      zoomUrl: meeting.zoomUrl,
      status: meeting.status,
      meetingId: meeting.meetingId,
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
    <Layout>
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
                  <ClockCircleOutlined /> {item.start_date}
                  <br />
                  Status: <Tag>{item.status} </Tag>
                  <br />
                  {item.zoomUrl ? (
                    <div style={{ marginBottom: '10px' }}>
                      <Space.Compact>
                        <NavLink to={item.zoomUrl}>
                          <Button
                            type='primary'
                            onClick={(e) => openZoomInNewTab(e, item.zoomUrl)}
                            icon={<PhoneOutlined />}
                          >
                            Start zoom
                          </Button>
                        </NavLink>
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
                      </Space.Compact>
                    </div>
                  ) : (
                    <Button type='text'>Zoom link will be here soon ...</Button>
                  )}
                  <Space>
                    {/* <Link to={`/meeting/${item.meetingId}`}>
                      <Button icon={<SearchOutlined />}>View</Button>
                    </Link> */}
                    {/* <Button danger>Reshedule</Button> */}
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
                            <Tag color='purple'>
                              <ClockCircleOutlined />{' '}
                              {dayjs.utc(meeting.start_date).format('HH:mm')}
                              {/* {new Date(meeting.start_date).toLocaleTimeString(
                                [],
                                { hour: '2-digit', minute: '2-digit' },
                              )} */}
                            </Tag>
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
    </Layout>
  )
}

export default CalendarPage
