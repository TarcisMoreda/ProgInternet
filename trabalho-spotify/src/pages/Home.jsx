import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../components/Logo";

export default function Home() {
  const navigate = useNavigate();
  const [artist, setArtist] = useState("");

  return (
    <div className="super h-screen">
      <div className="island my-auto">
        <Logo />
        <input
          placeholder="Nome do artista"
          className="mx-auto my-4"
          onChange={(e) => setArtist(e.target.value)}
          value={artist}
        />
        <button
          className="mx-auto"
          onClick={() => {
            if (artist !== "") navigate(`/pesquisa/${artist}`);
            else alert("Digite um nome na caixa de pesquisa!");
          }}
        >
          Procurar Artista
        </button>
      </div>
    </div>
  );
}
