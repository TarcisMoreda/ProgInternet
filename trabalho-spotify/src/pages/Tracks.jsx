import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getToken from "../getToken";

import Menu from "../components/Menu";

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

export default function Tracks() {
  const [tracks, setTracks] = useState(null);
  const album_id = useParams().id;

  useEffect(() => {
    const url = `https://api.spotify.com/v1/albums/${album_id}`;

    getToken()
      .then((token) =>
        fetch(url, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }, // Informando o TOKEN para a API.
        })
      )
      .then((res) => res.json())
      .then((json) => setTracks(json.tracks.items))
      .catch((e) => console.error(e));
  }, []);

  if (tracks === null) {
    return (
      <div className="h-screen">
        <Menu />
      </div>
    );
  }

  console.log(tracks);

  return (
    <div className="h-screen">
      <Menu />
      <div className="super">
        <div className="island my-8">
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {tracks.map((track) => (
              <div key={track.id} className="border rounded p-2">
                <audio controls className="bg-zinc-900 w-full">
                  <source src={track.preview_url} />
                </audio>
                <p className="text-2xl font-bold mb-1">{track.name}</p>
                <p className="text-xl">
                  <a className="font-bold">{`Duração: ${millisToMinutesAndSeconds(
                    track.duration_ms
                  )} min`}</a>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
