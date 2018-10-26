import { MDCDrawer } from "@material/drawer";

import { PlayerComponent } from "../Player/Player";
import { HeaderComponent } from "../Header/Header";
import { SearchComponent } from "../Search/Search";
import mainTemplate from "./Main.html";

export class MainComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  initMaterial() {
    this.drawer = MDCDrawer.attachTo(document.querySelector(".main__sidebar"));
  }

  querySelectors() {
    this.mountPoint = document.querySelector(".main__sidebar");
    this.headerPoint = document.querySelector(".main__header");
    this.playerPoint = document.querySelector(".main__player");
    this.searchPoint = document.querySelector(".main__search");
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.initMaterial();
    this.querySelectors();
    this.mountChildren();
  }

  handleOpen() {
    this.drawer.open = !this.drawer.open;
  }

  mountChildren() {
    this.header = new HeaderComponent(this.headerPoint, {
      onOpen: this.handleOpen.bind(this),
      scrollTarget: this.mountPoint
    });
    this.header.mount();

    this.player = new PlayerComponent(this.playerPoint);
    this.player.mount();

    this.search = new SearchComponent(this.searchPoint);
    this.search.mount();
  }

  render() {
    return mainTemplate();
  }
}
