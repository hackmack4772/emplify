// src/components/MusicPlayer.js
import React, { useEffect, useState } from 'react';
import Playlist from '../models/Playlist';
import './MusicPlayer.css';

const MusicPlayer = () => {
    const [playlist] = useState(new Playlist());
    const [currentSong, setCurrentSong] = useState(null);
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [playlistDisplay, setPlaylistDisplay] = useState([]);

    const handleAddSong = () => {
        if (title && artist) {
            playlist.addSong({ title, artist });
            setTitle('');
            setArtist('');
            updatePlaylistDisplay();
        }
    };

    const handleRemoveSong = () => {
        if (title){
            playlist.removeSong(title);
            setTitle('');
            updatePlaylistDisplay();
        } 
        
    };

    const handlePlayNext = () => {
        const nextSong = playlist.playNext();
        
        setCurrentSong(nextSong);
    };

    const handlePlayPrevious = () => {
        const prevSong = playlist.playPrevious();
        console.log(prevSong);

        setCurrentSong(prevSong);
    };

    const handleSearch = () => {
        const song = playlist.searchSong(searchTerm);
        if (song) {
            alert(`Found: ${song.title} by ${song.artist}`);
        } else {
            alert('Song not found!');
        }
        setSearchTerm('');
    };

    const updatePlaylistDisplay = () => {
        setPlaylistDisplay(playlist.displayPlaylist());
    };

    return (
        <div className="music-player">
            <h1>Music Player</h1>
            <div className="input-section">
                <input
                    type="text"
                    placeholder="Song Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Artist"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                />
                <button onClick={handleAddSong}>Add Song</button>
                <button onClick={handleRemoveSong}>Remove Song</button>
            </div>
            <div className="controls">
                <button onClick={handlePlayPrevious}>Previous</button>
                <button onClick={handlePlayNext}>Next</button>
            </div>
            <div className="search-section">
                <input
                    type="text"
                    placeholder="Search Song"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            {currentSong && (
                <div className="now-playing">
                    <h2>Now Playing</h2>
                    <p>{`${currentSong.title} by ${currentSong.artist}`}</p>
                </div>
            )}
            <h2>Playlist</h2>
            <ul>
                {playlistDisplay.map((song, index) => (
                    <li key={index} className={currentSong && currentSong.title === song ? 'active-song' : ''}>
                        {song}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MusicPlayer;
