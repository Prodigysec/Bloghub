import React, { useState } from 'react'
import Signup from './components/signup'
import Signin from './components/signin'
import Blogs from './components/blogs'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/> } />
        <Route path='/signup' element={<Signup/> } />
        <Route path='/login' element={<Signin/> } />
        <Route path='/blogs' element={<Blogs/> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
