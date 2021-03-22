import React from 'react';
import './TrackSearchResult.scss';

const TrackSearchResult = ({ track, chooseTrack }) => {
  const handlePlay = () => {
    chooseTrack(track);
  };

  return (
    <div className="track-container" onClick={handlePlay}>
      <img src={track.albumUrl} alt={track.title} />
      <div className="track-info">
        <div className="title">{track.title}</div>
        <div className="artist">{track.artist}</div>
      </div>
    </div>
  );
};

export default TrackSearchResult;
