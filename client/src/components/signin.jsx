import React, {useState} from 'react';

// build signin component
function Signin(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(event) {
        // prevent the form from reloading the page
        event.preventDefault();

        // send a fetch to /api/login
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password}),
        })
        // handle the response
        .then((r) => r.json())
        //display the response to user interface
        .then((data) => {
            setMessage(data.message);
            // redirect to blogs page
            if (data.message === "Login successful") {
                // redirect to blogs page after 2 seconds
                setTimeout(() => {
                    window.location.href = "/blogs";
                }, 2000);
            } else {
                setError(data.error);
            }
        });
    }

    return (
        <div>
            {error ? <h3 style={{color: "red"}}>{error}</h3> : <h3 style={{color: "green"}}>{message}</h3>}
            <h2>Signin with Username.</h2>
            <p>Don't have an account? <a href="/signupPage">Create account</a></p>
            <p>Enter your Username and<br />password to sign in to your account.</p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="Username">username: </label>
                <input
                    type="text"
                    id="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <br />
                <label htmlFor="password">Password: </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <br />
                <input type="submit" value="Submit"></input>

            </form>
        </div>
    )
}

export default Signin;