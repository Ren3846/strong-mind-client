import { Layout as AntLayout } from 'antd'

import { QuestionCircleOutlined } from '@ant-design/icons'
import { FloatButton } from 'antd'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className='layout-custom'>
      <AntLayout.Content style={{ height: '100%', padding: '25px' }}>
        {children}
      </AntLayout.Content>

      <FloatButton
        icon={<QuestionCircleOutlined />}
        type='primary'
        style={{ right: 24 }}
      />
    </div>
  )
}

export default Layout