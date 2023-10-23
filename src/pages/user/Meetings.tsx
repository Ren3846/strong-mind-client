// import React from 'react'
// import type { Dayjs } from 'dayjs'
// import type { BadgeProps, CalendarProps } from 'antd'

// import { Badge, Calendar, Card, Row } from 'antd'
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

// const Meetings: React.FC = () => {
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
//     <Row align='middle' justify='center'>
//       <Card title='Meetings' style={{ width: '80rem', margin: '20px' }}>
//         <Calendar style={{ padding: '50px' }} cellRender={cellRender} />
//       </Card>
//     </Row>
//   )
// }

// export default Meetings

import React from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Card, Row } from 'antd'

let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr,
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00',
  },
]

export function createEventId() {
  return String(eventGuid++)
}

export default class DemoApp extends React.Component {
  state = {
    weekendsVisible: true,
    currentEvents: [],
  }

  render() {
    return (
      <Row align='middle' justify='center'>
        <Card title='Meetings' style={{ width: '80rem', margin: '20px' }}>
          <div className='demo-app'>
            {this.renderSidebar()}
            <div className='demo-app-main'>
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                initialView='dayGridMonth'
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={this.state.weekendsVisible}
                initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                select={this.handleDateSelect}
                eventContent={renderEventContent} // custom render function
                // eventClick={this.handleEventClick}
                // eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
                /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
              />
            </div>
          </div>
        </Card>
      </Row>
    )
  }

  renderSidebar() {
    return (
      <div className='demo-app-sidebar'>
        {/* <div className='demo-app-sidebar-section'>
          <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div> */}
        {/* <div className='demo-app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              checked={this.state.weekendsVisible}
              onChange={this.handleWeekendsToggle}
            ></input>
            toggle weekends
          </label>
        </div> */}
        <div className='demo-app-sidebar-section'>
          <h2>All Events ({this.state.currentEvents.length})</h2>
          <ul>{this.state.currentEvents.map(renderSidebarEvent)}</ul>
        </div>
      </div>
    )
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible,
    })
  }

  handleDateSelect = (selectInfo: any) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      })
    }
  }

  // handleEventClick = (clickInfo) => {
  //   if (
  //     confirm(
  //       `Are you sure you want to delete the event '${clickInfo.event.title}'`,
  //     )
  //   ) {
  //     clickInfo.event.remove()
  //   }
  // }

  // handleEvents = (events: any) => {
  //   this.setState({
  //     currentEvents: events,
  //   })
  // }
}

function renderEventContent(eventInfo: any) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

function renderSidebarEvent(event: any) {
  return (
    <li key={event.id}>
      <b>
        {formatDate(event.start, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </b>
      <i>{event.title}</i>
    </li>
  )
}
