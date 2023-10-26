// import React from 'react'
// import type { Dayjs } from 'dayjs'
// import type { BadgeProps, CalendarProps } from 'antd'

// import { Badge, Calendar, Row, Card } from 'antd'
// import Layout from 'antd/es/layout/layout'

// const getListData = (value: Dayjs) => {
//   let listData
//   switch (value.date()) {
//     case 8:
//       listData = [
//         { type: 'warning', content: 'This is warning event.' },
//         { type: 'success', content: 'This is usual event.' },
//       ]
//       break
//     case 10:
//       listData = [
//         { type: 'warning', content: 'This is warning event.' },
//         { type: 'success', content: 'This is usual event.' },
//         { type: 'error', content: 'This is error event.' },
//       ]
//       break
//     case 15:
//       listData = [
//         { type: 'warning', content: 'This is warning event' },
//         { type: 'success', content: 'This is very long usual event......' },
//         { type: 'error', content: 'This is error event 1.' },
//         { type: 'error', content: 'This is error event 2.' },
//         { type: 'error', content: 'This is error event 3.' },
//         { type: 'error', content: 'This is error event 4.' },
//       ]
//       break
//     default:
//   }
//   return listData || []
// }

// const getMonthData = (value: Dayjs) => {
//   if (value.month() === 8) {
//     return 1394
//   }
// }

// const Shedule: React.FC = () => {
//   const monthCellRender = (value: Dayjs) => {
//     const num = getMonthData(value)
//     return num ? (
//       <div className='notes-month'>
//         <section>{num}</section>
//         <span>Backlog number</span>
//       </div>
//     ) : null
//   }

//   const dateCellRender = (value: Dayjs) => {
//     const listData = getListData(value)
//     return (
//       <ul className='events'>
//         {listData.map((item) => (
//           <li key={item.content}>
//             <Badge
//               status={item.type as BadgeProps['status']}
//               text={item.content}
//             />
//           </li>
//         ))}
//       </ul>
//     )
//   }

//   const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
//     if (info.type === 'date') return dateCellRender(current)
//     if (info.type === 'month') return monthCellRender(current)
//     return info.originNode
//   }

//   return (
//     <>
//       <Layout>
//         <Row align='middle' justify='center'>
//           <Calendar style={{ padding: '50px' }} cellRender={cellRender} />
//         </Row>
//       </Layout>
//     </>
//   )
// }

// export default Shedule

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
