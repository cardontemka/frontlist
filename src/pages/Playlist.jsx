import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './styles/Playlist.module.css'
import cp from './styles/CreatePlaylist.module.css'
import del from './styles/DeleteCont.module.css'
import { IoMusicalNotesOutline } from "react-icons/io5";
import { FiClock } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import { ThemeContext } from '../providers/ThemeContext';

export const Playlist = () => {
    const { isPlaylistMenu, setIsPlaylistMenu, noMenus } = useContext(ThemeContext);
    const { id } = useParams()
    const [playlist, setPlaylist] = useState({})
    // const [isPlaylistMenu, setIsPlaylistMenu] = useState(false)
    const [songs, setSong] = useState([])
    const [isPlaylistCont, setIsPlaylistCont] = useState(false)
    const [titleAlert, setTitleAlert] = useState(false)
    const [deleteVal, setDeleteVal] = useState('')
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://backend-akf7.onrender.com/playlists/${id}`)
            .then(res => {
                setPlaylist(res.data);
                setSong(res.data.songs);
                setTitle(res.data.title);
                setDescription(res.data.description);
            })
            .catch((error) => {
                navigate(-1);
            })
    }, [id, title, description, deleteVal])

    const menuContain = () => {
        setIsPlaylistMenu(props => !props);
    }

    const editPlaylistContainHandler = () => {
        setIsPlaylistCont(!isPlaylistCont)
        setTitleAlert(false)
    }

    const updatePlaylist = () => {
        axios
            .put(`https://backend-akf7.onrender.com/playlist/${id}`, {
                title: title,
                description: description,
            })
            .then((res) => {
                setTitle('')
                setDescription('')
                setIsPlaylistCont(false)
                setTitleAlert(false)
            })
            .catch((error) => {
                console.log('errrorrrr')
                console.log(error);
                setTitleAlert(true)
            })
    }

    const deletePlaylist = () => {
        axios
            .delete(`https://backend-akf7.onrender.com/playlist/${id}`)
            .then(() => {
                navigate(-1);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const removeSong = () => {
        axios
            .put(`https://backend-akf7.onrender.com/playlist/delete/${id}`, {
                remove: deleteVal
            })
            .then(() => {
                setDeleteVal('')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const deleteContainHandler = (songId) => {
        setDeleteVal(songId);
    }
    return (
        <div className={styles.contain} onClick={noMenus}>
            <div className={styles.header}>
                <div className={styles.avatar}>
                    <IoMusicalNotesOutline />
                </div>
                <div className={styles.textCont}>
                    <p className={styles.text}>PLAYLIST</p>
                    <div className={styles.title}>{playlist.title}</div>
                    {description && <p>description</p>}
                    <p>{playlist.description}</p>
                </div>
            </div>
            <div className={styles.songsCont}>
                <p className={styles.menuButton} onClick={menuContain}>...</p>
                <div className={styles.menu} style={{ display: isPlaylistMenu ? "flex" : "none" }}>
                    <div className={styles.menuBar} onClick={editPlaylistContainHandler}>Edit details</div>
                    <div className={styles.menuBar} onClick={deletePlaylist}>Delete</div>
                </div>
                <div className={styles.titles}>
                    <span className={styles.songTitle} style={{ marginLeft: "1%" }}>#</span>
                    <span className={styles.songTitle} style={{ marginLeft: "3%" }}>TITLE</span>
                    <span className={styles.songTitle} style={{ marginLeft: "40%" }}>ALBUM</span>
                    <span className={styles.songTitle} style={{ marginLeft: "20%" }}>DATE ADDED</span>
                    <FiClock className={styles.songTitle} style={{ marginLeft: "16%" }} />
                </div>
                <div className={styles.line}></div>
                {songs && songs.map((song, index) => {
                    return (
                        <div key={index} className={styles.song}>
                            <span className={styles.songTitle} style={{ marginLeft: "1%", width: "3%" }}>{index + 1}</span>
                            <div className={styles.songImage} >{song.image ? song.image : song.artist[0].image ? <img src={song.artist[0].image} className={styles.image} /> : <span>?</span>}</div>
                            <div className={styles.songNameAndArtist}>
                                <p className={styles.songName} style={{ marginLeft: "2%" }}>{song.name}</p>
                                <p className={styles.songTitle} style={{ marginLeft: "2%" }}>{song.artist[0].name}</p>
                            </div>
                            <span className={styles.songTitle} style={{ width: "24%" }}>{song.album ? song.album : 'No Album'}</span>
                            <span className={styles.songTitle} style={{ width: "20%" }}>{song.createdAt}</span>
                            <span className={styles.songTitle} style={{ width: "5%" }}>{song.duration ? song.duration : 'NaN'}</span>
                            <span className={styles.songDelete} onClick={() => deleteContainHandler(song._id)}>Delete</span>
                        </div>
                    )
                })}
            </div>
            {isPlaylistCont &&
                <div className={cp.contain}>
                    <MdOutlineClose className={cp.close} onClick={editPlaylistContainHandler} />
                    <p>Edit Details</p>
                    {!title && titleAlert && <div className={cp.alert}>Playlist name is required.</div>}
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
                    <div className={cp.saveButton} onClick={updatePlaylist}>Save</div>
                    <p className={cp.text}>By proceeding, you disagree to give Sopoti5 access to the image you choose to upload. And spell I CUP!</p>
                </div>
            }
            {deleteVal &&
                <div className={del.contain}>
                    <div className={del.title}>Delete from Library?</div>
                    <div className={del.buttonsCont}>
                        <div className={del.textButton} onClick={() => setDeleteVal('')}>Cancel</div>
                        <div className={del.greenButton} onClick={removeSong}>Delete</div>
                    </div>
                </div>
            }
        </div>
    )
}