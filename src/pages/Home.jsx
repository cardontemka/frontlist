import axios from "axios";
import { onAuthStateChanged, signOut } from "firebase/auth"
import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase"
import styles from './styles/Home.module.css'
import cp from './styles/CreatePlaylist.module.css'
import logo from "./images/spotify.png"
import { AiFillHome, AiOutlineCloseCircle } from "react-icons/ai";
import { BsPlusSquareFill } from "react-icons/bs";


export const Home = () => {
    const [user, setUser] = useState(null);
    const [isPlaylistCont, setIsPlaylistCont] = useState(false);
    const [title, setTitle] = useState('');
    const [titleAlert, setTitleAlert] = useState(false);
    const [description, setDescription] = useState('');
    const [playlists, setPlaylists] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
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

    useEffect(() => {
        axios.get("http://localhost:8287/playlists")
            .then(res => {
                setPlaylists(res.data);
            })
    })

    const createPlaylistContainHandler = () => {
        setIsPlaylistCont(!isPlaylistCont)
        setTitleAlert(false)
    }

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                navigate('/');
                console.log('Signed out successfully');
            })
            .catch((error) => {
                console.log(error);
                // An error happened
            })
    }

    const createPlaylist = () => {
        if (title) {
            setTitle('')
            setDescription('')
            setIsPlaylistCont(false)
            setTitleAlert(false)
            axios
            .post("http://localhost:8287/playlists", {
                title: title,
                description: description,
                // creatorId: user.uid,
                // isPrivate: false,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log('errrorrrr')
                console.log(error);
            })
        } else {
            setTitleAlert(true)
        }
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
                    <p onClick={createPlaylistContainHandler}>
                        <BsPlusSquareFill />
                        <span className={styles.mainBar}>
                            Create Playlist
                        </span>
                    </p>
                </div>
                <div>
                    {playlists && playlists.map((item, index) => {
                        return <p key={index} className={styles.mainBar}>{item.title}</p>
                    })}
                </div>
            </div>
            <div className={styles.cont}>
                <div className={styles.header}>
                    <div className={styles.backButton}> Back </div>
                    <div className={styles.buttonsCont}>
                        <NavLink to="/signup" className={styles.textButton}>Sign up</NavLink>
                        <NavLink to="/login" className={styles.whiteButton}>Log in</NavLink>
                    </div>
                </div>
                <div className={styles.mainCont}>
                    <div className={cp.contain} style={{ "display": isPlaylistCont ? "flex" : "none" }}>
                        <AiOutlineCloseCircle className={cp.close} onClick={createPlaylistContainHandler}/>
                        <p>Title</p>
                        <input
                            className={cp.input}
                            type="text"
                            label="Create title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="You should give a cool title"
                        />
                        {!title && titleAlert && <div className={cp.alert}>Please enter a title!</div>}
                        <p>description</p>
                        <input
                            className={cp.input}
                            type="text"
                            label="Give a description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="write something"
                        />
                        <div className={cp.createButton} onClick={createPlaylist}>Create</div>
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