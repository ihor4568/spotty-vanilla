import { MDCDrawer } from "@material/drawer";

import { MediaPlayerComponent } from "../MediaPlayer/MediaPlayer";
import { HeaderComponent } from "../Header/Header";
import { SearchComponent } from "../Search/Search";
import { ShareViewComponent } from "../ShareView/ShareView";
import { AlbumsComponent } from "../Albums/Albums";
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
    this.appBar = this.mountPoint.querySelector(".main__app-bar");
  }

  setShareView() {
    this.playerPoint.classList.add("main__elem_disable");
    this.searchPoint.classList.add("main__elem_disable");
    this.appBar.classList.add("main__app-bar_disable");
    this.mainPoint.classList.add("main__content-mount_disable");
    this.shareView.mount();
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
    } else if (e.target.closest(".main__albums-link")) {
      this.albums.mount();
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

    this.player = new MediaPlayerComponent(this.playerPoint);
    this.player.mount();

    this.search = new SearchComponent(this.searchPoint);
    this.search.mount();

    this.shareView = new ShareViewComponent(this.shareViewPoint);

    this.about = new AboutComponent(this.mainPoint);

    this.albums = new AlbumsComponent(this.mainPoint);
    this.albums.mount();
  }

  render() {
    return mainTemplate();
  }
}
