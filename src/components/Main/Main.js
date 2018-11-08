import { MDCDrawer } from "@material/drawer";

import { AuthService } from "../../services/AuthService";

import { MediaPlayerComponent } from "../MediaPlayer/MediaPlayer";
import { HeaderComponent } from "../Header/Header";
import { SearchComponent } from "../Search/Search";
import { MySongsComponent } from "../MySongs/MySongs";
import { ShareViewComponent } from "../ShareView/ShareView";
import { AuthComponent } from "../Auth/Auth";
import { AlbumsComponent } from "../Albums/Albums";
import { AboutComponent } from "../About/About";
import { ArtistsComponent } from "../Artists/Artists";
import { NotFoundComponent } from "../NotFound/NotFound";
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
    this.appBar = this.mountPoint.querySelector(".main__app-bar");
    this.userPoint = this.mountPoint.querySelector(".main__user");
    this.userSignOut = this.mountPoint.querySelector(".main__sign-out");
  }

  setShareView(songId) {
    this.playerPoint.classList.add("main__elem_disable");
    this.searchPoint.classList.add("main__elem_disable");
    this.appBar.classList.add("main__app-bar_disable");
    this.mainPoint.classList.add("main__content-mount_disable");
    this.shareView.setSongId(songId);
    this.shareView.mount();
  }

  setAuthView() {
    this.playerPoint.classList.add("main__elem_disable");
    this.searchPoint.classList.add("main__elem_disable");
    this.appBar.classList.add("main__app-bar_disable");
    this.mainPoint.classList.add("main__content-mount_disable");
    this.auth.mount();
  }

  normalizePageView() {
    this.playerPoint.classList.remove("main__elem_disable");
    this.searchPoint.classList.remove("main__elem_disable");
    this.appBar.classList.remove("main__app-bar_disable");
    this.mainPoint.classList.remove("main__content-mount_disable");
  }

  initMaterial() {
    this.drawer = MDCDrawer.attachTo(
      this.mountPoint.querySelector(".main__sidebar")
    );
  }

  addEventListeners() {
    this.sidebarList.addEventListener("click", this.handleListClick.bind(this));
    window.addEventListener("popstate", this.handleStatePath.bind(this));
    this.userSignOut.addEventListener("click", this.handleSignOut.bind(this));
  }

  handleListClick(e) {
    e.preventDefault();
    const { target } = e;
    const listItem = target.closest(".main__list-item");

    if (listItem) {
      this.routeNavigate(listItem.href);
    }
  }

  routeNavigate(url) {
    window.history.pushState(null, null, url);
    this.handleStatePath();
  }

  changeActiveMenuItem(path) {
    const prevActiveItem = this.mountPoint.querySelector(
      ".mdc-list-item--activated"
    );
    if (prevActiveItem) {
      prevActiveItem.classList.remove("mdc-list-item--activated");
    }

    const currActiveItem = this.mountPoint.querySelector(`[href="${path}"]`);
    if (currActiveItem) {
      currActiveItem.classList.add("mdc-list-item--activated");
    }
  }

  handleStatePath() {
    const pathname = window.location.pathname
      .replace(/^\/|\/$/g, "")
      .replace(/\/+/g, "/");

    const urlParts = pathname.split("/");
    if (urlParts[0] === "song" && urlParts[1] && urlParts.length === 2) {
      const songId = urlParts[1];
      this.setShareView(songId);
      return;
    }
    AuthService.check().then(
      user => this.handleGo.call(this, pathname, user),
      () => this.handleStop.bind(this)(pathname)
    );
  }

  handleGo(pathname, user) {
    this.userPoint.innerText = user.displayName;

    if (pathname === "" || pathname === "login") {
      this.routeNavigate("/albums");
      return;
    }

    this.changeActiveMenuItem(`/${pathname}`);

    if (pathname === "albums") {
      this.albums.mount();
      return;
    }

    if (pathname === "about") {
      this.about.mount();
      return;
    }

    if (pathname === "artists") {
      this.artist.mount();
      return;
    }

    if (pathname === "songs") {
      this.table.mount();
      return;
    }

    this.notFound.mount();
  }

  handleStop(pathname) {
    if (pathname !== "login") {
      window.location.pathname = "login";
    }
    this.setAuthView();
  }

  handleSignOut() {
    AuthService.signOut();
  }

  handleSongPlay(song) {
    this.player.setNewSong(song);
  }

  handleSongStop() {
    this.player.stop();
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
    this.searchPoint.classList.toggle("main__search_drawer-open");
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

    this.shareView = new ShareViewComponent(this.mainPoint);

    this.auth = new AuthComponent(this.mainPoint);

    this.about = new AboutComponent(this.mainPoint);
    this.table = new MySongsComponent(this.mainPoint, {
      onSongPlay: this.handleSongPlay.bind(this),
      onSongStop: this.handleSongStop.bind(this)
    });

    this.albums = new AlbumsComponent(this.mainPoint);

    this.notFound = new NotFoundComponent(this.mainPoint);

    this.artist = new ArtistsComponent(this.mainPoint);
  }

  render() {
    return mainTemplate({ currentUser: "" });
  }
}
