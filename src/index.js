// import * as firebaseCreationScripts from "./utils/scripts";
import { MainComponent } from "./components/Main/Main";
import "./index.scss";

const root = document.getElementById("root");
const main = new MainComponent(root);

main.mount();
