import React from 'react'
import { Link, useParams } from 'react-router-dom'
import articleData from '../api/articleData'
import Body from '../components/Body'
import Title from '../components/Title'
import NotFound from './NotFound'

const Article = () => {
  const params = useParams()

  const article = articleData.find((article) => article.name === params.name)

  if (!article) return <NotFound />

  return (
    <Body>
      <div className='flex items-start justify-between'>
        <Link to='/articles'>
          <div className='border-[1px] rounded-full p-2 cursor-pointer hover:bg-sky-500 hover:text-white transition-all duration-300'>
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
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </div>
        </Link>
        <Title>{article.title}</Title>
        <div></div>
      </div>
      <div className='w-1/2 mx-auto rounded-lg overflow-hidden my-5'>
        <img className='w-full h-full' src={article.img} alt={article.title} />
      </div>
      <p className='text-justify'>{article.content}</p>
      <div className='my-5'>
        <div className='text-xl text-center pb-5 text-semibold'>Comments</div>
        <div className='bg-white w-full rounded-lg px-10 py-4 shadow-lg hover:shadow-2xl transition duration-500 border flex'>
          <div className='mt-4'>
            <p className='text-md text-gray-600'>
              But I must explain to you how all this mistaken idea of denouncing
              pleasure and praising pain was born and I will give you a complete
              account of the system, and expound the actual teachings of the
              great explorer of the truth, the master-builder of human happines.
            </p>
            <div className='flex justify-between items-center'>
              <div className='mt-4 flex items-center space-x-4 py-4'>
                <div className=''>
                  <img
                    className='w-12 h-12 rounded-full'
                    src='https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1036&q=80'
                    alt=''
                  />
                </div>
                <div className='text-sm font-semibold'>
                  John Lucas • <span className='font-normal'> 5 minutes ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=''>
          <div className='text-xl text-center py-5 text-semibold'>
            Submit Comment
          </div>
          <input
            type='email'
            className='bg-gray-100 rounded-lg border border-sky-500 leading-normal resize-none w-full py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white mb-4 transition-all duration-300'
            name='email'
            placeholder='Your Gravatar Email'
            required
          />
          <textarea
            className='bg-gray-100 rounded-lg border border-sky-500 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white transition-all duration-300'
            name='body'
            placeholder='Type Your Comment'
            required
          ></textarea>
          <a
            href='https://gravatar.com'
            target='_blank'
            rel='noopener noreferrer'
            title='Gravatar Website'
            className='block text-gray-400'
          >
            <small>Not have Gravatar Account?</small>
          </a>
          <button className='p-2 border-[1px] rounded-lg mt-5 w-1/3 border-sky-500 hover:bg-sky-500 hover:text-white transition-all duration-300'>
            Submit
          </button>
        </div>
      </div>
    </Body>
  )
}

export default Article
