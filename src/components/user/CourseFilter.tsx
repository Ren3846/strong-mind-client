import React from 'react'
import { Select, Space, Collapse } from 'antd'

const { Option } = Select
const { Panel } = Collapse

const CourseFilter: React.FC<{
  onFilterChange: (filter: string) => void
}> = ({ onFilterChange }) => {
  const handleChange = (value: string) => {
    onFilterChange(value)
  }

  return (
    <div className='course-filter' style={{ padding: '50px 10px 10px 10px' }}>
      <Space direction='vertical'>
        <Collapse ghost>
          <Panel header='Price Filter' key='1'>
            <Select placeholder='Price'>
              <Option value='all'>All</Option>
              <Option value='free'>Feee</Option>
              <Option value='paid'>Paid</Option>
            </Select>
          </Panel>
        </Collapse>
        <Collapse ghost>
          <Panel header='Category Filter' key='2'>
            <Select placeholder='Category'>
              <Option value='english'>English</Option>
              <Option value='russian'>russian</Option>
            </Select>
          </Panel>
        </Collapse>
        <Collapse ghost>
          <Panel header='Difficulty Filter' key='3'>
            <Select placeholder='Difficulty'>
              <Option value='A1'>A1</Option>
              <Option value='A2'>A2</Option>
              <Option value='B1'>B1</Option>
              <Option value='B2'>B2</Option>
              <Option value='C1'>C1</Option>
              <Option value='C2'>C2</Option>
            </Select>
          </Panel>
        </Collapse>
      </Space>
    </div>
  )
}

export default CourseFilter
