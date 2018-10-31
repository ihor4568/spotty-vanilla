// import * as firebaseCreationScripts from "./utils/scripts";
import { MainComponent } from "./components/Main/Main";
import "./index.scss";

const root = document.getElementById("root");
const main = new MainComponent(root);

main.mount();

// Test firebase methods. Don't forget to uncomment firebaseCreationScripts. I commented it out to pass eslint tests)
// firebaseCreationScripts.createAlbum("FrostWire");
// firebaseCreationScripts.createAlbum("netBloc Vol. 33");
