import "./App.css";
import { useState, useEffect } from "react";
import {
  code,
  clientId,
  logIn,
  getAccessToken,
  getTopTracks,
} from "./spotifyAPI";

function App() {
  const [token, setToken] = useState();
  const [tracks, setTracks] = useState();

  useEffect(() => {
    if (code) {
      const promise = getAccessToken(clientId, code);
      promise.then((token) => setToken(token));
    }
  }, []);

  const handleClick = () => {
    getTopTracks(token).then((tracks) => setTracks(tracks));
  };

  return (
    <div className="App">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center w-full">
          <div>
            <h1 className="text-5xl font-bold">Your Spotify Top Tracks</h1>
            <p className="py-6">
              Generate your top 10 Spotify tracks for the last 30 days
            </p>
            {token ? (
              <button className="btn btn-primary" onClick={handleClick}>
                Generate top tracks
              </button>
            ) : (
              <button className="btn btn-success" onClick={logIn}>
                Log in with Spotify
              </button>
            )}
            {tracks && (
              <div className="pt-10 prose text-center">
                <h2>Your top tracks for the last 30 days:</h2>
                {tracks?.map(({ name, artists }) => (
                  <h3>
                    {name} by {artists.map((artist) => artist.name).join(", ")}
                  </h3>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
