import React from 'react'
import Body from '../components/Body'
import Title from '../components/Title'
import axios from 'axios'
import { toast } from 'react-toastify'

const SignIn = () => {
    const handleSubmit = (e) => {
      e.preventDefault()
      const form = e.target
      const data = new FormData(form)
      axios
        .post('http://localhost:8000/api/signin', {
          email: data.get('email'),
          password: data.get('password'),
        })
        .then((res) => {
          if (res.status === 200) {
            toast.success('Login Success')
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user', JSON.stringify(res.data.result))
            window.location.reload()
          }
        })
        .catch((err) => {
          toast.error('Login Failed')
        })
    }

  return (
    <Body>
      <Title>Credential</Title>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='grid-first-name'
            >
              Email
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='grid-first-name'
              type='text'
              name='email'
              placeholder='Your Email'
              required
            />
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='grid-last-name'
            >
              Password
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='grid-last-name'
              type='password'
              name='password'
              placeholder='Your Password'
              required
            />
            <input
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer'
              value='Sign In'
            />
          </div>
        </div>
      </form>
    </Body>
  )
}

export default SignIn
