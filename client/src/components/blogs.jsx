import React, {useEffect, useState} from 'react';
import Bloglist from './blogList';

function Blogs() {
    const [blogs, setBlogs] = useState("");

    useEffect(() => {
        // make request to blogs endpoint
        fetch("/api/posts", {
            method: "GET",
        })
        .then((res) => {
            if (res.redirected) {
                setTimeout(() => {
                    window.location.href = res.url;
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