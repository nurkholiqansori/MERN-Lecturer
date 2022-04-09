import Home from './pages/Home'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import About from './pages/About'
import Articles from './pages/Articles'
import Article from './pages/Article'
import Navbar from './components/Navbar'
import NotFound from './pages/NotFound'
import Credential from './pages/Credential'
 import { ToastContainer } from 'react-toastify'
 import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <Router>
      <Navbar />
      <div className='max-w-screen-md mx-auto pt-20'>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/articles' element={<Articles />} />
          <Route exact path='/credential' element={<Credential />} />
          <Route exact path='/article/:title' element={<Article />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  )
}

export default App
