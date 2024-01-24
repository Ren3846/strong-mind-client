import React, { useState } from 'react'
import { Select, Space, Collapse } from 'antd'
import useTranslations from '../../lang/useTranslations'

const { Option } = Select
const { Panel } = Collapse

const CourseFilter: React.FC<{
  onFilterChange: (filters: Record<string, string>) => void
}> = ({ onFilterChange }) => {
  const t = useTranslations('CourseFilter')

  const [filters, setFilters] = useState<Record<string, string>>({
    price: 'all',
    category: 'all',
    difficulty: 'all',
  })

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters({
      ...filters,
      [filterType]: value,
    })

    onFilterChange(filters)
  }

  return (
    <div className='course-filter' style={{ padding: '50px 10px 10px 10px' }}>
      <Space direction='vertical'>
        <Collapse ghost>
          <Panel header='Price Filter' key='1'>
            <Select
              placeholder='Price'
              value={filters.price}
              onChange={(value) => handleFilterChange('price', value)}
            >
              <Option value='all'>{t('all')}</Option>
              <Option value='free'>{t('free')}</Option>
              <Option value='paid'>{t('paid')}</Option>
            </Select>
          </Panel>
        </Collapse>

        <Collapse ghost>
          <Panel header='Category Filter' key='2'>
            <Select
              placeholder='Category'
              value={filters.category}
              onChange={(value) => handleFilterChange('category', value)}
            >
              <Option value='all'>{t('all')}</Option>
              <Option value='english'>{t('english')}</Option>
              <Option value='russian'>{t('russian')}</Option>
            </Select>
          </Panel>
        </Collapse>
        <Collapse ghost>
          <Panel header='Difficulty Filter' key='3'>
            <Select
              placeholder={t('difficulty')}
              value={filters.difficulty}
              onChange={(value) => handleFilterChange('difficulty', value)}
            >
              <Option value='all'>All</Option>
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
