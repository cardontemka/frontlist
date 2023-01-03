import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import styles from "./styles/Login.module.css"
import logo from "./images/spotify.png"
import axios from "axios";

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8287/login", {
                email: email,
                password: password,
            })
            .then((res) => {
                console.log(res);
                // navigate("/");
            })
            .catch((error) => {
                console.log('Something went wrong')
                setIsComplete(true)
                console.log(error);
            })

        // signInWithEmailAndPassword(auth, email, password)
        //     .then((userCredential) => {
        //         // Sign Up
        //         const user = userCredential.user;
        //         console.log(user);
        //         navigate("/");
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
                        Log in
                    </button>
                </form>

                <p>
                    Don't have an account? <NavLink to="/SignUp">Sign up</NavLink>
                </p>
            </div>
        </main>
    )
}