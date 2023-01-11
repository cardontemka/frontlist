import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from './styles/Home.module.css'

export const Home = () => {
    const [songs, setSongs] = useState([]);
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8287/artists')
        .then((res) => {
            setArtists(res.data);
        })
        .catch((error) => {
            console.log(error)
        })
    }, [artists])

    useEffect(() => {
        axios.get('http://localhost:8287/songs')
        .then((res) => {
            setSongs(res.data);
        })
        .catch((error) => {
            console.log(error)
        })
    }, [songs])
    return (
        <div className={styles.contain}>
            <h1>Good evening</h1>
            <div>
                {artists.map((art, index) => {
                    return (
                        <div key={index}>
                            {art.name}
                        </div>
                    )
                })}
            </div>
            <div>
                {songs.map((song, index) => {
                    return (
                        <div key={index}>
                            {song.name}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}