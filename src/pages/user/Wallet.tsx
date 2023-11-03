import { Card, Row, Statistic, message, Table, Tag, Skeleton } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import WalletTopup from '../../components/user/Topup'
import { StoreType } from '../../redux/store'
import { USER_ROLE, User } from '../../redux/store/types'
import WalletWithdrawal from '../../components/tutor/Withdrawal'
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons'
import Preloader from '../../components/common/Preloader'

const Wallet = () => {
  const user = useSelector<StoreType, User>((state: any) => state.auth.user)

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
      render: (status: string) => {
        switch (status) {
          case 'pending':
            return (
              <Tag icon={<SyncOutlined spin />} color='processing'>
                {status}
              </Tag>
            )
          case 'accepted':
            return (
              <Tag icon={<CheckCircleOutlined />} color='success'>
                {status}
              </Tag>
            )
          case 'rejected':
            return (
              <Tag icon={<CloseCircleOutlined />} color='error'>
                {status}
              </Tag>
            )
          default:
            return <Tag color='default'>{status}</Tag>
        }
      },
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => {
        const formattedDate = new Date(date).toLocaleString()
        return <span>{formattedDate}</span>
      },
    },
    // {
    //   title: 'Updated At',
    //   dataIndex: 'updatedAt',
    //   key: 'updatedAt',
    // },
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

      <Card style={{ width: '60rem', marginTop: '20px' }}>
        {user.role === USER_ROLE.TEACHER ? (
          <WalletWithdrawal />
        ) : (
          <WalletTopup />
        )}
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
