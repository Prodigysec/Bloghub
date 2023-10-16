import React, {useEffect, useState} from 'react';
import Bloglist from './blogList';
import { useNavigate } from 'react-router-dom';

function Blogs() {
    const [blogs, setBlogs] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // make request to blogs endpoint
        fetch("/posts", {
            method: "GET",
        })
        .then((res) => {
            if (res.redirected) {
                setTimeout(() => {
                    navigate('/loginPage');
                }, 2000);
            } else {
                return res.json();
            }
        })
        .then((data) => {
            setBlogs(data);

        });
    }, []);

    return (
        <div>
            <h1>Blogs</h1>
            <Bloglist blogs={blogs} />
        </div>
    );
}

export default Blogs;