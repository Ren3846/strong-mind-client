import React, { useState, useEffect } from 'react';
import { Select, Space } from 'antd';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const SwitchLang: React.FC = () => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    i18n.changeLanguage(value);
    localStorage.setItem('selectedLanguage', value);
  };

  useEffect(() => {
    const storedLanguage = localStorage.getItem('selectedLanguage');
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
      i18n.changeLanguage(storedLanguage);
    }
  }, [i18n]);

  return (
    <Space direction='vertical'>
      <Select value={selectedLanguage} onChange={handleLanguageChange}>
        <Option value='ua'>UA</Option>
        <Option value='en'>EN</Option>
        <Option value='ru'>RU</Option>
      </Select>
    </Space>
  );
};

export default SwitchLang;
