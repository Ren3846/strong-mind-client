import React from 'react';
import { Route, Routes } from 'react-router-dom'
import UserRoutes from './routes/UserRoutes'
import TutorRoutes from './routes/TutorRoutes'
import NotFound from './pages/NotFound'
import './App.css'
import Landing from './pages/Landing'

function App() {
  return (
    <div className='bg-gray-100'>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/tutor/*' element={<TutorRoutes />} />
        <Route path='/*' element={<UserRoutes />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
