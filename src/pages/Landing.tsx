import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/common/Logo'
import GetStartedStudent from '../components/landing/GetStartedStudent.tsx'
import GetStartedTutor from '../components/landing/GetStartedTutor'
import '../styles/globals.css'

import Footer from '../components/common/Footer'

const navigation = [
  { name: 'Home', href: '/user' },
  { name: 'Courses', href: '/explore' },
  { name: 'Teach', href: '/tutor' },
  { name: 'Contact', href: '/contact' },
]

export default function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const el = useRef(null)

  return (
    <div className='bg-white background-animation'>
      <div className='relative isolate px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl py-6 pt-6 sm:pt-24 lg:pt-28'>
          <div className='hidden sm:mb-8 sm:flex sm:justify-center'>
            <div className='relative rounded-full px-3 py-1 text-md leading-6 text-gray-600 ring-1 ring-gray-900/30 hover:ring-gray-900/30'>
              Teach, inspire, and grow with StrongMind dynamic learning
              platform.{' '}
              <Link to='/tutor' className='font-semibold text-indigo-600'>
                <span className='absolute inset-0' aria-hidden='true' />
                Join As a Tutor
                <span aria-hidden='true'>&rarr;</span>
              </Link>
            </div>
          </div>
          <div className='text-center mt-24'>
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
            <div className='mt-10 flex items-center justify-center gap-x-6 '>
              <Link
                to='/user'
                className='rounded-md  bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Let`s start as student
              </Link>
              <Link
                to='/user#about'
                className='text-sm font-semibold leading-6 text-gray-900'
              >
                Learn more <span aria-hidden='true'>→</span>
              </Link>
            </div>
          </div>
        </div>

        <hr className='w-64 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 light:bg-gray-700' />

        <div className='text-center'>
          <div className='mx-auto max-w-7xl px-6 lg:px-8 p-5 rounded-lg'>
            <dl className='grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3 '>
              <div className='mx-auto flex max-w-xs flex-col gap-y-4 hero-stats'>
                <dt className='text-base leading-7 text-gray-600'>
                  Minutes of learning online every 24 hours
                </dt>
                <div className='order-first text-3xl font-semibold tracking-tight flex justify-center text-gray-900 sm:text-5xl'>
                  {/* <Counter value={724} /> */}
                  <h1>724</h1>
                </div>
              </div>
              <div className='mx-auto flex max-w-xs flex-col gap-y-4 hero-stats'>
                <dt className='text-base leading-7 text-gray-600'>
                  Courses sold every week
                </dt>
                <div className='order-first text-3xl font-semibold flex justify-center tracking-tight text-gray-900 sm:text-5xl'>
                  {/* <Counter value={543} /> */}
                  <h1>543</h1>
                </div>
              </div>
              <div className='mx-auto flex max-w-xs flex-col gap-y-4 hero-stats'>
                <dt className='text-base leading-7 text-gray-600'>
                  New users yearly
                </dt>
                <div className='order-first text-3xl font-semibold flex justify-center tracking-tight text-gray-900 sm:text-5xl'>
                  {/* <Counter value={1803} /> */}
                  <h1>1803</h1>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <GetStartedStudent />
      <GetStartedTutor />
      <Footer />
    </div>
  )
}
