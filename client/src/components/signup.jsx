import React, {useState} from 'react';

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    
    function handleSubmit(event) {
        // prevent the form from reloading the page
        event.preventDefault();

        // check if values are empty
        if (username === "" || email === "" || password === "" || bio === "") {
            setError("Please fill in all fields");
            return;
        }

        // Password must be at least 8 characters
        if (password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }

    
        fetch("/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, email, password, bio}),
        })
        .then((r) => r.json())
        .then((data) => {
            setMessage(data.message);
            if (data.message === "User created") {
                // redirect to login page after 2 seconds
                setTimeout(() => {
                    window.location.href = "/signin";
                }, 2000);
            } else {
                setError(data.error);
            }
        });
    }

    return (
        <div>
            {error ? <h3 style={{color: "red"}}>{error}</h3> : <h3 style={{color: "green"}}>{message}</h3>}
            <h2>Join Bloghub</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <br />
                <label htmlFor="email">Email: </label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
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
                <label htmlFor="bio">Bio: </label>
                <input
                    type="text"
                    id="bio"
                    value={bio}
                    onChange={(event) => setBio(event.target.value)}
                />
                <br />
                <input type="submit" value="Sign Up" />
            </form>
        </div>
    );
}

export default Signup;