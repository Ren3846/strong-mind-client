import React, { useState, useEffect } from 'react'
import { Switch, Space } from 'antd'
import { useTranslation } from 'react-i18next'

const SwitchLang: React.FC = () => {
  const { i18n } = useTranslation()
  const [isChecked, setIsChecked] = useState(i18n.language === 'ru')

  const handleSwitchChange = (checked: boolean) => {
    setIsChecked(checked)
    const newLanguage = checked ? 'ru' : 'en'
    i18n.changeLanguage(newLanguage)
    // Сохраняем выбранный язык в локальное хранилище
    localStorage.setItem('selectedLanguage', newLanguage)
  }

  // Загрузка выбранного языка при первоначальной загрузке компонента
  useEffect(() => {
    const storedLanguage = localStorage.getItem('selectedLanguage')
    if (storedLanguage) {
      setIsChecked(storedLanguage === 'ru')
      i18n.changeLanguage(storedLanguage)
    }
  }, [i18n])

  return (
    <Space direction='vertical'>
      <Switch
        checkedChildren={'RU'}
        unCheckedChildren={'EN'}
        checked={isChecked}
        onChange={handleSwitchChange}
      />
    </Space>
  )
}

export default SwitchLang
