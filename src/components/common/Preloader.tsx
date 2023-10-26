// import { Spin } from 'antd'

// const Preloader = () => {
//   return (
//     <div
//       style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100%',
//       }}
//     >
//       <Spin size='large' />
//     </div>
//   )
// }

// export default Preloader
import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const Preloader: React.FC = () => (
  <Spin
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    }}
    indicator={antIcon}
  />
)

export default Preloader
