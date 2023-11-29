import { Card, Row, Skeleton } from 'antd'
import axios from 'axios'
import React, { FC, useEffect, useState } from 'react'
import Layout from '../components/common/Layout'
import { useParams } from 'react-router-dom'

const MeetingPage: FC<{}> = () => {
  const id = useParams()
  const [meeting, setMeeting] = useState()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    axios
      .get(`/api/meetings/${id}`)
      .then((res) => {
        setMeeting(res.data)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setLoaded(true)
      })
  }, [id])

  return (
    <div>
      <Layout>
        <Row align='middle' justify='center'>
          <Card title='Details Meeting' style={{ width: '80rem' }}>
            {loaded ? meeting : <Skeleton active />}
          </Card>
        </Row>
      </Layout>
    </div>
  )
}

export default MeetingPage
