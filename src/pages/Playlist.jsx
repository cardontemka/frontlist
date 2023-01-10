import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Header } from './Header'
import styles from './styles/Playlist.module.css'

export const Playlist = () => {
    const { id } = useParams()
    const [playlist, setPlaylist] = useState({})
    const [songs, setSong] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8287/playlists/' + id)
            .then(res => {
                setPlaylist(res.data);
                setSong(res.data.songs);
            })
    }, [id])
    return (
        <div className={styles.contain}>
            <Header/>
            <div className={styles.header}>
                <p>PLAYLIST NAME</p>
                <h1>{playlist.title}</h1>
                <p>description</p>
                <p>{playlist.description}</p>
            </div>
            <div>
                {songs.map((song, index) => {
                    return <p key={index}>{song.name}</p>
                })}
            </div>
        </div>
    )
}