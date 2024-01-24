import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../../components/common/Layout'
import { Row, Card, Space, Skeleton } from 'antd'
import { Link } from 'react-router-dom'

import { ITeacher } from '../../redux/store/types'
import useTranslations from '../../lang/useTranslations'

const Teachers: React.FC = () => {
  const [topTeachers, setTopTeachers] = useState<ITeacher[]>([])
  const [loaded, setLoaded] = useState(false)
  const t = useTranslations('Teachers');

  useEffect(() => {
    axios
      .get<ITeacher[]>('/api/users/top')
      .then((response) => {
        console.log(response.data)
        setTopTeachers(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setLoaded(true)
      })
  }, [])

  return (
    <Layout>
      <Row align='middle' justify='center'>
        <Card
          title={t('top_tutors')}
          style={{ width: '80rem', padding: '20px' }}
        >
          {loaded ? (
            <Space direction='horizontal'>
              {Array.isArray(topTeachers) ? (
                topTeachers.map((teacher, index) =>
                  teacher ? (
                    <Card key={teacher._id} title={teacher.fullName}>
                      <p>{`${t('email')}: ${teacher.email}`}</p>
                      <p>{`${t('students')}: ${teacher.students.length}`}</p>
                      <Link to={`/teacher/${teacher._id}`}>{t('view_details')}</Link>
                    </Card>
                  ) : null,
                )
              ) : (
                <p>{t('no_data')}</p>
              )}
            </Space>
          ) : (
            <Skeleton active />
          )}
        </Card>
      </Row>
    </Layout>
  )
}

export default Teachers