import "./index.scss";
import { AlbumListComponent } from "./components/AlbumsComponents/AlbumListComponent/AlbumListComponent";

const root = document.getElementById("root");
const album = new AlbumListComponent(root);
album.mount();
