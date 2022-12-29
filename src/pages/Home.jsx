import axios from "axios";
import { onAuthStateChanged, signOut } from "firebase/auth"
import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase"
import styles from './styles/Home.module.css'
import logo from "./images/spotify.png"

export const Home = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                navigate('/');
                console.log('Signed out successfully');
            })
            .catch((error) => {
                // An error happened
            })
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log(user);
            if (user) {
                setUser(user)

                const uid = user.uid;
                console.log(uid);
            } else {
                setUser(null)
                console.log('user is logged out');
            }
        })
    }, []);

    const createPlaylist = () => {
        axios
            .post("http://localhost:8287/playlists", {
                title: "Fataa",
                description: "dhasghfjkgsag",
                creatorId: user.uid,
                isPrivate: false,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log('errrorrrr')
                console.log(error);
            })
    }
    return (
        <main>
            <div className={styles.menu}>
                <div className={styles.spotify}>
                    <img src={logo}></img>
                    <h1> Spotify </h1>
                    <p>®</p>
                </div>
                <div>
                    <p>
                    <NavLink to="/">Home</NavLink>
                    </p>
                    <p>
                    <NavLink to="/">Search</NavLink>
                    </p>
                    <p>
                    <NavLink to="/">Your Library</NavLink>
                    </p>
                </div>
            </div>
            <div className={styles.contain}>
                <div className={styles.header}>
                    <div className={styles.backButton}> Back </div>
                    <div className={styles.buttonsContain}>
                        <div className={styles.textButton}>Sign up</div>
                        <div className={styles.whiteButton}>Log in</div>
                    </div>
                </div>
            </div>
            {/* <div>
                {user && <p>{user.email}</p>}
                <div>
                    <button onClick={handleLogout}>Log out</button>
                    <button onClick={createPlaylist}>Create Playlist</button>
                </div>
                <button>
                    <NavLink to="/signup">Sign up</NavLink>
                </button>
                <button>
                    <NavLink to="/login">Log in</NavLink>
                </button>
            </div> */}
        </main>
    )
}