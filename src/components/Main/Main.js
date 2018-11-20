import { MDCDrawer } from "@material/drawer";
import { AuthService } from "../../services/AuthService";
import { MediaPlayerComponent } from "../MediaPlayer/MediaPlayer";
import { HeaderComponent } from "../Header/Header";
import { DarkModeComponent } from "../DarkMode/DarkMode";
import { SearchComponent } from "../Search/Search";
import { MySongsComponent } from "../MySongs/MySongs";
import { ShareViewComponent } from "../ShareView/ShareView";
import { AuthComponent } from "../Auth/Auth";
import { AlbumsComponent } from "../Albums/Albums";
import { AboutComponent } from "../About/About";
import { ArtistsComponent } from "../Artists/Artists";
import { ArtistSongTableComponent } from "../ArtistSongTable/ArtistSongTable";
import { AlbumSongsTableComponent } from "../AlbumSongsTable/AlbumSongsTable";
import { NotFoundComponent } from "../NotFound/NotFound";
import { LicenseDialogComponent } from "../LicenseDialog/LicenseDialog";
import mainTemplate from "./Main.html";

export class MainComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.scrollTarget = this.mountPoint.querySelector(".main__sidebar");
    this.mainContentPoint = this.mountPoint.querySelector(
      ".main__content-mount"
    );
    this.mainPoint = this.mountPoint.querySelector(".main__section");
    this.sidebarList = this.mountPoint.querySelector(".main__list");
    this.headerPoint = this.mountPoint.querySelector(".main__header");
    this.darkMode = this.mountPoint.querySelector(".main__dark-mode");
    this.playerPoint = this.mountPoint.querySelector(".main__player");
    this.searchPoint = this.mountPoint.querySelector(".main__search");
    this.appBar = this.mountPoint.querySelector(".main__app-bar");
    this.userPoint = this.mountPoint.querySelector(".main__user");
    this.userSignOut = this.mountPoint.querySelector(".main__sign-out");
    this.licenseDialog = this.mountPoint.querySelector(".main__license-dialog");
  }

  setShareView(songId) {
    this.playerPoint.classList.add("main__elem_disable");
    this.searchPoint.classList.add("main__elem_disable");
    this.appBar.classList.add("main__app-bar_disable");
    this.mainPoint.classList.add("main__section_disable");
    this.mainContentPoint.classList.add("main__content-mount_disable");
    this.shareView.setSongId(songId);
  }

  setAuthView() {
    this.playerPoint.classList.add("main__elem_disable");
    this.searchPoint.classList.add("main__elem_disable");
    this.appBar.classList.add("main__app-bar_disable");
    this.mainPoint.classList.add("main__section_disable");
    this.mainContentPoint.classList.add("main__content-mount_disable");
    this.auth.mount();
  }

  normalizePageView() {
    this.playerPoint.classList.remove("main__elem_disable");
    this.searchPoint.classList.remove("main__elem_disable");
    this.appBar.classList.remove("main__app-bar_disable");
    this.mainPoint.classList.remove("main__section_disable");
    this.mainContentPoint.classList.remove("main__content-mount_disable");
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
    this.mainContentPoint.addEventListener(
      "click",
      this.handleListClick.bind(this)
    );
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

    if (/^song\/\w+/.test(pathname)) {
      const pathnameParts = pathname.split("/");
      const songId = pathnameParts[pathnameParts.length - 1];
      this.setShareView(songId);
      return;
    }

    AuthService.check().then(
      user => this.handleGo.call(this, pathname, user.displayName),
      this.handleStop.bind(this, pathname)
    );
  }

  handleGo(pathname, userName) {
    this.userPoint.innerText = userName;

    if (pathname === "" || pathname === "login") {
      this.routeNavigate("/albums");
      return;
    }

    this.changeActiveMenuItem(`/${pathname}`);

    if (pathname === "songs") {
      this.table.mount();
      return;
    }

    if (pathname === "albums") {
      this.albums.mount();
      return;
    }

    if (/^albums\/\w+/.test(pathname)) {
      const pathnameParts = pathname.split("/");
      const albumId = pathnameParts[pathnameParts.length - 1];
      this.albumSongs.mount(albumId);
      return;
    }

    if (pathname === "artists") {
      this.artist.mount();
      return;
    }

    if (/^artists\/\w+/.test(pathname)) {
      const pathnameParts = pathname.split("/");
      const artistId = pathnameParts[pathnameParts.length - 1];
      this.artistSongTable.mount(artistId);
      return;
    }

    if (pathname === "about") {
      this.about.mount();
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

  handlePlayerChangeState(songId, isPlaying) {
    if (songId) {
      this.table.changeStateSong(songId, isPlaying);
      this.artistSongTable.changeStateSong(songId, isPlaying);
      this.albumSongs.changeStateSong(songId, isPlaying);
    }
  }

  handleDialogOpen() {
    this.licenseDialogComponent.handleOpen();
  }

  handleLegalOptionClick(info) {
    this.licenseDialogComponent.setInfo(info);
  }

  handleArtistClick(artistId) {
    this.routeNavigate(`/artists/${artistId}`);
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

  handleAlbumClick(albumId) {
    this.routeNavigate(`/albums/${albumId}`);
  }

  handleDataReceived(data) {
    this.player.setSongsData(data);
  }

  mountChildren() {
    this.darkMode = new DarkModeComponent(this.darkMode);
    this.darkMode.mount();

    this.header = new HeaderComponent(this.headerPoint, {
      onOpen: this.handleOpen.bind(this),
      scrollTarget: this.scrollTarget
    });
    this.header.mount();

    this.licenseDialogComponent = new LicenseDialogComponent(
      this.licenseDialog
    );
    this.licenseDialogComponent.mount();

    this.search = new SearchComponent(this.searchPoint);
    this.search.mount();

    this.shareView = new ShareViewComponent(this.mainContentPoint);
    this.shareView.mount();

    this.auth = new AuthComponent(this.mainContentPoint);

    this.about = new AboutComponent(this.mainContentPoint);
    this.table = new MySongsComponent(this.mainContentPoint, {
      onDataReceived: this.handleDataReceived.bind(this),
      onSongPlay: this.handleSongPlay.bind(this),
      onSongStop: this.handleSongStop.bind(this),
      onDialogOpen: this.handleDialogOpen.bind(this),
      onLegalOptionClick: this.handleLegalOptionClick.bind(this)
    });

    this.albums = new AlbumsComponent(this.mainContentPoint, {
      onAlbumClick: this.handleAlbumClick.bind(this)
    });

    this.notFound = new NotFoundComponent(this.mainContentPoint);

    this.artist = new ArtistsComponent(this.mainContentPoint, {
      onArtistClick: this.handleArtistClick.bind(this)
    });

    this.artistSongTable = new ArtistSongTableComponent(this.mainContentPoint, {
      onDataReceived: this.handleDataReceived.bind(this),
      onSongPlay: this.handleSongPlay.bind(this),
      onSongStop: this.handleSongStop.bind(this)
    });

    this.albumSongs = new AlbumSongsTableComponent(this.mainContentPoint, {
      onDataReceived: this.handleDataReceived.bind(this),
      onSongPlay: this.handleSongPlay.bind(this),
      onSongStop: this.handleSongStop.bind(this)
    });

    this.player = new MediaPlayerComponent(this.playerPoint, {
      onDialogOpen: this.handleDialogOpen.bind(this),
      onPlayerChangeState: this.handlePlayerChangeState.bind(this),
      onLegalOptionClick: this.handleLegalOptionClick.bind(this),
      onAddSong: this.table.addSong.bind(this.table)
    });
    this.player.mount();
  }

  render() {
    return mainTemplate({ currentUser: "" });
  }
}
