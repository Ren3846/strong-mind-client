import React, { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { Alert, Calendar, Card, Col, List, Row } from 'antd'

const CalendarPage: React.FC = () => {
  const [value, setValue] = useState(() => dayjs('2017-01-25'))
  const [selectedValue, setSelectedValue] = useState(() => dayjs('2017-01-25'))
  const [agenda, setAgenda] = useState<string[]>([])

  const onSelect = (newValue: Dayjs) => {
    setValue(newValue)
    setSelectedValue(newValue)
    fetchAgendaData(newValue)
  }

  const onPanelChange = (newValue: Dayjs) => {
    setValue(newValue)
  }

  const fetchAgendaData = (selectedDate: Dayjs) => {
    const data = [
      'Meeting 1: Discuss project',
      'Meeting 2: Team stand-up',
      'Meeting 3: Client presentation',
    ]
    setAgenda(data)
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={6}>
        <Card title='Agenda' style={{ margin: '20px 0px 0px 20px' }}>
          <List
            dataSource={agenda}
            renderItem={(item, index) => (
              <List.Item>
                {index + 1}: {item}
              </List.Item>
            )}
          />
        </Card>

        <Card title='Meetings' style={{ margin: '20px 0px 0px 20px' }}>
          <List
            dataSource={agenda}
            renderItem={(item, index) => <List.Item></List.Item>}
          />
        </Card>
      </Col>

      <Col span={18}>
        <Card title='Calendar' style={{ margin: '20px 20px 20px 0px' }}>
          <Alert
            message={`You selected date: ${selectedValue?.format(
              'YYYY-MM-DD',
            )}`}
          />
          <Calendar
            value={value}
            onSelect={onSelect}
            onPanelChange={onPanelChange}
          />
        </Card>
      </Col>
    </Row>
  )
}

export default CalendarPage
