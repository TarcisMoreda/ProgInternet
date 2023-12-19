import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Artists from "./pages/Artists";
import Albums from "./pages/Albums";
import Tracks from "./pages/Tracks";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="pesquisa/:name" element={<Artists />} />
          <Route path="artista/:id" element={<Albums />} />
          <Route path="album/:id" element={<Tracks />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
