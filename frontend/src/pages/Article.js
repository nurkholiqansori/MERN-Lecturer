import axios from 'axios'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import articleData from '../api/articleData'
import Body from '../components/Body'
import Title from '../components/Title'
import NotFound from './NotFound'

const Article = () => {
  const params = useParams()
  // const article = articleData.find((article) => article.name === params.name)
  const title = params.title
  const [articleDb, setArticleDb] = React.useState({})
  const [email, setEmail] = React.useState('')
  const [comment, setComment] = React.useState('')

  React.useEffect(() => {
    axios.get(`http://localhost:8000/api/article/${title}`).then((res) => {
      setArticleDb(res.data)
    })
  }, [])
  console.log(articleDb)

  // const inputComment = async (e) => {
  //   e.preventDefault()
  //   const myHeaders = new Headers()
  //   myHeaders.append('Content-Type', 'application/json')

  //   const raw = JSON.stringify({
  //     email: email,
  //     text: comment,
  //   })

  //   const requestOptions = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     body: raw,
  //   }

  //   const result = await fetch(
  //     `/article/${name}/api/add-comment`,
  //     requestOptions,
  //   )
  //   const body = await result.json()
  //   setArticleDb(body)
  //   setEmail('')
  //   setComment('')
  // }

  if (!articleDb) return <NotFound />

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
        <Title>{articleDb.title}</Title>
        <div></div>
      </div>
      <div className='w-1/2 mx-auto rounded-lg overflow-hidden my-5'>
        <img
          className='w-full h-full'
          src={articleDb.thumbnail}
          alt={articleDb.title}
        />
      </div>
      <p className='text-justify'>{articleDb.content}</p>
      <div className='my-5'>
        <div className='text-xl text-center pb-5 text-semibold'>Comments</div>
        <div className='flex flex-col gap-5'>
          {articleDb.comments ? (
            articleDb.comments.length > 0 ? (
              articleDb.comments.map((comment) => (
                <div
                  key={comment.email}
                  className='bg-white w-full rounded-lg px-10 py-4 shadow-lg hover:shadow-2xl transition duration-500 border flex'
                >
                  <div className='mt-4'>
                    <p className='text-md text-gray-600'>{comment.text}</p>
                    <div className='flex justify-between items-center'>
                      <div className='mt-4 flex items-center space-x-4 py-4'>
                        <div className='text-sm font-semibold'>
                          {comment.email} •{' '}
                          <span className='font-normal'> 5 minutes ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className='text-center text-gray-600'>
                No comments yet. Be the first to comment!
              </div>
            )
          ) : (
            'Loading...'
          )}
        </div>
        <div className=''>
          <div className='text-xl text-center py-5 text-semibold'>
            Submit Comment
          </div>

          <form 
          // onSubmit={(e) => inputComment(e)}
          >
            <input
              type='email'
              className='bg-gray-100 rounded-lg border border-sky-500 leading-normal resize-none w-full py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white mb-4 transition-all duration-300'
              name='email'
              placeholder='Your Name'
              required
            />
            {/* <textarea
              className='bg-gray-100 rounded-lg border border-sky-500 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white transition-all duration-300'
              name='body'
              placeholder='Type Your Comment'
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea> */}
            <a
              href='https://gravatar.com'
              target='_blank'
              rel='noopener noreferrer'
              title='Gravatar Website'
              className='text-gray-400 mx-auto'
            >
              <small>Not have Gravatar Account?</small>
            </a>
            <input
              type='button'
              className='p-2 block border-[1px] rounded-lg mt-5 w-1/3 border-sky-500 hover:bg-sky-500 hover:text-white transition-all duration-300'
              value='Submit'
              // onClick={(e) => inputComment(e)}
            />
          </form>
        </div>
      </div>
    </Body>
  )
}

export default Article
