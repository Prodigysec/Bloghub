import React, {useState} from 'react';
import '../componentStyles/home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <header>
        <h2>Bloghub</h2>
        <nav>
          <ul>
            <Link to={`/blogsPage`}>Blogs</Link>
            <Link to={`/loginPage`}>Login</Link>
            <Link to={`/signupPage`}>SignUp</Link>
          </ul>
        </nav>
      </header>
      <p className='quote'>Express your thoughts</p>
    </div>
  )
}

export default Home;