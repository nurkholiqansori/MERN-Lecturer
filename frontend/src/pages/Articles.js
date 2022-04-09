import React from 'react'
import { Link } from 'react-router-dom'
import Body from '../components/Body'
import Title from '../components/Title'
import axios from 'axios'

const Articles = () => {
  const [articleData, setArticleData] = React.useState([])

  React.useEffect(() => {
    axios
      .get('http://localhost:8000/api/articles')
      .then((res) => {
        setArticleData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  console.log(articleData)

  return (
    <Body>
      <Title>Articles</Title>
      <div className='flex justify-center md:justify-between flex-wrap gap-3 flex-row'>
        {articleData.map((article) => {
          const date = new Date(article.createdAt)
          const month = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ]
          const day = date.getDate()
          const year = date.getFullYear()
          const monthName = month[date.getMonth()]
          const dateFormat = `${day} ${monthName} ${year}`
          return (
            <div
              className='md:w-5/12 w-2/3 relative bg-black rounded-xl overflow-hidden'
              key={article.url}
            >
              <div>
                <p className='p-6 text-xs font-medium leading-3 text-white absolute top-0 right-0'>
                  {dateFormat}
                </p>
                <div className='absolute bottom-0 left-0 p-6 bg-gradient-to-b from-transparent via-sky-500 to-sky-500'>
                  <h2 className='text-xl font-semibold 5 text-white'>
                    {article.title}
                  </h2>
                  <p className='text-base leading-4 text-white mt-2'>
                    {article.content.substring(0, 60) + '...'}
                  </p>
                  <Link
                    to={`/article/${article.url}`}
                    className='focus:outline-none focus:underline flex items-center mt-4 cursor-pointer text-white hover:text-gray-200 hover:underline'
                  >
                    <p className='pr-2 text-sm font-medium leading-none'>
                      Read More
                    </p>
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
                src={article.thumbnail}
                className='w-full object-cover'
                alt={article.title}
              />
            </div>
          )})}
      </div>
    </Body>
  )
}

export default Articles
