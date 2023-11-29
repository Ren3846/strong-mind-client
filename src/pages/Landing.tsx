import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/common/Logo'
import GetStartedStudent from '../components/landing/GetStartedStudent.tsx'
import GetStartedTutor from '../components/landing/GetStartedTutor'
import '../styles/globals.css'

import Footer from '../components/common/Footer'
import {
  ClockCircleOutlined,
  HourglassOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { motion } from 'framer-motion'

export default function Landing() {
  const el = useRef(null)

  const variantsRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  }

  const variantsLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <div className='relative isolate px-6 lg:px-8'>
      <div className='mx-auto max-w-2xl py-6 pt-6 sm:pt-24 lg:pt-28'>
        <div className='hidden sm:mb-8 sm:flex sm:justify-center'>
          <motion.div
            className='box'
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              delay: 1,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <div className='relative rounded-full px-3 py-1 text-md leading-6 text-gray-600 ring-1 ring-gray-900/30 hover:ring-gray-900/30'>
              Teach, inspire, and grow with StrongMind dynamic learning
              platform.{' '}
              <Link
                to='/signup'
                className='font-semibold text-indigo-600'
                style={{ textDecoration: 'none' }}
              >
                <span className='absolute inset-0' aria-hidden='true' />
                Join As a Tutor
                <span aria-hidden='true'>&rarr;</span>
              </Link>
            </div>
          </motion.div>
        </div>
        <div className='text-center mt-24'>
          <motion.div
            className='box'
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <h1 className='text-3xl font-bold tracking-tight nexa-font text-gray-900 sm:text-6xl'>
              StrongMind Academy
            </h1>
            <p className='mt-3 text-lg leading-8 text-gray-600 typed-js-color'>
              <span className='font-semibold' ref={el} />
            </p>
            <p className='mt-11 text-lg leading-8 text-gray-600'>
              Embark on an adventure of learning, where every discovery enriches
              the mind and empowers the soul to reach new heights.
            </p>
          </motion.div>

          <div className='mt-10 flex items-center justify-center gap-x-6 '>
            <motion.div
              initial='hidden'
              animate='visible'
              variants={variantsLeft}
              transition={{ duration: 1 }} // Установите желаемую продолжительность анимации
            >
              <motion.div
                className='box'
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Link
                  to='/signup'
                  className='rounded-md  bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                  style={{ textDecoration: 'none' }}
                >
                  Let`s start as student
                </Link>
              </motion.div>
            </motion.div>
            <motion.div
              initial='hidden'
              animate='visible'
              variants={variantsRight}
              transition={{ duration: 1 }}
            >
              <motion.div
                className='box'
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Link
                  to='/courses'
                  className='text-sm font-semibold leading-6 text-gray-900'
                  style={{ textDecoration: 'none' }}
                >
                  Explore courses <span aria-hidden='true'>→</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <hr className='w-64 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 light:bg-gray-700' />

      <div className='text-center'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8 p-5 rounded-lg'>
          <dl className='grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3 '>
            <motion.div
              className='box'
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1,
                delay: 0.6,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              <motion.div
                className='box'
                whileHover={{ scale: [null, 1.3, 1.2] }}
                transition={{ duration: 0.3 }}
              >
                <div className='mx-auto flex max-w-xs flex-col gap-y-4 hero-stats'>
                  <dt className='text-base leading-7 text-gray-600'>
                    From 5$ per hour
                  </dt>
                  <div className='order-first text-3xl font-semibold tracking-tight flex justify-center text-gray-900 sm:text-5xl'>
                    <HourglassOutlined style={{ color: '#5046e5' }} />
                  </div>
                </div>
              </motion.div>
            </motion.div>
            <motion.div
              className='box'
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1,
                delay: 0.8,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              <motion.div
                className='box'
                whileHover={{ scale: [null, 1.3, 1.2] }}
                transition={{ duration: 0.3 }}
              >
                <div className='mx-auto flex max-w-xs flex-col gap-y-4 hero-stats'>
                  <dt className='text-base leading-7 text-gray-600'>
                    Free 2 lessons for you
                  </dt>
                  <div className='order-first text-3xl font-semibold flex justify-center tracking-tight text-gray-900 sm:text-5xl'>
                    <UserOutlined style={{ color: '#5046e5' }} />
                  </div>
                </div>
              </motion.div>
            </motion.div>
            <motion.div
              className='box'
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1,
                delay: 1,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              <motion.div
                className='box'
                whileHover={{ scale: [null, 1.3, 1.2] }}
                transition={{ duration: 0.3 }}
              >
                <div className='mx-auto flex max-w-xs flex-col gap-y-4 hero-stats'>
                  <dt className='text-base leading-7 text-gray-600'>
                    Lessons from 25 to 55 min
                  </dt>
                  <div className='order-first text-3xl font-semibold flex justify-center tracking-tight text-gray-900 sm:text-5xl'>
                    <ClockCircleOutlined style={{ color: '#5046e5' }} />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </dl>
        </div>
      </div>
      <GetStartedStudent />
      <GetStartedTutor />
      <Footer />
    </div>
  )
}
