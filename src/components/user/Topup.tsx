import React, { useState } from 'react'
import { Input, Button, message, Space } from 'antd'
import axios from 'axios'
import { DollarCircleFilled } from '@ant-design/icons'
import useTranslations from '../../lang/useTranslations'

export interface InvoiceData {
  data: string
  signature: string
}

const WalletTopup: React.FC = () => {
  const t = useTranslations('WalletTopup')

  const [amount, setAmount] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const handleTopup = async () => {
    setLoading(true)

    try {
      const { data } = await axios.post('/api/orders/topup/wallet/topup', {
        amount: parseFloat(amount),
      })
      window.location.assign(data.invoiceUrl);
    } catch (error) {
      console.error(error)
      message.error(t('error-topping-up'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Space.Compact>
        <Input
          placeholder={t('enter-amount')}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <Button
          type='primary'
          onClick={handleTopup}
          loading={loading}
          icon={<DollarCircleFilled />}
        >
          {t('pay')}
        </Button>
      </Space.Compact>
    </>
  )
}

export default WalletTopup
