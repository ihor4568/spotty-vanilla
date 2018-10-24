import "./index.scss";
import { SidebarComponent } from "./components/Sidebar/Sidebar";

const root = document.getElementById("root");

const sidebar = new SidebarComponent(root);

sidebar.mount();

const main = new MainComponent(root);

main.mount();

// const header = new HeaderComponent(root);
// const search = new SearchComponent(root);

// import "./components/Header/Header";
// import "./components/Search/Search";
// import "./components/Sidebar/Sidebar";
