import { MDCDrawer } from "@material/drawer";

import { PlayerComponent } from "../Player/Player";
import { HeaderComponent } from "../Header/Header";
import { SearchComponent } from "../Search/Search";
import { ShareViewComponent } from "../ShareView/ShareView";
import { DialogComponent } from "../Dialog/Dialog";
import { AboutComponent } from "../About/About";
import mainTemplate from "./Main.html";

export class MainComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.scrollTarget = this.mountPoint.querySelector(".main__sidebar");
    this.mainPoint = this.mountPoint.querySelector(".main__content-mount");
    this.sidebarList = this.mountPoint.querySelector(".main__list");
    this.headerPoint = this.mountPoint.querySelector(".main__header");
    this.playerPoint = this.mountPoint.querySelector(".main__player");
    this.searchPoint = this.mountPoint.querySelector(".main__search");
    this.shareViewPoint = this.mountPoint.querySelector(".main__share-view");
    this.dialogPoint = this.mountPoint.querySelector(".main__dialog");
  }

  initMaterial() {
    this.drawer = MDCDrawer.attachTo(
      this.mountPoint.querySelector(".main__sidebar")
    );
  }

  addEventListeners() {
    this.sidebarList.addEventListener("click", this.handleListClick.bind(this));
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
    this.dialog = new DialogComponent(this.dialogPoint);
    this.dialog.mount();

    this.header = new HeaderComponent(this.headerPoint, {
      onOpen: this.handleOpen.bind(this),
      scrollTarget: this.scrollTarget
    });
    this.header.mount();

    this.player = new PlayerComponent(this.playerPoint);
    this.player.mount();

    this.search = new SearchComponent(this.searchPoint);
    this.search.mount();

    this.shareView = new ShareViewComponent(this.shareViewPoint);
    this.shareView.mount();

    this.about = new AboutComponent(this.mainPoint);
  }

  render() {
    return mainTemplate();
  }
}
