import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Input, Button, message, Space, List, Divider } from 'antd'
import { DollarCircleFilled } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../redux/actions/user'

const PurchaseMeetings: React.FC<{
  courseId: string
}> = ({ courseId }) => {
  const [quantity, setQuantity] = useState(1)
  const user = useSelector((state: any) => state.auth.user)
  const dispatch = useDispatch();
  
  const purchasedForCourse = user.purchasedMeetings.find(
    (item: any) => item.course === courseId
  );

  const purchasedQuantity = purchasedForCourse ? purchasedForCourse.quantity : 0;

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
      message.success('Purchase successful')
      // message.info(`Server Response: ${JSON.stringify(response.data)}`)
      setQuantity(1)
    } catch (error) {
      console.error(error)
      message.error('Ooops.. Probably you have no money')
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
          placeholder='Quantity'
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
        <Button
          type='primary'
          onClick={handlePurchase}
          icon={<DollarCircleFilled />}
        >
          Buy meetings
        </Button>
      </Space.Compact>
      <Divider />
      <div>
        {
          `${purchasedQuantity} meetings purchased`
        }
      </div>
    </Space>
  )
}

export default PurchaseMeetings
