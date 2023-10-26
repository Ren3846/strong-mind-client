import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import axios from 'axios'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Card, Row } from 'antd'

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
    <Row align='middle' justify='center'>
      <Card title='Meetings' style={{ width: '80rem', margin: '20px' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor='start'
          endAccessor='end'
          style={{ height: 500 }}
          onSelectEvent={handleEventClick}
        />
      </Card>
    </Row>
  )
}

export default TutorShedule

////////////////

// import React, { useState } from 'react'
// import FullCalendar from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/daygrid'
// import timeGridPlugin from '@fullcalendar/timegrid'
// import interactionPlugin from '@fullcalendar/interaction'
// import listPlugin from '@fullcalendar/list'
// import { Card, Row } from 'antd'

// const CalendarPage: React.FC = () => {
//   const [currentEvents, setCurrentEvents] = useState([])

//   const handleDateClick = (selected: any) => {
//     const title = prompt('Please enter a new title for your event')
//     const calendarApi = selected.view.calendar
//     calendarApi.unselect()

//     if (title) {
//       calendarApi.addEvent({
//         id: `${selected.dateStr}-${title}`,
//         title,
//         start: selected.startStr,
//         end: selected.endStr,
//         allDay: selected.allDay,
//       })
//     }
//   }

//   const handleEventClick = (selected: any) => {
//     if (
//       window.confirm(
//         `Are you sure you want to delete the event '${selected.event.title}'`,
//       )
//     ) {
//       selected.event.remove()
//     }
//   }

//   return (
//     <Row align='middle' justify='center'>
//       <Card title={`Meetings`} style={{ width: '80rem', margin: '20px' }}>
//         <div style={{ margin: '20px' }}>
//           {/* <Header title='Calendar' subtitle='Full Calendar Interactive Page' /> */}

//           <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//             {/* CALENDAR */}
//             <div style={{ flex: '1 1 100%', marginLeft: '15px' }}>
//               <FullCalendar
//                 height='75vh'
//                 plugins={[
//                   dayGridPlugin,
//                   timeGridPlugin,
//                   interactionPlugin,
//                   listPlugin,
//                 ]}
//                 headerToolbar={{
//                   left: 'prev,next today',
//                   center: 'title',
//                   right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
//                 }}
//                 initialView='dayGridMonth'
//                 editable={true}
//                 selectable={true}
//                 selectMirror={true}
//                 dayMaxEvents={true}
//                 select={handleDateClick}
//                 eventClick={handleEventClick}
//                 eventsSet={(events: any) => setCurrentEvents(events)}
//                 initialEvents={[
//                   {
//                     id: '12315',
//                     title: 'All-day event',
//                     date: '2022-09-14',
//                   },
//                   {
//                     id: '5123',
//                     title: 'Timed event',
//                     date: '2022-09-28',
//                   },
//                 ]}
//               />
//             </div>
//           </div>
//         </div>
//       </Card>
//     </Row>
//   )
// }

// export default CalendarPage
