import '../../styles/globals.css'

import GetStartedStudent from '../../components/landing/GetStartedStudent.tsx'
import GetStartedTutor from '../../components/landing/GetStartedTutor'
import Footer from '../../components/common/Footer'
import Hero from '../../components/landing/Hero'
import Snowfall from '../../components/common/snowfall/snowfall'

export default function Landing() {
  return (
    <div className='relative isolate px-6 lg:px-8'>
      <Hero />
      {/* <Snowfall /> */}
      <GetStartedStudent />
      <GetStartedTutor />
      <Footer />
    </div>
  )
}
