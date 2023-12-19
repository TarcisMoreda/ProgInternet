import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getToken from "../getToken";

import Menu from "../components/Menu";
import Card from "../components/Card";

export default function Albums() {
  const [albums, setAlbums] = useState(null);
  const artist_id = useParams().id;

  useEffect(() => {
    const url = `https://api.spotify.com/v1/artists/${artist_id}/albums`;

    getToken()
      .then((token) =>
        fetch(url, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }, // Informando o TOKEN para a API.
        })
      )
      .then((res) => res.json())
      .then((json) => setAlbums(json.items))
      .catch((e) => console.error(e));
  }, []);

  if (albums === null) {
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
            {albums.map((album) => (
              <Card
                link={`/album/${album.id}`}
                image={
                  album.images.length === 0
                    ? "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Black_colour.jpg/640px-Black_colour.jpg"
                    : album.images[0].url
                }
                info={
                  <div>
                    <p className="text-2xl font-bold mb-1">{album.name}</p>
                    <p className="text-xl">
                      {new Date(album.release_date).toLocaleDateString()}
                    </p>
                  </div>
                }
                key={album.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
