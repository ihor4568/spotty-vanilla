import "./index.scss";

import { DotsMenu } from "./components/DotsMenu/DotsMenu";

const root = document.querySelector("#root");

const menu = new DotsMenu(root, { items: ["item1", "item2", "item3"] });
menu.mount();
