import { Form, Upload, Button, message, Modal, Avatar } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import axios from 'axios'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { baseImageUrl } from '../../pages'

const UploadAvatar = () => {
  const [form] = Form.useForm()
  const [fileId, setFileId] = useState(null)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const user = useSelector((state: any) => state.auth.user)

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

  const handleCancel = () => setPreviewVisible(false)
  const imageUrl = `${baseImageUrl}/${user.image}`

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
            action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188'
            showUploadList={false}
            onPreview={handlePreview}
          >
            {imageUrl ? (
              <Avatar src={imageUrl} style={{ width: '90%', height: '90%' }} />
            ) : (
              <Button icon={<UploadOutlined />}></Button>
            )}
          </Upload>
        </Form.Item>
      </Form>
      <Modal
        visible={previewVisible}
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
