import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Landing from './pages/landing/Landing'

function App() {
  return (
    <div className='bg-gray-100'>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
