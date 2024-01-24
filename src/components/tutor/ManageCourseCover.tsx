import React, { useState } from 'react'
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons'
import type { UploadFile } from 'antd'
import { Button, message, Upload } from 'antd'
import { UploadChangeParam } from 'antd/es/upload'
import axios from 'axios'
import useTranslations from '../../lang/useTranslations'

const ManageCourseCover: React.FC<{
  courseId: string,
  cover: boolean,
  onChange: (cover: string | null) => void
}> = ({courseId, cover, onChange}) => {
  const t = useTranslations('ManageCourseCover')
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const onFileDelete = () => {
    setDeleteLoading(true);
    axios({
      url: '/api/courses/cover/' + courseId,
      method: "delete"
    }).then(() => {
      message.success(t('course-cover-deleted-successfully'));
      onChange(null)
    }).catch(err => {
      message.error(t('course-cover-delete-failed'))
    }).finally(() => {
      setDeleteLoading(false);
    })
  }


  const onFileChange = (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.file.status === 'uploading') {
      console.log(info.file.response);
      setUploading(true)
    } else if (info.file.status === 'done') {
      message.success(t('course-cover-uploaded-successfully'))
      setUploading(false)
      onChange(info.file.response.cover)
    } else if (info.file.status === 'error') {
      message.error(t('course-cover-upload-failed'))
    }
  }

  if (cover) return (
    <Button
      icon={<DeleteOutlined />}
      loading={deleteLoading}
      onClick={onFileDelete}
      danger
      children={t('delete-course-cover-video')}
    />
  )

  return (
    <Upload
      name='cover'
      action={'/api/courses/cover/' + courseId}
      showUploadList={false}
      onChange={onFileChange}
      accept='mp4'
    >
      <Button 
        icon={<UploadOutlined />}
        loading={uploading}
      >{t('upload-course-cover-video')}</Button>
    </Upload>
  )
}

export default ManageCourseCover
