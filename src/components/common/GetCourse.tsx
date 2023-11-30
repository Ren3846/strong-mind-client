import axios from 'axios'
import { useEffect, useState } from 'react'
import { ICourse } from '../../redux/store/types'
import Preloader from './Preloader'

export const GetCourse: React.FC<{
  courseId: string
}> = ({ courseId }) => {
  const [course, setCourse] = useState<ICourse | null>(null)
  const [loaded, setLoaded] = useState(false)

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
      .finally(() => {
        setLoaded(true)
      })
  }, [courseId])

  return <> {loaded && course ? course.title : <Preloader />}</>
}
