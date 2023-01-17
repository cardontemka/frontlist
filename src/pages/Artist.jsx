import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ThemeContext } from "../providers/ThemeContext";
import styles from "./styles/Artist.module.css"

export const Artist = () => {
    const { user, setIsPlaylistMenu, isPlaylistMenu, noMenus } = useContext(ThemeContext);
    const { id } = useParams()
    const [artist, setArtist] = useState({})
    const [songs, setSongs] = useState([])
    const [playlists, setPlaylists] = useState([])
    const [songId, setSongId] = useState()
    const navigate = useNavigate();
    let listNumb = 0

    useEffect(() => {
        axios.get(`https://backend-akf7.onrender.com/artists/${id}`)
            .then(res => {
                setArtist(res.data);
                // setSongs(res.data.songs);
            })
            .catch((error) => {
                navigate(-1);
            })
        axios.get('https://backend-akf7.onrender.com/songs')
            .then(res => {
                setSongs(res.data)
            })
        axios.get('https://backend-akf7.onrender.com/playlists')
            .then(res => {
                setPlaylists(res.data)
            })
    }, [id])

    const menuContain = (id) => {
        setIsPlaylistMenu(!isPlaylistMenu);
        setSongId(id)
    }

    const addSongToPlaylist = (playlistId) => {
        axios.put(`https://backend-akf7.onrender.com/playlists/${playlistId}`, {
            id: songId,
        })
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div className={styles.contain} onClick={noMenus}>
            <div className={styles.header} style={artist.image ? { backgroundImage: `url(${artist.image})` } : { backgroundColor: "rgb(50, 50, 50)" }}>
                <div className={styles.title}>{artist.name}</div>
            </div>
            <div className={styles.songsCont}>
                <p className={styles.menuButton} onClick={menuContain}>...</p>
                {songs.map(song => {
                    if (song.artist[0]._id == id) {
                        listNumb++
                        return (
                            <div key={listNumb} className={styles.song}>
                                <span className={styles.songTitle} style={{ marginLeft: "1%", width: "3%" }}>{listNumb}</span>
                                <div className={styles.songImage} >{song.image ? song.image : song.artist[0].image ? <img src={song.artist[0].image} className={styles.image} /> : <span>?</span>}</div>
                                <span className={styles.songName} style={{ width: "40%" }}>{song.name}</span>
                                <span className={styles.songTitle} style={{ width: "24%" }}>{song.album ? song.album : 'No Album'}</span>
                                <span className={styles.songTitle} style={{ width: "20%" }}>{song.createdAt}</span>
                                <span className={styles.songTitle} style={{ width: "5%" }}>{song.duration ? song.duration : 'NaN'}</span>
                                <div className={styles.songMenu} onClick={() => menuContain(song._id)}>•••
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
            {isPlaylistMenu &&
                <div className={styles.menu}>
                    {playlists.map((list, index) => {
                        if (list.creator == user.id) {
                            return <div key={index} className={styles.menuBar} onClick={() => addSongToPlaylist(list._id)}>{list.title}</div>
                        }
                    })}
                </div>
            }
        </div>
    )
}