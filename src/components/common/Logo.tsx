import { Link } from 'react-router-dom'

function Logo({ size = 1, tutor = false, outline = true, to = '/' }) {
  return (
    <>
      <Link to={to} className='relative'>
        <h1
          className={`${tutor ? 'text-orange-400' : 'text-blue-600'}
                    ${outline ? 'rounded-full' : ''} 
                    px-2 text-center nexa-font hover:bg-blue-50`}
          style={{ fontSize: `${size}rem` }}
        >
          StrongMind
        </h1>
      </Link>
    </>
  )
}

export default Logo
