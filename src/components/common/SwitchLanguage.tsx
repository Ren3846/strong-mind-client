import React, { useState, useEffect } from 'react'
import { Switch, Space } from 'antd'
import { useTranslation } from 'react-i18next'

const SwitchLang: React.FC = () => {
  const { i18n } = useTranslation()
  const [isChecked, setIsChecked] = useState(i18n.language === 'ua')

  const handleSwitchChange = (checked: boolean) => {
    setIsChecked(checked)
    const newLanguage = checked ? 'ua' : 'en'
    i18n.changeLanguage(newLanguage)
    localStorage.setItem('selectedLanguage', newLanguage)
  }

  useEffect(() => {
    const storedLanguage = localStorage.getItem('selectedLanguage')
    if (storedLanguage) {
      setIsChecked(storedLanguage === 'ua')
      i18n.changeLanguage(storedLanguage)
    }
  }, [i18n])

  return (
    <Space direction='vertical'>
      <Switch
        checkedChildren={'UA'}
        unCheckedChildren={'EN'}
        checked={isChecked}
        onChange={handleSwitchChange}
      />
    </Space>
  )
}

export default SwitchLang
