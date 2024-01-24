import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Input, Button, message, Space, List, Divider } from 'antd'
import { DollarCircleFilled } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../redux/actions/user'
import { IUser } from '../../redux/store/types'
import useTranslations from '../../lang/useTranslations'

const PurchaseMeetings: React.FC<{
  courseId: string
}> = ({ courseId }) => {
  const t = useTranslations('PurchaseMeetings')

  const [quantity, setQuantity] = useState(1)
  const user = useSelector((state: IUser) => state.auth.user)
  const dispatch = useDispatch()

  const purchasedForCourse = user.purchasedMeetings.find(
    (item: any) => item.course === courseId,
  )

  const purchasedQuantity = purchasedForCourse ? purchasedForCourse.quantity : 0

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`/api/users/${user._id}`)
      const updatedUserData = response.data

      dispatch(updateUser(user._id, updatedUserData))
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  const handlePurchase = async () => {
    try {
      const requestData = {
        courseId: courseId,
        quantity: quantity,
      }

      const response = await axios.post('/api/users/purchase/', requestData)

      fetchUserData()
      console.log(response.data)
      message.success(t('purchase-successful'))
      setQuantity(1)
    } catch (error) {
      console.error(error)
      message.error(t('oops-no-money'))
    }
  }
  useEffect(() => {
    fetchUserData()
  }, [])

  return (
    <Space>
      <Space.Compact>
        <Input
          type='number'
          placeholder={t('quantity')}
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
        <Button
          type='primary'
          onClick={handlePurchase}
          icon={<DollarCircleFilled />}
        >
          {t('buy-meetings')}
        </Button>
      </Space.Compact>
      <Divider />
      <div>{purchasedQuantity} {t('meetings-purchased')} </div>
    </Space>
  )
}

export default PurchaseMeetings
