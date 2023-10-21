import { Result, Button } from 'antd'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <Result
      status='404'
      title='404'
      subTitle='Sorry, page not found.'
      extra={
        <Link to='/'>
          <Button type='primary'>Go back</Button>
        </Link>
      }
    />
  )
}

export default NotFound
