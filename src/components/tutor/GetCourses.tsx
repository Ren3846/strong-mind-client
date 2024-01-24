import { Button, Card, Space } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { ICourse } from '../../redux/store/types'
import { Link } from 'react-router-dom'
import useTranslations from '../../lang/useTranslations'

export const GetCourses: React.FC<{
  courseId: string
}> = ({ courseId }) => {
  const t = useTranslations('GetCourses')
  const [course, setCourse] = useState<ICourse | null>(null)
  // const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    axios({
      url: `/api/courses/${courseId}`,
      method: 'get',
    })
      .then(({ data }) => {
        console.log(data)
        setCourse(data)
      })
      .catch((error) => {
        console.error(error)
      })
      // .finally(() => {
      //   setLoaded(true)
      // })
  }, [courseId])

  return (
    <div>
      <Space>
        <Card style={{ width: '15rem', margin: '5px' }}>
          {course ? (
            <Space
              direction='vertical'
              size='middle'
              style={{ display: 'flex' }}
            >
              <h3>{course.title}</h3>
              <p>{course.about}</p>

              <span>{t('price')} {course.meetingPrice} $</span>
              <Button type='primary' key={course._id}>
                <Link to={`/courses/${course._id}`}>{t('explore')}</Link>
              </Button>
            </Space>
          ) : (
            <p>{t('no-courses-yet')}</p>
          )}
        </Card>
      </Space>
    </div>
  )
}
