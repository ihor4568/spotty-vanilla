import "./index.scss";
import { MainComponent } from "./components/Main/Main";
import { ArtistComponent } from "./components/Artist/Artist";

const root = document.getElementById("root");

const main = new MainComponent(root);

main.mount();
