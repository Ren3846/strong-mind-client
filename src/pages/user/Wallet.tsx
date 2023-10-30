import { Card, Row, Statistic, message, Table } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import WalletTopup from '../../components/user/Topup'

const Wallet = () => {
  const user = useSelector((state: any) => state.auth.user)

  const [loading, setLoading] = useState(true)
  const [paymentHistory, setPaymentHistory] = useState([])

  useEffect(() => {
    axios
      .get('/api/orders/topup')
      .then((response) => {
        console.log(response.data)
        setPaymentHistory(response.data)
      })
      .catch((error) => {
        console.error(error)
        message.error('Error while fetching history')
      })
      .finally(() => setLoading(false))
  }, [])

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
  ]

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
      <Card title='History' style={{ width: '60rem', marginTop: '20px' }}>
        <Table
          loading={loading}
          columns={columns}
          dataSource={paymentHistory}
        />
      </Card>
    </Row>
  )
}

export default Wallet
