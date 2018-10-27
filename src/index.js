import "./index.scss";
import { AlbumListComponent } from "./components/AlbumsComponents/AlbumListComponent/AlbumListComponent";
import { MainComponent } from "./components/Main/Main";

const root = document.getElementById("root");

const main = new MainComponent(root);
main.mount();

const album = new AlbumListComponent(root);
album.mount();
