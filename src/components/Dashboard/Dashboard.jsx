import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import './Dashboard.scss';
import SpotifyWebApi from 'spotify-web-api-node';

import TrackSearchResult from './../TrackSearchResult/TrackSearchResult';
import Player from './../Player/Player';

const spotifyApi = new SpotifyWebApi({
  clientId: 'a8678af604254b67851f30f651cfccf4',
});

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState('');

  const chooseTrack = (track) => {
    setPlayingTrack(track);
    setSearch('');
    setLyrics('');
  };

  useEffect(() => {
    if (!playingTrack) return;

    axios
      .get('http://localhost:3001/lyrics', {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then((res) => {
        setLyrics(res.data.data.lyrics);
      });
  }, [playingTrack]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, currentImage) => {
              if (currentImage.height < smallest.height) {
                return currentImage;
              } else {
                return smallest;
              }
            },
            track.album.images[0]
          );
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <div className="search-container">
      <form className="search-form">
        <input
          className="song-search-input"
          type="search"
          placeholder="search Songs/Artists"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <div className="content-container">
        {searchResults.map((track) => {
          return (
            <TrackSearchResult
              track={track}
              key={track.uri}
              chooseTrack={chooseTrack}
            />
          );
        })}
        {search.length === 0 && (
          <div className="lyrics-container">{lyrics}</div>
        )}
      </div>
      <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </div>
  );
};

export default Dashboard;
