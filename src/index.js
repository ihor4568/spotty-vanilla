// import { firebase } from "./utils/firebase";
// import { MusicStorage } from "./services/MusicStorage";
import { MainComponent } from "./components/Main/Main";
import "./index.scss";

const root = document.getElementById("root");
const main = new MainComponent(root);
main.mount();

// const database = firebase.database();
// const musicStorage = new MusicStorage(database);

// Usage example.

// musicStorage.getAlbums().then(albums => console.log(albums));
// musicStorage.getAuthors().then(authors => console.log(authors));
// musicStorage.getAuthorSongs("BJ Block").then(songs => console.log(songs));
// musicStorage.getAlbumSongs("||").then(songs => console.log(songs));
