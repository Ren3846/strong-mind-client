import { Form, Upload, Button, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import axios from 'axios'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const UploadAvatar = () => {
  const [form] = Form.useForm()
  const [fileId, setFileId] = useState(null)
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
        message.success('Фото успешно загружено')
      })
      .catch((error) => {
        console.log(error)
        onError('Произошла ошибка при загрузке фото', error, file)
        message.error('Произошла ошибка при загрузке фото')
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
        <Form.Item label='Avatar'>
          <Upload
            customRequest={({ file, onSuccess, onError }) =>
              customRequest({ file, onSuccess, onError })
            }
            name='avatar'
            listType='picture-card'
            className='avatar-uploader'
            showUploadList={true}
          >
            <Button icon={<UploadOutlined />}></Button>
          </Upload>
        </Form.Item>
      </Form>
    </>
  )
}

export default UploadAvatar
