import "./index.scss";
import { MainComponent } from "./components/Main/Main";

const root = document.getElementById("root");

const main = new MainComponent(root);
main.mount();

window.main = main;
