import React from 'react'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Switch, Space } from 'antd'

const SwitchLang: React.FC = () => (
  <Space direction='vertical'>
    <Switch checkedChildren='RU' unCheckedChildren='EN' defaultChecked />
  </Space>
)

export default SwitchLang
