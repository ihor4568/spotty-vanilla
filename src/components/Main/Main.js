import { MDCDrawer } from "@material/drawer";

import { PlayerComponent } from "../Player/Player";
import { HeaderComponent } from "../Header/Header";
import { SearchComponent } from "../Search/Search";
import { AlbumsComponent } from "../Albums/Albums";
import { AboutComponent } from "../About/About";
import { ArtistsComponent } from "../Artists/Artists";
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
    this.artistsLink = this.mountPoint.querySelector(".main__artists");
  }

  initMaterial() {
    this.drawer = MDCDrawer.attachTo(
      this.mountPoint.querySelector(".main__sidebar")
    );
  }

  addEventListeners() {
    this.sidebarList.addEventListener("click", this.handleListClick.bind(this));
    this.artistsLink.addEventListener(
      "click",
      this.handleArtistsView.bind(this)
    );
  }

  handleListClick(e) {
    e.preventDefault();
    if (e.target.closest(".main__about-link")) {
      this.about.mount();
    } else if (e.target.closest(".main__albums-link")) {
      this.albums.mount();
    }
  }

  handleArtistsView(e) {
    e.preventDefault();
    if (e.target.closest(".main__artists")) {
      this.artist.mount();
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

    this.albums = new AlbumsComponent(this.mainPoint);
    this.albums.mount();

    this.artist = new ArtistsComponent(this.mainPoint);
  }

  render() {
    return mainTemplate();
  }
}
