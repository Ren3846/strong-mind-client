import { Card, Layout, Row, Statistic } from 'antd'
import React from 'react'
import WalletTopup from '../../components/user/Topup'
import { useSelector } from 'react-redux'

const Wallet = () => {
  const user = useSelector((state: any) => state.auth.user)

  return (
    <Row align='middle' justify='center'>
      <Card title='Balance' style={{ width: '60rem', marginTop: '20px' }}>
        <Statistic
          title='Account Balance ($)'
          value={user.balance}
          precision={2}
        />
      </Card>
      <Card title='TopUp' style={{ width: '60rem', marginTop: '20px' }}>
        <WalletTopup />
      </Card>
      <Card
        title='History'
        style={{ width: '60rem', marginTop: '20px' }}
      ></Card>
    </Row>
  )
}

export default Wallet
