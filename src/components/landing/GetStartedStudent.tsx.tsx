import { motion } from 'framer-motion'
import styles from '../../styles'
import { staggerContainer, fadeIn, tutorVariants } from '../../utils/motions'
import imageAbout from '../../assets/Wavy_Edu1.jpg'
import { TitleText, TypingText } from './Typography'



const startingFeatures = ['Register your account', 'Choose a course', 'Learn and stay safe']

const StartSteps = ({ number, text }: { number: string; text: string }) => (
  <div className={`${styles.flexCenter} flex-row`}>
    <div className={`${styles.flexCenter} w-[70px] h-[70px] rounded-[24px] bg-[#5850ec]`}>
      <p className='font -bold text-[20px] text-white'>{number}</p>
    </div>
    <p className='flex-1 ml-[30px] font-normal text-[18px] text-[#3434349b] leading-[32.4px]'>{text}</p>
  </div>
)



const GetStartedStudent = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <motion.div
      initial='hidden'
      whileInView='show'
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-8`}
    >
       <motion.div variants={tutorVariants('left')} className={`flex-1 ${styles.flexCenter}`}>
        <img src={imageAbout} alt='get-started' className='w-[90%] h-[90%] object-contain' />
      </motion.div>
      <motion.div variants={fadeIn('left', 'tween', 0.2, 1)} className='flex-[0.75] flex justify-center flex-col'>
        <TypingText title='| Want to become a student?' />
        <TitleText title={'Get started with just a few clicks'} />
        <div className='mt-[31px] flex flex-col max-w-[370px] gap-[24px]'>
          {startingFeatures.map((feature, index) => (
            <StartSteps key={feature} number={`${index < 10 ? '0' : ''} ${index + 1}`} text={feature} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  </section>
)

export default GetStartedStudent
