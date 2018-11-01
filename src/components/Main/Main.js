import { MDCDrawer } from "@material/drawer";

import { PlayerComponent } from "../Player/Player";
import { HeaderComponent } from "../Header/Header";
import { SearchComponent } from "../Search/Search";
import { AboutComponent } from "../About/About";
import { NotFoundComponent } from "../NotFound/NotFound";
import mainTemplate from "./Main.html";

export class MainComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.scrollTarget = this.mountPoint.querySelector(".main__sidebar");
    this.headerPoint = this.mountPoint.querySelector(".main__header");
    this.playerPoint = this.mountPoint.querySelector(".main__player");
    this.searchPoint = this.mountPoint.querySelector(".main__search");
    this.mainPoint = this.mountPoint.querySelector(".main__content-mount");
    this.sidebarList = this.mountPoint.querySelector(".main__list");
  }

  initMaterial() {
    this.drawer = MDCDrawer.attachTo(
      this.mountPoint.querySelector(".main__sidebar")
    );
  }

  addEventListeners() {
    this.sidebarList.addEventListener("click", this.handleListClick.bind(this));
    window.addEventListener("popstate", this.handleStatePath.bind(this));
  }

  handleListClick(e) {
    e.preventDefault();
    if (e.target.closest(".main__about-link")) {
      this.routeNavigate("/about");
    }
  }

  routeNavigate(url) {
    window.history.pushState(null, null, url);
    this.handleStatePath();
  }

  handleStatePath() {
    const pathname = window.location.pathname.replace(/^\/|\/$/g, "");
    if (pathname === "about" || pathname === "") {
      this.about.mount();
      return;
    }

    const urlParts = pathname.split("/");

    if (urlParts[0] === "songs" && urlParts[1] && urlParts.length === 2) {
      // songId will be used for the data request
      // eslint-disable-next-line no-unused-vars
      const songId = urlParts[1];
      // ShareView will be mounted here...
      return;
    }

    this.notFound.mount();
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.initMaterial();
    this.mountChildren();
    this.addEventListeners();
    this.handleStatePath();
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

    this.notFound = new NotFoundComponent(this.mainPoint);
  }

  render() {
    return mainTemplate();
  }
}
