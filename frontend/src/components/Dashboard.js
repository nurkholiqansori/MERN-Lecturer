import React from 'react'
import Body from './Body'
import Title from './Title'
import { toast } from 'react-toastify'

const Dashboard = () => {

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)
    const tempUrl = data.get('title').search(' ')
    let stringUrl
    if (tempUrl === -1) {
      stringUrl = data.get('title').toLowerCase()
    } else {
      stringUrl = data.get('title').replaceAll(' ', '-').toLowerCase()
    }
    console.log({
      title: data.get('title'),
      url: stringUrl,
      thumbnail: data.get('thumbnail'),
      content: data.get('content')
    })
  }

  return (
    <Body>
      <Title>Dashboard</Title>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer'
        onClick={() => {
          toast('Logout Success')
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          window.location.reload()
        }}
      >
        Sign Out
      </button>
      <Title>Add Article</Title>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='title-article'
            >
              Email
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='title-article'
              type='text'
              name='title'
              placeholder='Title'
              required
            />
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='content-article'
            >
              Content
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='content-article'
              type='text'
              name='content'
              placeholder='Content'
              required
            />
            <input
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer'
              value='Submit'
            />
          </div>
        </div>
      </form>
    </Body>
  )
}

export default Dashboard
