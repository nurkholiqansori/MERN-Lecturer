import React from 'react'
import Dashboard from '../components/Dashboard'
import SignIn from '../components/SignIn'

const Credential = () => {
  const hasToken = localStorage.getItem('token')
  if (hasToken) return <Dashboard />

  return <SignIn />
}

export default Credential
