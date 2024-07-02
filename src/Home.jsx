import React, { useState, useRef, useEffect } from 'react';
import YouTube from 'react-youtube';
import './App.css';
import Header from './Header';

function Home() {
  const [mediaUrl, setMediaUrl] = useState('');
  const [subtitleList, setSubtitleList] = useState([]);
  const [currentSubtitle, setCurrentSubtitle] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [videoPlayer, setVideoPlayer] = useState(null);
  const mediaRef = useRef(null);

  const appendSubtitle = () => {
    if (currentSubtitle && currentTime) {
      setSubtitleList([...subtitleList, { text: currentSubtitle, time: parseFloat(currentTime) }]);
      setCurrentSubtitle('');
      setCurrentTime('');
    } else {
      setAlertMessage('please write something');
    }
  };

  const handleYouTubeProgress = () => {
    if (videoPlayer) {
      const currentMediaTime = videoPlayer.getCurrentTime();
      showSubtitle(currentMediaTime);
    }
  };

  const handleMediaProgress = () => {
    if (mediaRef.current) {
      const currentMediaTime = mediaRef.current.currentTime;
      showSubtitle(currentMediaTime);
    }
  };

  const showSubtitle = (currentMediaTime) => {
    const subtitle = subtitleList.find(sub => Math.floor(currentMediaTime) === Math.floor(sub.time));
    const subtitleElement = document.getElementById('caption');
    if (subtitleElement) {
      if (subtitle) {
        subtitleElement.innerText = subtitle.text;
        subtitleElement.style.display = 'block';
      } else {
        subtitleElement.style.display = 'none';
      }
    }
  };

  const extractYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|watch\?.+&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoOptions = {
    playerVars: {
      autoplay: 0,
    },
  };

  useEffect(() => {
    if (videoPlayer) {
      const interval = setInterval(handleYouTubeProgress, 500);
      return () => clearInterval(interval);
    }
  }, [videoPlayer, subtitleList]);

  useEffect(() => {
    if (mediaRef.current) {
      const interval = setInterval(handleMediaProgress, 500);
      return () => clearInterval(interval);
    }
  }, [mediaRef, subtitleList]);

  const isYouTubeLink = extractYouTubeVideoId(mediaUrl);

  return (
    <>
    <Header/>
    <div className="home">
      <main className='home-body'>
        <div className='VideoUrl'>
          <p>Enter the URL:</p>
          <input 
            type="text" 
            placeholder="Paste the URL "
            value={mediaUrl} 
            onChange={(e) => {
              setMediaUrl(e.target.value);
              setAlertMessage('');
              setSubtitleList([]);
            }} 
          />
        </div>
      
        {mediaUrl && (
          <div className="video-container">
            {isYouTubeLink ? (
              <YouTube
                videoId={extractYouTubeVideoId(mediaUrl)}
                opts={videoOptions}
                onReady={(event) => setVideoPlayer(event.target)}
              />
            ) : (
              <video 
                ref={mediaRef}
                src={mediaUrl}
                controls 
                onTimeUpdate={handleMediaProgress}
                onError={() => setAlertMessage('Unable to load video. wrong url')}
                width="700"
                height="400"
              />
            )}
            <div id="caption" className="caption"></div>
          </div>
        )}
        {mediaUrl && (
          <>
            <div className="caption-inputs">
              <input 
                type="text" 
                placeholder="Caption text"
                value={currentSubtitle} 
                onChange={(e) => setCurrentSubtitle(e.target.value)} 
              />
              <input 
                type="number" 
                placeholder="Timestamp (seconds)"
                value={currentTime} 
                onChange={(e) => setCurrentTime(e.target.value)} 
              />
            </div>
            <button onClick={appendSubtitle}>Add Caption</button>
          </>
        )}
        {alertMessage && <div className="error">{alertMessage}</div>}
      </main>
    </div>
    </>
  );
}

export default Home;
