import React from 'react'
import Button from './Button'

const Bodyarticle = ({ article, id }) => {
  return (
    <div
      className='border-2 m-2 p-3 rounded-md flex justify-between flex-col'
      key={id}
    >
      <div className='h-1/3 overflow-hidden'>
        <img className='' src={article.img} alt={article.title} />
      </div>
      <div className='text-xl pl-2 pb-2 border-b-2 font-bold'>{article.title}</div>
      <div className='pl-2 pt-3'>{article.content.substring(0, 125)}...</div>
      <div className='flex justify-end'>
        <Button link={`/article/${article.name}`}>Learn More</Button>
      </div>
    </div>
  )
}

export default Bodyarticle
