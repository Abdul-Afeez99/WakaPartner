import React, { useState } from "react";
import { Navbar, Hero, SearchResults} from "../components";
function App() {
  const [placeId, setPlaceId] = useState("");
  return (
    <>
      <Navbar />
      <Hero placeId={placeId} setPlaceId={(s) => setPlaceId(s)} />
      <SearchResults placeId={placeId} />
    </>
  );
}

export default App;
