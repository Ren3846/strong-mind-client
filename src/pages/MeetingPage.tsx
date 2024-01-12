import {
  Button,
  Card,
  Col,
  Descriptions,
  Input,
  Rate,
  Row,
  Skeleton,
  Space,
  message,
} from 'antd'
import axios from 'axios'
import React, { FC, useEffect, useState } from 'react'
import Layout from '../components/common/Layout'
import GetUser from '../components/common/GetUser'
import { useParams } from 'react-router-dom'
import { GetCourse } from '../components/common/GetCourse'
import { IMeeting, IUser, USER_ROLE } from '../redux/store/types'
import { useSelector } from 'react-redux'

const MeetingPage: FC<{}> = () => {
  const { meetingId } = useParams()
  const [meeting, setMeeting] = useState<IMeeting | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [rate, setRating] = useState<number | null>(null)
  const [report, setComment] = useState<string>('')

  const user = useSelector((state: IUser) => state.auth.user)

  useEffect(() => {
    axios
      .get(`/api/meetings/${meetingId}`)
      .then(({ data }) => {
        setMeeting(data)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setLoaded(true)
      })
  }, [meetingId])

  const handleReschedule = () => {
    console.log('Reschedule clicked')
  }

  const handleCancel = () => {
    console.log('Cancel clicked')
  }

  const handleRate = () => {
    axios
      .patch(`/api/meetings/comment/${meetingId}`, { rate, report })
      .then(() => {
        message.success('Rating and report added successfully')
      })
      .catch((error) => {
        console.error('Error adding rate and report:', error)
        message.error('Failed to add rate and report')
      })
  }

  return (
    <Layout>
      <Row align='middle' justify='center'>
        <Col span={16}>
          <Card
            title='Details Meeting'
            extra={
              <Space>
                {/* <Button type='primary' onClick={handleReschedule}>
                  Reschedule
                </Button>
                <Button danger onClick={handleCancel}>
                  Cancel
                </Button> */}
              </Space>
            }
          >
            {meeting &&
            meeting.status === 'finished' &&
            !meeting.rate &&
            user.role === USER_ROLE.USER ? (
              <Card title='Leave feedback about meeting'>
                <Rate
                  value={rate !== null ? rate : undefined}
                  onChange={(value) => setRating(value)}
                  style={{ color: 'rgb(167 167 255)' }}
                />
                <Input.TextArea
                  placeholder='Enter your report'
                  value={report}
                  onChange={(e) => setComment(e.target.value)}
                  style={{ margin: 10 }}
                />
                <Button type='primary' onClick={handleRate}>
                  Rate
                </Button>
              </Card>
            ) : (
              <></>
            )}

            {loaded && meeting ? (
              <Descriptions bordered column={1}>
                <Descriptions.Item label='Meeting ID'>
                  {meeting._id}
                </Descriptions.Item>
                <Descriptions.Item label='Teacher'>
                  <GetUser userId={meeting.teacher} />
                </Descriptions.Item>
                <Descriptions.Item label='Student'>
                  <GetUser userId={meeting.student} />
                </Descriptions.Item>
                <Descriptions.Item label='Course'>
                  <GetCourse courseId={meeting.course} />
                </Descriptions.Item>
                <Descriptions.Item label='Start Date'>
                  {meeting.start_date}
                </Descriptions.Item>
                <Descriptions.Item label='Status'>
                  {meeting.status}
                </Descriptions.Item>
                <Descriptions.Item label='Zoom URL'>
                  {meeting.zoomJoinUrl || meeting.zoomStartUrl}
                </Descriptions.Item>{' '}
                {meeting.rate && meeting.report ? (
                  <>
                    <Descriptions.Item label='Rate by student'>
                      {meeting.rate}
                    </Descriptions.Item>
                    <Descriptions.Item label='Report by student'>
                      {meeting.report}
                    </Descriptions.Item>
                  </>
                ) : (
                  <></>
                )}
              </Descriptions>
            ) : (
              <Skeleton active />
            )}
          </Card>
        </Col>
      </Row>
    </Layout>
  )
}

export default MeetingPage
