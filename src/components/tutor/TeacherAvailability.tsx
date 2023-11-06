import React, { useState } from 'react'
import { Checkbox, TimePicker, Button, Space, Divider } from 'antd'
import moment, { Moment } from 'moment'

interface TeacherAvailabilityProps {}

const TeacherAvailability: React.FC<TeacherAvailabilityProps> = (props) => {
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [selectedHours, setSelectedHours] = useState<Moment[] | null>(null)
  const [timeFormat] = useState('HH:mm')

  const handleDayChange = (checkedValues: string[]) => {
    setSelectedDays(checkedValues)
  }

  const handleTimeChange = (
    time: Moment[] | null,
    timeString: [string, string],
  ) => {
    setSelectedHours(time)
  }

  const handleSubmit = () => {
    console.log('Selected Days:', selectedDays)
    console.log('Selected Hours:', selectedHours)
  }

  return (
    <div>
      <Space direction='vertical'>
        <div>
          <Divider orientation='left'>Available Days:</Divider>

          <Checkbox.Group>
            <Checkbox value='Monday'>Monday</Checkbox>
            <Checkbox value='Tuesday'>Tuesday</Checkbox>
            <Checkbox value='Wednesday'>Wednesday</Checkbox>
            <Checkbox value='Thursday'>Thursday</Checkbox>
            <Checkbox value='Friday'>Friday</Checkbox>
            <Checkbox value='Saturday'>Saturday</Checkbox>
            <Checkbox value='Sunday'>Sunday</Checkbox>
          </Checkbox.Group>
        </div>
        <div>
          <Divider orientation='left'>Available Hours:</Divider>

          <TimePicker.RangePicker
            format={timeFormat}
            // onChange={handleTimeChange}
            placeholder={['Start Time', 'End Time']}
            minuteStep={30}

            // disabledTime={['16:00']}
          />
        </div>
        <Button type='primary' onClick={handleSubmit}>
          Save Availability
        </Button>
      </Space>
    </div>
  )
}

export default TeacherAvailability
