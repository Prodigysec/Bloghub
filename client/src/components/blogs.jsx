import React, {useState} from 'react';

function Blogs() {
    // make request to blogs endpoint
    fetch("/api/blogs", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((r) => r.json())
    .then((data) => {
        console.log(data);
    });
}
