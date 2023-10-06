import React from 'react';
import Singleblog from './singleBlog';

function Bloglist({blogs}){
    return (
        <div className='blogs'>
            <Singleblog blogs={blogs} />
        </div>
    );
}

export default Bloglist;