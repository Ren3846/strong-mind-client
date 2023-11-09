import React, { useState } from 'react'
import axios from 'axios'
import { Input, Button, message, Space, List, Tag } from 'antd'
import { DollarCircleFilled } from '@ant-design/icons'
import { useSelector } from 'react-redux'

const PurchaseCourse: React.FC<{
  courseIdd: string
}> = ({ courseIdd }) => {
  const [courseId, setCourseId] = useState('')
  const [quantity, setQuantity] = useState(1)
  const user = useSelector((state: any) => state.auth.user)

  const handlePurchase = async () => {
    try {
      const requestData = {
        courseId: courseIdd,
        quantity: quantity,
      }

      await axios.post('/api/users/purchase/', requestData)
      message.success('Purchase successful')
      setCourseId('')
      setQuantity(1)
    } catch (error) {
      console.error(error)
      message.error('Error while making the purchase')
    }
  }

  return (
    <div>
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
        <List
          dataSource={user.purchasedMeetings}
          renderItem={(item: any) => (
            <Button>
              Quantity: {item.quantity}
              {/* Course: {item.course}, , ID: {item._id} */}
            </Button>
          )}
        />
      </Space.Compact>
    </div>
  )
}

export default PurchaseCourse
