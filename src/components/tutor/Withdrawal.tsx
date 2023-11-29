import React, { useState } from 'react'
import { Input, Button, message, Space } from 'antd'
import axios from 'axios'
import { DollarCircleFilled } from '@ant-design/icons'

const WalletWithdrawal: React.FC = () => {
  const [amount, setAmount] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const handleWithdrawal = async () => {
    setLoading(true)

    try {
      const response = await axios.post('/api/users/withdrawal', {
        amount: parseFloat(amount),
      })

      message.success(`Withdrawal ${amount}$ successfully`, 8)
      console.log('Response:', response.data)
    } catch (error) {
      console.error(error)
      message.error('Error while withdrawal balance')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Space.Compact>
        <Input
          placeholder='Enter the amount'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <Button
          type='primary'
          onClick={handleWithdrawal}
          loading={loading}
          icon={<DollarCircleFilled />}
        >
          Withdrawal
        </Button>
      </Space.Compact>
    </>
  )
}

export default WalletWithdrawal
