import React from 'react'
import { Link } from 'react-router-dom'
import articleData from '../api/articleData'
import Body from '../components/Body'
import Title from '../components/Title'

const Articles = () => {
  return (
    <Body>
      <Title>Articles</Title>
      <div className='flex justify-center md:justify-between flex-wrap gap-3 flex-row'>
        {articleData.map((article) => (
          <div className='md:w-5/12 w-2/3 relative bg-black rounded-xl overflow-hidden' key={article.name}>
            <div>
              <p className='p-6 text-xs font-medium leading-3 text-white absolute top-0 right-0'>
                12 April 2021
              </p>
              <div className='absolute bottom-0 left-0 p-6 bg-gradient-to-b from-transparent via-sky-500 to-sky-500'>
                <h2 className='text-xl font-semibold 5 text-white'>
                  {article.title}
                </h2>
                <p className='text-base leading-4 text-white mt-2'>
                  {article.content.substring(0, 60)+ '...'}
                </p>
                <Link
                  to={`/article/${article.name}`}
                  className='focus:outline-none focus:underline flex items-center mt-4 cursor-pointer text-white hover:text-gray-200 hover:underline'
                >
                  <p className='pr-2 text-sm font-medium leading-none'>Read More</p>
                  <svg
                    className='fill-stroke'
                    width='16'
                    height='16'
                    viewBox='0 0 16 16'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M5.75 12.5L10.25 8L5.75 3.5'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <img
              src={article.img}
              className='w-full object-cover'
              alt={article.title}
            />
          </div>
        ))}
      </div>
    </Body>
  )
}

export default Articles
