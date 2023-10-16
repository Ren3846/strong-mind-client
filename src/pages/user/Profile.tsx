import React, { useState, useEffect } from 'react'
import Breadcrumb from '../../components/user/Breadcrumb'
import { message } from 'antd'
import { UserDetails } from '../../api/user'
import { useSelector } from 'react-redux'
import { StoreType } from '../../redux/store'

function Profile() {
  const user = useSelector<StoreType, boolean>(
    (state: any) => state.auth.user,
  )
  // updateUserDetailsAPI(data)
  //   .then((response) => {
  //     message.success(
  //       'Profile updated successfully',
  //       3,
  //     ) // Use antd message
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //     message.error(
  //       err?.response.errors.message,
  //     ) // Use antd message
  //   })

  return <p>Profile</p>
}

export default Profile
