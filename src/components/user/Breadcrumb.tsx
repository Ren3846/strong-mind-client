import React from 'react'
import { Breadcrumb, Col } from 'antd'

interface BreadcrumbItem {
  title: string
  link?: string
}

interface MyBreadcrumbProps {
  items: BreadcrumbItem[]
}

const MyBreadcrumb: React.FC<MyBreadcrumbProps> = ({ items }) => {
  return (
    <Col span={24}>
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
