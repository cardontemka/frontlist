import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Sign Up
                const user = userCredential.user;
                console.log(user);
                navigate("/");
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // ..
            })
    }
    return (
        <main>
            <section>
                <div>
                    <div>
                        <h1> FocusApp </h1>
                        <form>
                            <div>
                                <label htmlFor="email-address">Email address</label>
                                <input
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
                                    type="password"
                                    label="Create password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Password"
                                />
                            </div>


                            <button type="submit" onClick={onSubmit}>
                                Log in
                            </button>
                        </form>

                        {/* <p>
                            Already have an account? <NavLink to="/login">Sign in</NavLink>
                        </p> */}
                    </div>
                </div>  
            </section>
        </main>
    )
}