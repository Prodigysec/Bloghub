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
        <Route path='/signupPage' element={<Signup/> } />
        <Route path='/loginPage' element={<Signin/> } />
        <Route path='/blogsPage' element={<Blogs/> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
