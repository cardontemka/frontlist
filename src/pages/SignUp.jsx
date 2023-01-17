import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import styles from "./styles/SignUp.module.css"
import logo from "./images/spotify.png"
import axios from "axios";

export const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        axios
            .post("https://backend-akf7.onrender.com/users", {
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
                setIsComplete(true)
                console.log('Something went wrong')
                console.log(error);
            })

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
                <h1 className={styles.title}>Sign Up</h1>
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