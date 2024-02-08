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
  const [invoice, setInvoice] = useState<null | InvoiceData>(null)

  const handleTopup = async () => {
    setLoading(true)

    try {
      const response = await axios.post('/api/orders/topup', {
        amount: parseFloat(amount),
      })
      setInvoice(response.data)
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
      {invoice ? (
        <form
          method='POST'
          action='https://www.liqpay.ua/api/3/checkout'
          acceptCharset='utf-8'
        >
          <input type='hidden' name='data' value={invoice?.data} />
          <input type='hidden' name='signature' value={invoice?.signature} />
          <input
            type='image'
            src='//static.liqpay.ua/buttons/p1ru.radius.png'
          />
        </form>
      ) : null}
    </>
  )
}

export default WalletTopup
