import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import axios from 'axios'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

const TutorShedule: React.FC = () => {
  const [schedule, setSchedule] = useState([])

  useEffect(() => {
    axios
      .get('/api/users/liveLessons/schedule')
      .then((response) => {
        setSchedule(response.data)
      })
      .catch((error) => {
        console.error('Error while fetching schedule:', error)
      })
  }, [])

  const events = schedule.map((item: any) => ({
    title: item.title,
    start: new Date(item.date),
    end: new Date(item.date),
    allDay: true,
    lessonId: item.lessonId,
  }))

  const handleEventClick = (event: any) => {
    console.log('Clicked event:', event)
  }

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 500 }}
        onSelectEvent={handleEventClick}
      />
    </div>
  )
}

export default TutorShedule
