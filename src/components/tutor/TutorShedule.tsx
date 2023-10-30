import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import axios from 'axios'
import 'react-big-calendar/lib/css/react-big-calendar.css'
// import { Card, Row } from 'antd'
// import { error } from 'console'

const localizer = momentLocalizer(moment)

interface ScheduleItem {
  _id: string
  title: string
  date: Date
  currentUrl: string | null
}

interface Meeting {
  userId: string
  status: string
  _id: string
  date: Date
}

const TutorShedule: React.FC = () => {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([])
  const [meetings, setMeetings] = useState<Meeting[]>([])

  useEffect(() => {
    axios
      .get('/api/users/liveLessons/schedule')
      .then((response) => {
        console.log('Shedule', response.data)
        setSchedule(response.data)
      })
      .catch((error) => {
        console.error('Error while fetching schedule:', error)
      })
  }, [])

  useEffect(() => {
    axios
      .get('/api/users/meetings/all')
      .then((response) => {
        console.log('Meetings', response.data)
        setMeetings(response.data)
      })
      .catch((error) => {
        console.log('Error while fetching meetings:', error)
      })
  }, [])

  const acceptedMeetings = meetings.filter(
    (meeting) => meeting.status === 'accepted',
  )

  const events = [
    ...schedule.map((scheduleItem) => ({
      title: scheduleItem.title,
      start: new Date(scheduleItem.date),
      end: new Date(scheduleItem.date),
      allDay: false,
      lessonId: scheduleItem._id,
    })),
    ...acceptedMeetings.map((meeting) => ({
      title: 'Meeting',
      start: new Date(meeting.date),
      end: new Date(meeting.date),
      allDay: false,
      meetingId: meeting._id,
      status: meeting.status,
    })),
  ]

  const handleEventClick = (event: any) => {
    console.log('Clicked event:', event)
    if (event.lessonId) {
      //  lesson click
    } else if (event.meetingId) {
      //  meeting click
    }
  }

  return (
    <>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 500 }}
        onSelectEvent={handleEventClick}
      />
    </>
  )
}

export default TutorShedule
