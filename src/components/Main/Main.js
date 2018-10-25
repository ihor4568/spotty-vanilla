import { MDCDrawer } from "@material/drawer";

import { PlayerComponent } from "../Player/Player";
import { HeaderComponent } from "../Header/Header";
import { SearchComponent } from "../Search/Search";
import Main from "./Main.html";

export class MainComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  querySelectors() {
    this.scrollTarget = document.getElementById("main-content");
    this.drawer = MDCDrawer.attachTo(document.querySelector(".mdc-drawer"));
    this.headerPoint = document.querySelector(".mdc-top-app-bar");
    this.playerPoint = document.querySelector(".spotty__player");
    this.searchPoint = this.mountPoint.querySelector(".spotty__search");
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.mountChildren();
  }

  mountChildren() {
    this.header = new HeaderComponent(
      this.headerPoint,
      this.drawer,
      this.scrollTarget
    );
    this.header.mount();

    this.player = new PlayerComponent(this.playerPoint);
    this.player.mount();

    this.search = new SearchComponent(this.searchPoint);
    this.search.mount();
  }

  render() {
    return Main();
  }
}
