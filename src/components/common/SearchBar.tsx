import { SearchOutlined } from '@ant-design/icons'
import { Button, Input, Space } from 'antd'
import { useState } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState<string>('')

  const handleSearch = () => {
    onSearch(searchValue)
  }

  return (
    <div>
      <Input
        placeholder='Поиск...'
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        suffix={
          <Space>
            <Button type='primary' onClick={handleSearch}>
              Найти
            </Button>
            <SearchOutlined
              style={{ fontSize: 20, color: '#1890ff' }}
              onClick={handleSearch}
            />
          </Space>
        }
      />
    </div>
  )
}
