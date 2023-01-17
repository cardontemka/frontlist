import axios from "axios";
// import { onAuthStateChanged, signOut } from "firebase/auth"
// import { auth } from "../config/firebase"
import cp from './styles/CreatePlaylist.module.css'
import { useContext, useEffect, useState } from "react"
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from './styles/Menu.module.css'
import logo from "./images/spotify.png"
import { AiFillHome } from "react-icons/ai";
import { BsPlusSquareFill } from "react-icons/bs";
import { BiLibrary } from "react-icons/bi";
import { RiSearchLine } from "react-icons/ri";
import { ThemeContext } from "../providers/ThemeContext";
import { MdOutlineClose } from "react-icons/md";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { FiAlertCircle } from "react-icons/fi";

export const Menu = () => {
    const { user, setUser, noMenus } = useContext(ThemeContext);
    const [isPlaylistCont, setIsPlaylistCont] = useState(false);
    const [titleAlert, setTitleAlert] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [playlists, setPlaylists] = useState([]);
    const location = useLocation()

    useEffect(() => {
        setUser({ email: localStorage.getItem('userEmail'), id: localStorage.getItem('userId') });
    }, [user.id]);

    useEffect(() => {
        axios.get(`https://backend-akf7.onrender.com/playlists`)
            .then(res => {
                setPlaylists(res.data);
                console.log(user)
            })
    }, [isPlaylistCont])

    const createPlaylistContainHandler = () => {
        if (user.id) {
            setIsPlaylistCont(!isPlaylistCont)
            setTitleAlert(false)
        }
    }

    const createPlaylist = () => {
        axios
            .post("https://backend-akf7.onrender.com/playlists", {
                title: title,
                description: description,
                creator: user.id,
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
        <div className={styles.menu} style={{ display: location.pathname === '/login' ? "none" : location.pathname === '/signup' ? "none" : "flex" }} onClick={noMenus}>
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
                {user.id && playlists && playlists.map((item, index) => {
                    if (item.creator == user.id) {
                        return <p key={index}><NavLink to={`/playlist/${item._id}`} className={styles.mainBar}>{item.title}</NavLink></p>
                    }
                })}
            </div>
            {isPlaylistCont &&
                <div className={cp.contain}>
                    <MdOutlineClose className={cp.close} onClick={createPlaylistContainHandler} />
                    <p>Edit Details</p>
                    {!title && titleAlert && <div className={cp.alert}>
                        <FiAlertCircle className={cp.alertIcon} />
                        Playlist name is required.
                    </div>}
                    <div className={cp.inputsCont}>
                        <div className={cp.image}><IoMusicalNotesOutline /></div>
                        <div className={cp.inputs}>
                            <input
                                className={cp.inputTitle}
                                type="text"
                                label="Create title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                placeholder="Add a name"
                            />
                            <textarea
                                className={cp.inputDescription}
                                name="text"
                                aria-label="Give a description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="write something"
                                wrap="soft"
                            >
                            </textarea>
                        </div>
                    </div>
                    <div className={cp.saveButton} onClick={createPlaylist}>Save</div>
                    <p className={cp.text}>By proceeding, you disagree to give Sopoti5 access to the image you choose to upload. And spell I CUP!</p>
                </div>
            }
            <Outlet />
        </div>
    )
}