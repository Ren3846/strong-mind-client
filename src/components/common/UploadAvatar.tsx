import { Form, Upload, Button, message, Avatar } from 'antd'
import { DeleteOutlined, UserOutlined } from '@ant-design/icons'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { CDN_BASE } from '../..'

const UploadAvatar = () => {
  const [form] = Form.useForm()

  const user = useSelector((state: any) => state.auth.user)
  const [image, setImageUrl] = useState('')

  useEffect(() => {
    setImageUrl(CDN_BASE + user.avatar)
  }, [user])

  const onFinish = (values: any) => {
    console.log('Received values:', values)
  }

  const customRequest = ({ file, onSuccess, onError }: any) => {
    const formData = new FormData()
    formData.append('avatar', file)

    axios
      .post('/api/users/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response.data)
        const newFileId = response.data._id

        onSuccess(response, file)
        setImageUrl(CDN_BASE + newFileId)
        message.success('Photo uploaded successfully')
      })
      .catch((error) => {
        console.log(error)
        onError('An error occurred while uploading the photo', error, file)
        message.error('An error occurred while uploading the photo')
      })
  }

  const handleDelete = () => {
    axios
      .delete('/api/users/avatar')
      .then(() => {
        setImageUrl('')
        message.success('Photo deleted successfully')
      })
      .catch((error) => {
        console.error(error)
        message.error('An error occurred while deleting the photo')
      })
  }

  return (
    <>
      <Form
        form={form}
        name='customized_form_controls'
        layout='horizontal'
        onFinish={onFinish}
        initialValues={{ size: 'large' }}
      >
        <Form.Item>
          <Upload
            customRequest={({ file, onSuccess, onError }) =>
              customRequest({ file, onSuccess, onError })
            }
            listType='picture-circle'
            showUploadList={false}
          >
            {image ? (
              <Avatar src={image} style={{ width: '90%', height: '90%' }} />
            ) : (
              <Avatar icon={<UserOutlined />} />
            )}
          </Upload>
          {image && (
            <Button size='small' danger onClick={handleDelete}>
              <DeleteOutlined />
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  )
}

export default UploadAvatar
