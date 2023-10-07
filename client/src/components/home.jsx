import React, {useState} from 'react';
import '../componentStyles/home.css';

function Home() {
  return (
    <div>
      <header>
        <h2>Bloghub</h2>
        <nav>
          <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/blogs">Blogs</a></li>
            <li><a href="/signup">SignUp</a></li>
          </ul>
        </nav>
      </header>
      <p className='quote'>Express your thoughts</p>
    </div>
  )
}

export default Home;