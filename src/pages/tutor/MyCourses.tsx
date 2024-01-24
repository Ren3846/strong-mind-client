import React, { useEffect, useState } from 'react'

import { Button, Card, Divider, Row, Skeleton, Space, message } from 'antd'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { ICourse } from '../../redux/store/types'
import MyBreadcrumb from '../../components/common/Breadcrumb'
import useTranslations from '../../lang/useTranslations'

const breadcrumbItems = [
  { title: 'Dashboard', link: '/Dashboard' },
  { title: 'My courses' },
]

const MyCourses: React.FC = () => {
  const t = useTranslations('MyCourses');
  const tDashboard = useTranslations('Dashboard');

  const [data, setData] = useState<ICourse[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get('/api/courses/created')
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  const handleDeleteCourse = (courseId: string) => {
    axios
      .delete(`/api/courses/${courseId}`)
      .then(() => {
        message.success(t('deleteCourseSuccessful'));
        setData((data) => data.filter((course) => course._id !== courseId));
      })
      .catch((error) => {
        message.error(t('errorDeleteCourse'));
        console.error(error);
      });
  };

  return (
    <Row align='middle' justify='center'>
      <MyBreadcrumb
        items={[
          { title: tDashboard('title'), link: '/Dashboard' },
          { title: t('title') },
        ]}
      />

      <Card title={t('title')} style={{ width: '80rem', margin: '20px' }}>
        {loaded ? (
          <ul>
            {data.map((item) => (
              <Card key={item._id} style={{ margin: '20px' }}>
                <Space
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <Link to={item._id}>
                    <li key={item._id}>{item.title}</li>
                  </Link>
                  <Divider type='vertical' />
                  <div>
                    <Button
                      type='primary'
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleDeleteCourse(item._id)}
                    />
                    <Link to={item._id}>
                      <Button
                        type='primary'
                        icon={<SearchOutlined />}
                        style={{ margin: 5 }}
                      />
                    </Link>
                    <Link to={`edit/${item._id}`}>
                      <Button type='default' icon={<EditOutlined />} />
                    </Link>
                  </div>
                </Space>
              </Card>
            ))}
          </ul>
        ) : (
          <Skeleton active />
        )}

        <Divider />
        <Link to='/mycourses/addcourse'>
          <Button type='primary' icon={<PlusOutlined />}>
            {t('addCourse')}
          </Button>
        </Link>
      </Card>
    </Row>
  );
};

export default MyCourses;