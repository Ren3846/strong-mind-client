import React, { useState } from 'react'
import type { RadioChangeEvent } from 'antd'
import { Button, Radio, Space, Timeline } from 'antd'
import { SwapOutlined } from '@ant-design/icons'

const TimeLine: React.FC = () => {
  const startTime = 8
  const endTime = 20

  const timelineItems = []

  for (let i = startTime; i <= endTime; i++) {
    timelineItems.push({
      label: `${i < 10 ? `0${i}` : i}:00`,
      children: (
        <Space>
          Meeting
          <Button icon={<SwapOutlined />} size='small'></Button>
        </Space>
      ),
    })
  }

  return (
    <div>
      <Radio.Group
        // onChange={onChange}
        value='left'
        style={{ marginBottom: 20 }}
      ></Radio.Group>
      <Timeline mode={'left'} items={timelineItems} />{' '}
    </div>
  )
}

export default TimeLine

// import React from 'react'
// import {
//   SmileOutlined,
//   ClockCircleOutlined,
//   SwapOutlined,
// } from '@ant-design/icons'
// import { Timeline, Button } from 'antd'

// const startTime = 8
// const endTime = 20

// const timelineItems = []

// for (let i = startTime; i <= endTime; i++) {
//   timelineItems.push(
//     <Timeline.Item
//       key={i}
//       dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}
//       color='green'
//     >
//       {i < 10 ? `0${i}:00` : `${i}:00`} Meeting{' '}
//       <Button icon={<SwapOutlined />} size='small'>
//         Reshedule
//       </Button>
//     </Timeline.Item>,
//   )
// }

// const TimeLine: React.FC = () => (
//   <Timeline>
//     <Timeline.Item
//       dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}
//       color='green'
//     >
//       Meeting{' '}
//       <Button icon={<SwapOutlined />} size='small'>
//         Reshedule
//       </Button>
//     </Timeline.Item>
//     <Timeline.Item
//       dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}
//       color='green'
//     >
//       Meeting{' '}
//       <Button icon={<SwapOutlined />} size='small'>
//         Reshedule
//       </Button>
//     </Timeline.Item>
//     <Timeline.Item color='red'>
//       <p>Solve initial network problems 1</p>
//     </Timeline.Item>
//     <Timeline.Item>
//       <p>Technical testing 1</p>
//     </Timeline.Item>
//     <Timeline.Item color='gray'>
//       <p>Technical testing 1</p>
//     </Timeline.Item>
//     <Timeline.Item color='gray'>
//       <p>Technical testing 1</p>
//     </Timeline.Item>
//     <Timeline.Item
//       dot={<SmileOutlined style={{ fontSize: '16px' }} />}
//       color='#00CCFF'
//     >
//       Custom color testing
//     </Timeline.Item>
//   </Timeline>
// )

// export default TimeLine
