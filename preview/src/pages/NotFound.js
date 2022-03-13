import React from 'react'
import { Link } from 'react-router-dom'
import Body from '../components/Body'
import NotFoundImage from '../components/NotFoundImage'
import Title from '../components/Title'

const NotFound = () => {
  return (
    <Body>
      <NotFoundImage />
      <Title>NOT FOUND</Title>
      <Link to={'/'} className='text-center w-full block hover:underline'>Back to Home</Link>
    </Body>
  )
}

export default NotFound
