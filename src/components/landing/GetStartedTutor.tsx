import { motion } from 'framer-motion'

import styles from '../../styles'
import { TitleText, TypingText } from './Typography'
import { tutorVariants, staggerContainer, fadeIn } from '../../utils/motions'
import imageTutor from '../../assets/Wavy_Edu3.jpg'
import knowledgeIcon from '../../assets/knowledge.png'
import sharingIcon from '../../assets/sharing.png'

const newFeatures = [
  {

    imgUrl: knowledgeIcon,
    title: 'A new functions',
    subtitle: 'We have the latest update with new world for you to try never mind',
  },
  {
    imgUrl: sharingIcon,
    title: 'A new app',
    subtitle: 'In the latest update, your eyes are narrow, making the world more realistic than ever',
  },
]


const NewFeatures = ({ imgUrl, title, subtitle }: {imgUrl: string, title: string, subtitle: string}) => (
  <div className='flex-1 flex flex-col sm:max-w-[250px] min-w-[210px]'>
    <div className={`${styles.flexCenter} w-[70px] h-[70px] rounded-[24px] bg-[#5850ec]`}>
      <img src={imgUrl} alt='icon' className='w-1/2 h-1/2 object-contain' />
    </div>
    <h1 className='mt-[26px] font-bold text-[24px] leading-[30.24px] text-black'>{title}</h1>
    <p className='flex-1 mt-[16px] font-normal text-[18px] text-[#3434349b] leading-[32.4px]'>{subtitle}</p>
  </div>
)

const GetStartedTutor = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <motion.div
      initial='hidden'
      whileInView='show'
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-8`}
    >
      <motion.div variants={fadeIn('right', 'tween', 0.2, 1)} className='flex-[0.95] flex justify-center flex-col'>
        <TypingText title='| Are you a good teacher?' />
        <TitleText title={'Join! New about StrongMind'} />
        <div className='mt-[48px] flex flex-wrap justify-between gap-[24px]'>
          {newFeatures.map((feature) => (
            <NewFeatures key={feature.title} {...feature} />
          ))}
        </div>
      </motion.div>

      <motion.div variants={tutorVariants('right')} className={`flex-1 ${styles.flexCenter}`}>
        <img src={imageTutor} alt='get-started' className='w-[90%] h-[90%] object-contain' />
      </motion.div>

   
    </motion.div>
  </section>
)

export default GetStartedTutor
