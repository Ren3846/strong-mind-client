import React, { useState, useEffect } from 'react'
import { Card, Button, Divider, Space, Row, Upload, message } from 'antd'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { UploadOutlined } from '@ant-design/icons'
import useTranslations from '../../lang/useTranslations'

interface ILesson {
  _id: string
  title: string | null
  description: string | null
  videoKey: string | null
  duration: number | null
}

const Lesson: React.FC = () => {
  const { id } = useParams();
  const t = useTranslations('Lesson');

  const [lesson, setLesson] = useState<ILesson | null>(null);
  const [error, setError] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    axios
      .get(`/api/lessons/${id}`)
      .then((response) => {
        setLesson(response.data);
      })
      .catch((error) => {
        console.error(error);
        setError(t('errorFetchingLessonData'));
      });
  }, [id]);

  const customRequest = ({ file, onSuccess, onError }: any) => {
    const formData = new FormData();
    formData.append('video', file);

    axios
      .post(`/api/lessons/video/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        onSuccess(response, file);
        message.success(t('videoUploadedSuccessfully'));
      })
      .catch((error) => {
        onError(t('errorUploadingVideo'), error, file);
        message.error(t('errorUploadingVideo'));
      });
  };

  return (
    <div>
      <Row align='middle' justify='center'>
        <Card title={t('title')} style={{ width: '60rem', margin: '20px' }}>
          <Space>
            {lesson && (
              <div style={{ width: '15rem', margin: '5px' }}>
                <h2>{lesson.title}</h2>
                <p>{lesson.description}</p>
                <p>{lesson.duration}</p>
                <p>{lesson.videoKey}</p>
                <Divider />

                {videoUrl ? (
                  <video controls width='640' height='360'>
                    <source src={videoUrl} type='video/mp4' />
                    Your browser does not support the video.
                  </video>
                ) : (
                  <Upload customRequest={customRequest} showUploadList={false}>
                    <Button icon={<UploadOutlined />}>{t('uploadVideo')}</Button>
                  </Upload>
                )}
                <Divider />

                <p>
                  {t('duration')}: {lesson.duration} {t('minutes')}
                </p>
              </div>
            )}
          </Space>
        </Card>
      </Row>

      {error && <p>{error}</p>}
    </div>
  );
};

export default Lesson;