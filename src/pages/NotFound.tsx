import { Result, Button } from 'antd'
import { Link } from 'react-router-dom'
import useTranslations from '../lang/useTranslations'

const NotFound = () => {
  const t = useTranslations('NotFound')
  return (
    <Result
      status='404'
      title='404'
      subTitle={t('Sorry')}
      extra={
        <Link to='/'>
          <Button type='primary'>{t('back')}</Button>
        </Link>
      }
    />
  )
}

export default NotFound
