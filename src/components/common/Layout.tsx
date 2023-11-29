import { Layout as AntLayout } from 'antd'

import {
  CommentOutlined,
  CustomerServiceOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons'
import { FloatButton } from 'antd'
import Footer from './Footer'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className='layout-custom'>
      <AntLayout.Content
        style={{
          height: '100%',
          padding: '25px',
          backgroundColor: 'transparent',
        }}
      >
        {children}
      </AntLayout.Content>

      <>
        <FloatButton.Group
          trigger='hover'
          type='primary'
          style={{ right: 30 }}
          icon={<QuestionCircleOutlined />}
        >
          <FloatButton />
          <FloatButton icon={<CommentOutlined />} />
        </FloatButton.Group>
      </>
      {/* <Footer /> */}
    </div>
  )
}

export default Layout
