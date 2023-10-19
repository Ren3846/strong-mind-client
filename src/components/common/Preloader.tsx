import { Spin } from 'antd'

const Preloader = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Spin size='large' />
    </div>
  )
}

export default Preloader
