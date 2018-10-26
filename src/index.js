import "./index.scss";
import { MySongsViewTableComponent } from "./Components/MySongsView/MySongsViewTable/MySongsViewTable";

const root = document.getElementById("root");

const table = new MySongsViewTableComponent(root);

table.mount();
