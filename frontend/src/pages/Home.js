import React from 'react'
import Body from '../components/Body'
import HeroImage from '../components/HeroImage'
import Title from '../components/Title'

const Home = () => {
  return (
    <Body>
      <Title>Home</Title>
      <HeroImage />
      <p className='text-center'>Welcome to my blog</p>
      <p className='text-center'>Happy with my contents</p>
    </Body>
  )
}

export default Home
