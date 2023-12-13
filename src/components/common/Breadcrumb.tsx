import React from 'react'
import { Breadcrumb, Col } from 'antd'
import { Link } from 'react-router-dom'

interface BreadcrumbItem {
  title: string
  link?: string
}

interface MyBreadcrumbProps {
  items: BreadcrumbItem[]
}

const MyBreadcrumb: React.FC<MyBreadcrumbProps> = ({ items }) => {
  return (
    <Col span={18} style={{ marginTop: '20px' }}>
      <Breadcrumb>
        {items.map((item, index) => (
          <Breadcrumb.Item key={index}>
            {item.link ? <Link to={item.link}>{item.title}</Link> : item.title}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </Col>
  )
}

export default MyBreadcrumb
