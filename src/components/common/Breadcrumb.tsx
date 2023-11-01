import React from 'react'
import { Breadcrumb, Col, Row } from 'antd'

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
            {item.link ? <a href={item.link}>{item.title}</a> : item.title}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </Col>
  )
}

export default MyBreadcrumb
