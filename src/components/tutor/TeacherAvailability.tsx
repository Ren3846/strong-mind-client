import React, { useState } from 'react'
import { Checkbox, TimePicker, Button, Space } from 'antd'
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
    // You can process and save the selected days and hours here
    console.log('Selected Days:', selectedDays)
    console.log('Selected Hours:', selectedHours)
  }

  return (
    <div>
      <Space direction='vertical'>
        <div>
          <h4>Available Days:</h4>
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
          <h4>Available Hours:</h4>
          <TimePicker.RangePicker
            format={timeFormat}
            // onChange={handleTimeChange}
            placeholder={['Start Time', 'End Time']}
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
