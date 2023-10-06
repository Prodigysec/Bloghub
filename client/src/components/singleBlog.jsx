import React from "react";
import '../componentStyles/styles.css';

function Singleblog({ blogs }) {
    return (
        <div>
            {blogs &&
                blogs.map((blog) => {
                    return (
                        <div key={blog.id} className="blog_container">
                            <h2 className="blog_title">{blog.title}</h2>
                            <p className="blog_body">{blog.body}</p>
                            <p className="blog_username">{blog.user.username}</p>
                        </div>
                    );
                })}
        </div>
    );
}

export default Singleblog;