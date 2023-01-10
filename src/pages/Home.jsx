import axios from "axios";
import { onAuthStateChanged, signOut } from "firebase/auth"
import { useContext, useEffect, useState } from "react"
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase"
import styles from './styles/Home.module.css'
import cp from './styles/CreatePlaylist.module.css'
import logo from "./images/spotify.png"
import { AiFillHome, AiOutlineCloseCircle } from "react-icons/ai";
import { BsPlusSquareFill } from "react-icons/bs";
import { BiLibrary } from "react-icons/bi";
import { RiSearchLine } from "react-icons/ri";
import { ThemeContext } from "../providers/ThemeContext";
import { Header } from "./Header";

export const Home = () => {
    const { user, setUser } = useContext(ThemeContext);
    const [isPlaylistCont, setIsPlaylistCont] = useState(false);
    const [title, setTitle] = useState('');
    const [titleAlert, setTitleAlert] = useState(false);
    const [description, setDescription] = useState('');
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        setUser({ email: localStorage.getItem('userEmail'), id: localStorage.getItem('userId') });
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8287/playlists`)
            .then(res => {
                setPlaylists(res.data);
            })
    }, [isPlaylistCont])

    const createPlaylistContainHandler = () => {
        if (user) {
            setIsPlaylistCont(!isPlaylistCont)
            setTitleAlert(false)
        }
    } 

    const createPlaylist = () => {
        axios
            .post("http://localhost:8287/playlists", {
                title: title,
                description: description,
                creator: user.id,
                // creatorId: user.uid,
                // isPrivate: false,
            })
            .then((res) => {
                setTitle('')
                setDescription('')
                setIsPlaylistCont(false)
                setTitleAlert(false)
                console.log(res);
            })
            .catch((error) => {
                console.log('errrorrrr')
                console.log(error);
                setTitleAlert(true)
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
                        <RiSearchLine />
                        <NavLink to="/" className={styles.mainBar}>Search</NavLink>
                    </p>
                    <p>
                        <BiLibrary />
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
                        if (item.creator == user.id) {
                            return <p key={index}><NavLink to={`/playlist/${item._id}`} className={styles.mainBar}>{item.title}</NavLink></p>
                        }
                    })}
                </div>
            </div>
            {/* <div className={styles.cont}>
                <div className={styles.header}>
                    {user.id ?
                        <div className={styles.buttonsCont}>
                            <div className={styles.whiteButton} onClick={handleLogout} >{isLog ? 'Log out' : user.email}</div>
                        </div>
                        :
                        <div className={styles.buttonsCont}>
                            <NavLink to="/signup" className={styles.textButton}>Sign up</NavLink>
                            <NavLink to="/login" className={styles.whiteButton}>Log in</NavLink>
                        </div>
                    }
                </div>
                <div className={styles.mainCont}>
                    {isPlaylistCont &&
                        <div className={cp.contain}>
                            <AiOutlineCloseCircle className={cp.close} onClick={createPlaylistContainHandler} />
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
                    }
                </div>
            </div> */}
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
            <Outlet />
        </main>
    )
}