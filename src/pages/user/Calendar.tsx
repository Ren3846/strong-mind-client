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
import { NavLink } from 'react-router-dom'
import {
  ArrowRightOutlined,
  ClockCircleOutlined,
  CopyOutlined,
  PhoneOutlined,
} from '@ant-design/icons'
import GetUser from '../../components/common/GetUser'
import MeetingsStudent from '../../components/user/MeetingsStudent'
import Layout from '../../components/common/Layout'
import useTranslations from '../../lang/useTranslations'

dayjs.extend(utc)

const CalendarPage: React.FC = () => {
  const t = useTranslations('CalendarPage')
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
      // zoomUrl: meeting.zoomUrl,
      zoomJoinUrl: meeting.zoomJoinUrl,
      zoomStartUrl: meeting.zoomStartUrl,
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
    message.success(t('copy_to_clipboard'))
  }

  return (
    <Layout>
      <Row style={{ marginLeft: '30px' }}>
        {/* <MyBreadcrumb items={breadcrumbItems} /> */}
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={7}>
          <Card title={t('Agenda')} style={{ margin: '20px 0px 0px 20px' }}>
            {user.role === USER_ROLE.TEACHER ? (
              <MeetingsTeacher />
            ) : (
              <MeetingsStudent />
            )}
          </Card>

          <Card
            title={t('Meetings')}
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
              renderItem={(item: any) => (
                <List.Item>
                  <Space direction='horizontal'>
                    <GetUser userId={item.student} /> <ArrowRightOutlined />{' '}
                    <GetUser userId={item.teacher} />
                  </Space>{' '}
                  <br />
                  <ClockCircleOutlined /> {item.start_date}
                  <br />
                  {t('Status')} <Tag>{item.status} </Tag>
                  {item.zoomJoinUrl && item.zoomStartUrl ? (
                    <div style={{ marginBottom: '10px', marginTop: '10px' }}>
                      <Space.Compact>
                        <NavLink
                          to={
                            user.role === USER_ROLE.TEACHER
                              ? item.zoomStartUrl
                              : item.zoomJoinUrl
                          }
                        >
                          <Button
                            type='primary'
                            onClick={(e) =>
                              openZoomInNewTab(
                                e,
                                user.role === USER_ROLE.TEACHER
                                  ? item.zoomStartUrl
                                  : item.zoomJoinUrl,
                              )
                            }
                            icon={<PhoneOutlined />}
                          >
                            {user.role === USER_ROLE.TEACHER
                              ? t('start_zoom')
                              : t('join_zoom')}
                          </Button>
                        </NavLink>
                        <Input
                          readOnly
                          value={
                            user.role === USER_ROLE.TEACHER
                              ? item.zoomStartUrl
                              : item.zoomJoinUrl
                          }
                          addonAfter={
                            <Tooltip title={t('copy_to_clipboard')}>
                              <CopyOutlined
                                onClick={() =>
                                  copyToClipboard(
                                    user.role === USER_ROLE.TEACHER
                                      ? item.zoomStartUrl
                                      : item.zoomJoinUrl,
                                  )
                                }
                                style={{ cursor: 'pointer' }}
                              />
                            </Tooltip>
                          }
                        />
                      </Space.Compact>
                    </div>
                  ) : (
                    <Button type='text'>
                      {t('link_will_appear')}
                    </Button>
                  )}
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={17}>
          <Card title={t('calendar')} style={{ margin: '20px 20px 20px 0px' }}>
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
