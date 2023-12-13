import { Alert, Space } from 'antd'

type Props = {
  message?: string
}

export const ErrorMessage = ({ message }: Props) => {
  if (!message) {
    return null
  }

  return (
    <div style={{ margin: 20 }}>
      <Alert showIcon message={message} type='error' />
    </div>
  )
}
