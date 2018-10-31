import { firebase } from "./utils/firebase";
import { FirebaseDatabase } from "./services/FirebaseDatabase";
import { MainComponent } from "./components/Main/Main";
import "./index.scss";

const root = document.getElementById("root");
const main = new MainComponent(root);

main.mount();

const firebaseDatabase = new FirebaseDatabase(firebase.database());
firebaseDatabase.getAlbums(albums => albums);
