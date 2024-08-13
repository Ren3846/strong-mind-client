import '../../styles/globals.css'

import GetStartedStudent from '../../components/landing/GetStartedStudent.tsx'
import GetStartedTutor from '../../components/landing/GetStartedTutor'
import Footer from '../../components/common/Footer'
import Hero from '../../components/landing/Hero'
import Snowfall from '../../components/common/snowfall/snowfall'
import { FloatButton } from 'antd'
import { WhatsAppOutlined } from '@ant-design/icons'
import Courses from '../user/AllCourses'

export default function Landing() {
  return (
    <div className='relative isolate px-6 lg:px-8'>
      <Hero />
      {/* <Snowfall /> */}
      <GetStartedStudent />
      <GetStartedTutor />
      <Courses />
      <FloatButton
        className='whatsapp'
        onClick={() => window.location.assign("https://wa.me/+380660514461")}
        icon={<WhatsAppOutlined style={{ fontSize: '150%'}} />} 
        style={{ width: 64, height: 64 }}
      />
    </div>
  )
}
