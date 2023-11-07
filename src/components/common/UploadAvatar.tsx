import { Form, Upload, Button, message, Modal, Avatar } from 'antd'
import { DeleteOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { baseImageUrl } from '../../pages'

const UploadAvatar = () => {
  const [form] = Form.useForm()
  const [fileId, setFileId] = useState(null)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const user = useSelector((state: any) => state.auth.user)
  const [image, setImageUrl] = useState('')

  useEffect(() => {
    setImageUrl(`${baseImageUrl}/${user.image}`)
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

        setFileId(newFileId)
        onSuccess(response, file)
        setImageUrl(`${baseImageUrl}/${newFileId}`)
        message.success('Photo uploaded successfully')
      })
      .catch((error) => {
        console.log(error)
        onError('An error occurred while uploading the photo', error, file)
        message.error('An error occurred while uploading the photo')
      })
  }

  const handlePreview = async (file: any) => {
    if (file.url) {
      setPreviewImage(file.url)
      setPreviewVisible(true)
    }
  }

  const handleDelete = () => {
    axios
      .delete('/api/users/avatar')
      .then(() => {
        setFileId(null)
        setImageUrl('')
        message.success('Photo deleted successfully')
      })
      .catch((error) => {
        console.error(error)
        message.error('An error occurred while deleting the photo')
      })
  }

  const handleCancel = () => setPreviewVisible(false)

  return (
    <>
      <Form
        form={form}
        name='customized_form_controls'
        layout='horizontal'
        onFinish={onFinish}
        initialValues={{ size: 'small' }}
      >
        <Form.Item>
          <Upload
            customRequest={({ file, onSuccess, onError }) =>
              customRequest({ file, onSuccess, onError })
            }
            name='avatar'
            listType='picture-circle'
            className='avatar-uploader'
            showUploadList={false}
            onPreview={handlePreview}
          >
            {image ? (
              <Avatar src={image} style={{ width: '90%', height: '90%' }} />
            ) : (
              // <Button icon={<UploadOutlined />} />
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
      <Modal
        open={previewVisible}
        title='Preview'
        footer={null}
        onCancel={handleCancel}
      >
        <img alt='Avatar' style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  )
}

export default UploadAvatar
