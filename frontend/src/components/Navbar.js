import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const navData = [
  {
    name: 'Home',
    link: '/',
    path: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  },
  {
    name: 'About',
    link: '/about',
    path: 'M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    name: 'Articles',
    link: '/articles',
    path: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z',
  },
]

const Navbar = () => {
  const location = useLocation()

  return (
    <nav className='fixed top-0 bg-sky-500 w-full bg-opacity-80 backdrop-blur-sm text-white z-50'>
      <div className='max-w-screen-md mx-auto p-4'>
        <ol className='flex justify-between'>
          {navData.map((data) => (
            <Link to={data.link} key={data.name}>
              <li
                className={
                  'border-[1px] p-2 rounded-full overflow-hidden cursor-pointer  transition-all duration-300 ' +
                  (location.pathname === data.link
                    ? 'bg-white text-sky-500'
                    : 'hover:bg-white hover:text-sky-500')
                }
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d={data.path}
                  />
                </svg>
              </li>
            </Link>
          ))}
        </ol>
      </div>
    </nav>
  )
}

export default Navbar
