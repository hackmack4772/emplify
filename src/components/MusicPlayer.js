import React, { useState, useEffect, useRef } from 'react';
import DoublyCircularLinkedList from '../models/DoublyCircularLinkedList';
import './MusicPlayer.css'; // Import your CSS file here
const playlist = new DoublyCircularLinkedList();

const MusicPlayer = () => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);


  // Initialize the playlist
  useEffect(() => {
    playlist.append({ title: "Song 1", artist: "Artist 1", songUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" });
    playlist.append({ title: "Song 2", artist: "Artist 2", songUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" });
    playlist.append({ title: "Song 3", artist: "Artist 3", songUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" });
    
    setCurrentSong(playlist.head);
  }, []);

  // Play or pause the current song
  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Play the next song
  const handleNext = () => {
    playlist.playNext();
    setCurrentSong(playlist.current);
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  // Play the previous song
  const handlePrevious = () => {
    playlist.playPrevious();
    setCurrentSong(playlist.current);
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  // Volume control
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  // Update progress bar as the song plays
  const updateProgress = () => {
    const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(progress);
  };

  return (
    <div className="music-player">
      <h2>Music Player</h2>
      {currentSong && (
        <div className="current-song">
          <h3>Now Playing: {currentSong.data.title}</h3>
          <p>Artist: {currentSong.data.artist}</p>
        </div>
      )}

     { currentSong && <audio
        ref={audioRef}
        src={currentSong?.data.songUrl}
        onTimeUpdate={updateProgress}
        onEnded={handleNext} // Automatically play next when current song ends
      />}

      <div className="controls">
        <button onClick={handlePrevious} className="control-button">Previous</button>
        <button onClick={handlePlayPause} className="control-button">{isPlaying ? "Pause" : "Play"}</button>
        <button onClick={handleNext} className="control-button">Next</button>
      </div>

      <div className="volume-control">
        <label>Volume: </label>
        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} />
      </div>

      <div className="progress-bar">
        <input 
          type="range" 
          min="0" 
          max="100" 
          step="1" 
          value={progress} 
          onChange={(e) => (audioRef.current.currentTime = (e.target.value / 100) * audioRef.current.duration)} 
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
