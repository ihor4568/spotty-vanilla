import "./index.scss";

import { ArtistComponent } from "./Components/ArtistsComponent/ArtistComponent";

const root = document.getElementById("root");
const artist = new ArtistComponent(root);
artist.mount();
