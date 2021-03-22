import React from 'react';
import './Login.scss';

const AUTH_URL =
  'https://accounts.spotify.com/authorize?client_id=a8678af604254b67851f30f651cfccf4&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';

const Login = () => {
  return (
    <div className="login-btn-container">
      <a className="login-btn" href={AUTH_URL}>
        Log in With Spotify
      </a>
    </div>
  );
};

export default Login;
