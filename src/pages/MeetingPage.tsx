import {
  Button,
  Card,
  Col,
  Descriptions,
  Row,
  Skeleton,
  Space,
  Typography,
} from 'antd'
import axios from 'axios'
import React, { FC, useEffect, useState } from 'react'
import Layout from '../components/common/Layout'
import GetUser from '../components/common/GetUser'
import { useParams } from 'react-router-dom'
import { GetCourse } from '../components/common/GetCourse'

const MeetingPage: FC<{}> = () => {
  const { meetingId } = useParams()
  const [meeting, setMeeting] = useState<any>({})
  const [loaded, setLoaded] = useState(false)

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
    // Add logic for rescheduling
    console.log('Reschedule clicked')
  }

  const handleCancel = () => {
    // Add logic for canceling
    console.log('Cancel clicked')
  }

  return (
    <Layout>
      <Row align='middle' justify='center'>
        <Col span={16}>
          <Card
            title='Details Meeting'
            extra={
              <Space>
                <Button type='primary' onClick={handleReschedule}>
                  Reschedule
                </Button>
                <Button danger onClick={handleCancel}>
                  Cancel
                </Button>
              </Space>
            }
          >
            {loaded ? (
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
                  {meeting.zoomUrl}
                </Descriptions.Item>
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
