import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

const Player = ({ accessToken, trackUri }) => {
  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [trackUri]);

  const stopPlaying = (state) => {
    if (!state.isPlaying) {
      setPlay(false);
    }
  };

  if (!accessToken) return null;
  return (
    <SpotifyPlayer
      callback={stopPlaying}
      play={play}
      token={accessToken}
      showSaveIcon
      uris={trackUri ? [trackUri] : []}
    />
  );
};

export default Player;
