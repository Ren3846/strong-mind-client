import { message } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface GetLikesProps {
  courseId: string
}

const GetLikes: React.FC<GetLikesProps> = ({ courseId }) => {
  const [courseLikes, setCourseLikes] = useState([])
  const [loadingLikes, setLoadingLikes] = useState(true)

  useEffect(() => {
    axios
      .get(`/api/courses/${courseId}/likes`)
      .then((response) => {
        console.log(response.data)
        setCourseLikes(response.data)
      })
      .catch((error) => {
        console.error(error)
        message.error('Error while fetching course likes')
      })
      .finally(() => {
        setLoadingLikes(false)
      })
  }, [courseId])

  return (
    <div>
      {loadingLikes ? (
        <p>Loading...</p>
      ) : (
        <h4>{`Course Likes: ${courseLikes}`}</h4>
      )}
    </div>
  )
}

export default GetLikes
