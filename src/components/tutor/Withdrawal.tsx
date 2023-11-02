import React, { useState } from 'react'
import { Input, Button, message } from 'antd'
import axios from 'axios'

const WalletWithdrawal: React.FC = () => {
  const [amount, setAmount] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const handleTopup = async () => {
    setLoading(true)

    try {
      const response = await axios.post('/api/users/wallet/topup', {
        amount: parseFloat(amount),
      })

      message.success('Balance topped up successfully', 8)
      console.log('Response:', response.data)
    } catch (error) {
      console.error(error)
      message.error('Error while topping up the balance')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Input
        placeholder='Enter the amount'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <Button type='primary' onClick={handleTopup} loading={loading}>
        Withdrawal
      </Button>
    </>
  )
}

export default WalletWithdrawal