import "./index.scss";
import { SharingSongComponent } from "./components/SharingSong/SharingSong";

const root = document.getElementById("root");
const shar = new SharingSongComponent(root);
shar.mount();
