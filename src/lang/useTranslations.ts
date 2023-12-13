import { useTranslation } from 'react-i18next'

const useTranslations = (namespace: string) => {
  const { t } = useTranslation()

  return (key: string) => t(`${namespace}.${key}`)
}

export default useTranslations
