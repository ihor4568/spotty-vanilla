import { firebase } from "./utils/firebase";
import { MusicStorage } from "./services/MusicStorage";
import { MainComponent } from "./components/Main/Main";
import "./index.scss";

const root = document.getElementById("root");
const main = new MainComponent(root);

main.mount();

const database = firebase.database();
const musicStorage = new MusicStorage(database);

musicStorage.getAlbums().then(albums => albums);
musicStorage.getAuthors().then(authors => authors);
musicStorage.getAuthorSongs("BJ Block").then(songs => songs);
