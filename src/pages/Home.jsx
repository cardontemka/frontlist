import axios from "axios";
import { onAuthStateChanged, signOut } from "firebase/auth"
import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase"
<<<<<<< HEAD

export const Home = () => {
    const [user, setUser] = useState(null);
=======
import styles from './styles/Home.module.css'
import logo from "./images/spotify.png"
import { AiFillHome } from "react-icons/ai";
import { BsPlusSquareFill } from "react-icons/bs";


export const Home = () => {
    const [user, setUser] = useState(null);
    const [isPlaylistCont, setIsPlaylistCont] = useState(false);
>>>>>>> 93898978e1237ffb99a3d9b3f26329a73337d0c9
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

<<<<<<< HEAD
    const createPlaylist = () => {
        axios
            .post("http://localhost:8287/playlists", {
                title: "uhtahdaa sonsdg duu",
                description: "classic",
=======
    const createPlaylistContain = () => {
        setIsPlaylistCont(!isPlaylistCont)
    }

    const createPlaylist = () => {
        axios
            .post("http://localhost:8287/playlists", {
                title: "",
                description: "fgdfgfhghjhfgfdhfjkjhgffghfgj",
>>>>>>> 93898978e1237ffb99a3d9b3f26329a73337d0c9
                creatorId: user.uid,
                isPrivate: false,
            })
            .then((res) => {
<<<<<<< HEAD
                console.log('err')
                console.log(res);
            })
    }
    return (
        <div>
            <h1> Welcome to Home page </h1>
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
        </div>
=======
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
                    <h1> Sopoti5 </h1>
                    <p>®</p>
                </div>
                <div>
                    <p>
                        <AiFillHome />
                        <NavLink to="/" className={styles.mainBar}>Home</NavLink>
                    </p>
                    <p>
                        <NavLink to="/" className={styles.mainBar}>Search</NavLink>
                    </p>
                    <p>
                        <NavLink to="/" className={styles.mainBar}>Your Library</NavLink>
                    </p>
                </div>
                <div>
                    <p onClick={createPlaylistContain}>
                        <BsPlusSquareFill/>
                        <span className={styles.mainBar}>
                        Create Playlist
                        </span>
                    </p>
                </div>
                {/* <div>
                    {}
                </div> */}
            </div>
            <div className={styles.cont}>
                <div className={styles.header}>
                    <div className={styles.backButton}> Back </div>
                    <div className={styles.buttonsCont}>
                        <NavLink to="/signup" className={styles.textButton}>Sign up</NavLink>
                        <NavLink to="/login" className={styles.whiteButton}>Log in</NavLink>
                    </div>
                </div>
                <div className={styles.mainCont} style={{"display": isPlaylistCont ? "flex" : "none"}}>
                    <div className={styles.createPlaylistCont}>
                        <p>Title</p>
                        <input className={styles.createPlaylistInput}/>
                        <p>discription</p>
                        <input className={styles.createPlaylistInput}/>
                        <p className={styles.createPlaylistButton}>Create</p>
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
>>>>>>> 93898978e1237ffb99a3d9b3f26329a73337d0c9
    )
}