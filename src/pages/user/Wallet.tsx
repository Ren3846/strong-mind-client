import {
  Card,
  Row,
  Statistic,
  message,
  Table,
  Tag,
  Space,
} from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import WalletTopup from '../../components/user/Topup'
import { StoreType } from '../../redux/store'
import { USER_ROLE, IUser } from '../../redux/store/types'
import WalletWithdrawal from '../../components/tutor/Withdrawal'
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons'
import useTranslations from '../../lang/useTranslations'

const Wallet = () => {
  const user = useSelector<StoreType, IUser>((state: any) => state.auth.user)
  const t = useTranslations('Wallet');

  const [loading, setLoading] = useState(true)
  const [paymentHistory, setPaymentHistory] = useState([])

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        let response
        if (user.role === USER_ROLE.TEACHER) {
          response = await axios.get(
            '/api/orders/withdrawal/teacher-withdrawals',
          )
        } else {
          response = await axios.get('/api/orders/topup/user-topups')
        }
        setPaymentHistory(response.data)
      } catch (error) {
        console.error('Error while fetching history:', error)
        message.error(t('Error while fetching history'));
      } finally {
        setLoading(false)
      }
    }

    fetchPaymentHistory()
  }, [user.role])

  const columns = [
    {
      title: t('id'),
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: t('amount'),
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        switch (status) {
          case 'pending':
            return (
              <Tag icon={<SyncOutlined spin />} color='processing'>
                {t(status)}
              </Tag>
            )
          case 'accepted':
            return (
              <Tag icon={<CheckCircleOutlined />} color='success'>
                {t(status)}
              </Tag>
            )
          case 'rejected':
            return (
              <Tag icon={<CloseCircleOutlined />} color='error'>
                {t(status)}
              </Tag>
            )
          default:
            return <Tag color='default'>{t('default_status')}</Tag>
        }
      },
    },
    {
      title: t('date'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => {
        const formattedDate = new Date(date).toLocaleString()
        return <span>{formattedDate}</span>
      },
    },
  ]

  return (
    <Space>
      <Row align='middle' justify='center'>
        <Card title={t('balance_title')} style={{ width: '60rem', margin: '20px' }}>
          <Statistic
            title={t('account_balance')}
            value={user.balance}
            precision={2}
          />
        </Card>

        <Card style={{ width: '60rem', margin: '20px' }}>
          {user.role === USER_ROLE.TEACHER ? (
            <WalletWithdrawal />
          ) : (
            <WalletTopup />
          )}
        </Card>

        <Card title={t('history_title')} style={{ width: '60rem', margin: '20px' }}>
          <Table
            loading={loading}
            columns={columns}
            dataSource={paymentHistory}
          />
        </Card>
      </Row>
    </Space>
  )
}

export default Wallet