import "./index.scss";
import { MainComponent } from "./components/Main/Main";
import { MySongsViewTableComponent } from "./components/MySongsView/MySongsViewTable/MySongsViewTable";

const root = document.getElementById("root");

const main = new MainComponent(root);

main.mount();


