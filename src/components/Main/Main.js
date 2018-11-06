import { MDCDrawer } from "@material/drawer";

import * as HelperService from "../../services/HelperService";
import { SearchService } from "../../services/SearchService";
import { MediaPlayerComponent } from "../MediaPlayer/MediaPlayer";
import { HeaderComponent } from "../Header/Header";
import { SearchComponent } from "../Search/Search";
import { MySongsComponent } from "../MySongs/MySongs";
import { ShareViewComponent } from "../ShareView/ShareView";
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
  }

  setShareView(songId) {
    this.playerPoint.classList.add("main__elem_disable");
    this.searchPoint.classList.add("main__elem_disable");
    this.appBar.classList.add("main__app-bar_disable");
    this.mainPoint.classList.add("main__content-mount_disable");
    this.shareView.setSongId(songId);
    this.shareView.mount();
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

  handleSearchQuery(e) {
    const searchQuery = e.target.value;
    const { currentTab } = this.state;

    if (
      currentTab instanceof AboutComponent ||
      currentTab instanceof NotFoundComponent
    ) {
      return;
    }

    const { initialData, filteredData } = currentTab.state;
    const searchableData = HelperService.retrieveArrayObjectsFields(
      initialData,
      "name"
    );
    const indices = HelperService.findAllOccurrences(
      searchableData,
      searchQuery
    );
    const nextFilteredData =
      (!searchQuery && initialData) || indices.map(item => initialData[item]);

    const componentShouldUpdate = filteredData !== nextFilteredData;
    if (componentShouldUpdate) {
      currentTab.state.filteredData = nextFilteredData;
      currentTab.mount(nextFilteredData);
    }
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
    const pathname = HelperService.getPathname(window);

    this.changeActiveMenuItem(`/${pathname}`);

    if (pathname === "albums" || pathname === "") {
      this.albums.mount();
      this.searchContainer.changeCurrentTab(this.albums);
      return;
    }

    if (pathname === "about") {
      this.about.mount();
      this.searchContainer.changeCurrentTab(this.about);
      return;
    }

    if (pathname === "artists") {
      this.artists.mount();
      this.searchContainer.changeCurrentTab(this.artists);
      return;
    }

    if (pathname === "songs") {
      this.songs.mount();
      this.searchContainer.changeCurrentTab(this.songs);
      return;
    }

    const urlParts = pathname.split("/");

    if (urlParts[0] === "song" && urlParts[1] && urlParts.length === 2) {
      const songId = urlParts[1];
      this.setShareView(songId);
      return;
    }

    this.notFound.mount();
    this.searchContainer.changeCurrentTab(this.notFound);
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

    this.player = new MediaPlayerComponent(this.playerPoint);
    this.player.mount();

    this.shareView = new ShareViewComponent(this.mainPoint);

    this.about = new AboutComponent(this.mainPoint);
    this.songs = new MySongsComponent(this.mainPoint);

    this.albums = new AlbumsComponent(this.mainPoint);

    this.notFound = new NotFoundComponent(this.mainPoint);

    this.artists = new ArtistsComponent(this.mainPoint);

    this.searchContainer = new SearchService();

    this.search = new SearchComponent(this.searchPoint, {
      onSearchQuery: this.handleSearchQuery.bind(this.searchContainer)
    });
    this.search.mount();
  }

  render() {
    return mainTemplate();
  }
}
