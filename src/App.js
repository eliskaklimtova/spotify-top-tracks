import "./App.css";
import { useState, useEffect } from "react";
import {
  code,
  clientId,
  logIn,
  getAccessToken,
  getRecommendations,
  getTopTracks,
} from "./spotifyAPI";

function App() {
  const [token, setToken] = useState();
  const [tracks, setTracks] = useState();
  const [recommendations, setRecommendations] = useState();

  let artistIds = [];
  let trackIds = [];

  useEffect(() => {
    let localStorageToken = localStorage.getItem("token");
    if (code) {
      if (localStorageToken) {
        setToken(localStorageToken);
      } else {
        getAccessToken(clientId, code).then((token) => {
          localStorage.setItem("token", token);
          setToken(token);
        });
      }
    } else {
      if (localStorageToken) setToken(localStorageToken)
    }
  }, []);

  const handleTracks = async () => {
    let topTracks = await getTopTracks(token);
    setTracks(topTracks);
  };

  const handleRecommendations = async () => {
    tracks.map((track) => trackIds.push(track.id));
    trackIds = trackIds.slice(0, 3).join(",");

    tracks.map((track) => artistIds.push(track.artists[0].id));
    artistIds = artistIds.slice(0, 2).join(",");

    artistIds = encodeURIComponent(artistIds);
    trackIds = encodeURIComponent(trackIds);

    let recommendedTracks = await getRecommendations(
      token,
      artistIds,
      trackIds
    );

    setRecommendations(recommendedTracks);
  };

  if (code && !token) {
    return null;
  }

  return (
    <div className="App">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center w-full">
          <div>
            <h1 className="text-5xl font-bold">Your Spotify Top Tracks</h1>
            <p className="py-6 text-lg">
              Generate your top 10 Spotify tracks for the last 30 days
            </p>
            {!tracks &&
              (token ? (
                <button className="btn btn-primary" onClick={handleTracks}>
                  Generate top tracks
                </button>
              ) : (
                <button className="btn btn-success" onClick={logIn}>
                  Log in with Spotify
                </button>
              ))}

            {tracks && (
              <div className="pt-10 prose text-center">
                <h2>Your top tracks for the last 30 days</h2>
                <ol className="flex flex-col items-center text-lg font-medium">
                  {tracks?.map(({ name, artists }) => (
                    <li className="text-left">
                      <b>{name}</b> by{" "}
                      <i>{artists.map((artist) => artist.name).join(", ")}</i>
                    </li>
                  ))}
                </ol>

                {!recommendations && (
                  <button
                    className="btn btn-success"
                    onClick={handleRecommendations}
                  >
                    Show recommendations
                  </button>
                )}
              </div>
            )}

            {recommendations && tracks && (
              <div className="pt-10 prose text-center">
                <h2>We think you might enjoy these tracks</h2>
                <ol className="flex flex-col items-center text-lg font-medium">
                  {recommendations?.map(({ name, artists }) => (
                    <li className="text-left">
                      <b>{name}</b> by{" "}
                      <i>{artists.map((artist) => artist.name).join(", ")}</i>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
