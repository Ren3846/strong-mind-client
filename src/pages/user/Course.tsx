import React from 'react'
import { useParams } from 'react-router-dom'

const Course: React.FC<{}> = () => {
  const {id} = useParams();
  return <div>Course {id}</div>
}

export default Course
