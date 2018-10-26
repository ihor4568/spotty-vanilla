import "./index.scss";

const root = document.getElementById("root");

import { PlayerComponent } from "./components/MediaPlayer/Player";

const media = new PlayerComponent(root);
media.mount();

window.media = media;
