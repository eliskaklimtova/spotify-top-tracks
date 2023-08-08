import "./App.css";
import { useState } from "react";
import { code, clientId, logIn, getAccessToken } from "./spotifyAPI";

function App() {
  console.log('App render')
  const [token, setToken] = useState();

  if (code) {
    console.log("Code is set:", code)
    const promise = getAccessToken(clientId, code)
    promise.then((token) => setToken(token));
  }

  const handleClick = () => {
    // console.log(
    //   topTracks?.map(
    //     ({name, artists}) =>
    //       `${name} by ${artists.map(artist => artist.name).join(', ')}`
    //   )
    // );
  };

  return (
    <div className="App">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Your Spotify Top Tracks</h1>
            <p className="py-6">
              Generate your top 10 Spotify tracks for the last 30 days
            </p>
            {token ? (
              <button className="btn btn-accent" onClick={handleClick}>
                Generate tracks
              </button>
            ) : (
              <button className="btn btn-success" onClick={logIn}>
                Log in with Spotify
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
