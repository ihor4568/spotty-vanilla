import { MDCDrawer } from "@material/drawer";

import { PlayerComponent } from "../Player/Player";
import { HeaderComponent } from "../Header/Header";
import { SearchComponent } from "../Search/Search";
import { MySongsTableComponent } from "../MySongsTable/MySongsTable";
import { AboutComponent } from "../About/About";
import mainTemplate from "./Main.html";

export class MainComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
    this.tableData = [
      {
        cover: "./src/img/alibaba.jpg",
        name: "Alibaba",
        duration: "9:15",
        artist: "Folk",
        album: "Super"
      }
    ];
  }

  querySelectors() {
    this.scrollTarget = this.mountPoint.querySelector(".main__sidebar");
    this.headerPoint = this.mountPoint.querySelector(".main__header");
    this.playerPoint = this.mountPoint.querySelector(".main__player");
    this.searchPoint = this.mountPoint.querySelector(".main__search");
    this.mainPoint = this.mountPoint.querySelector(".main__content-mount");
    this.mySongsLink = this.mountPoint.querySelector(".main__mySongs-link");
    this.sidebarList = this.mountPoint.querySelector(".main__list");

  }

  initMaterial() {
    this.drawer = MDCDrawer.attachTo(
      this.mountPoint.querySelector(".main__sidebar")
    );
  }

  addEventListeners() {
    this.mySongsLink.addEventListener(
      "click",
      this.mySongsClickHandler.bind(this)
    );
    this.sidebarList.addEventListener("click", this.handleListClick.bind(this));
  }

  mySongsClickHandler(event) {
    event.preventDefault();
    this.activeView = new MySongsTableComponent(this.mainPoint, {
      tableData: this.tableData
    });
    this.activeView.mount();    
  }

  handleListClick(e) {
    e.preventDefault();
    if (e.target.closest(".main__about-link")) {
      this.about.mount();
    }
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.initMaterial();
    this.mountChildren();
    this.addEventListeners();
  }

  handleOpen() {
    this.drawer.open = !this.drawer.open;
  }

  mountChildren() {
    this.header = new HeaderComponent(this.headerPoint, {
      onOpen: this.handleOpen.bind(this),
      scrollTarget: this.scrollTarget
    });
    this.header.mount();

    this.player = new PlayerComponent(this.playerPoint);
    this.player.mount();

    this.search = new SearchComponent(this.searchPoint);
    this.search.mount();

    this.about = new AboutComponent(this.mainPoint);
  }

  render() {
    return mainTemplate();
  }
}
