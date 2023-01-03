import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import styles from "./styles/SignUp.module.css"
import logo from "./images/spotify.png"
import axios from "axios";

export const SignUp = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();

        if (email && username && password.length >= 8) {
            axios
                .post("http://localhost:8287/users", {
                    username: username,
                    email: email,
                    password: password,
                    // creatorId: user.uid,
                    // isPrivate: false,
                })
                .then((res) => {
                    navigate("/login");
                    console.log(res);
                })
                .catch((error) => {
                    console.log('Something went wrong')
                    console.log(error);
                })
        } else {
            setIsComplete(true)
        }

        // createUserWithEmailAndPassword(auth, email, password)
        //     .then((userCredential) => {
        //         // Sign Up
        //         const user = userCredential.user;
        //         console.log(user);
        //         navigate("/login");
        //         // ...
        //     })
        //     .catch((error) => {
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         console.log(errorCode, errorMessage);
        //         // ..
        //     })
    }
    return (
        <main className={styles.page}>
            <div className={styles.contain}>
                <div className={styles.spotify}>
                    <img src={logo}></img>
                    <h1> Sopoti5 </h1>
                    <p>®</p>
                </div>
                {isComplete && <p className={styles.alert}>Something went wrong</p>}
                <form>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input
                            className={styles.input}
                            type="text"
                            label="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Username"
                        />
                    </div>

                    <div>
                        <label htmlFor="email-address">Email address</label>
                        <input
                            className={styles.input}
                            type="email"
                            label="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Email"
                        />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            className={styles.input}
                            type="password"
                            label="Create password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Password"
                        />
                    </div>


                    <button type="submit" onClick={onSubmit} className={styles.button}>
                        Sign up
                    </button>
                </form>

                <p>
                    Already have an account? <NavLink to="/login">Sign in</NavLink>
                </p>
            </div>
        </main>
    )
}