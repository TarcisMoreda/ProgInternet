import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getToken from "../getToken";

import Card from "../components/Card";
import Menu from "../components/Menu";

export default function Artists() {
  const [artists, setArtists] = useState(null);
  const artist_name = useParams().name;

  useEffect(() => {
    const url = `https://api.spotify.com/v1/search?q=${artist_name}&type=artist&market=BR`;

    getToken()
      .then((token) =>
        fetch(url, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }, // Informando o TOKEN para a API.
        })
      )
      .then((res) => res.json())
      .then((json) => setArtists(json.artists))
      .catch((e) => console.error(e));
  }, []);

  if (artists === null) {
    return (
      <div className="h-screen">
        <Menu />
      </div>
    );
  }

  return (
    <div className="h-screen">
      <Menu />
      <div className="super">
        <div className="island my-8">
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {artists.items.map((artist) => (
              <Card
                link={`/artista/${artist.id}`}
                image={
                  artist.images.length === 0
                    ? "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Black_colour.jpg/640px-Black_colour.jpg"
                    : artist.images[0].url
                }
                info={<p className="text-2xl font-bold">{artist.name}</p>}
                key={artist.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
