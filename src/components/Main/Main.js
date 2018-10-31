import { MDCDrawer } from "@material/drawer";

import { PlayerComponent } from "../Player/Player";
import { HeaderComponent } from "../Header/Header";
import { SearchComponent } from "../Search/Search";
import { AboutComponent } from "../About/About";
import { ArtistsComponent } from "../Artists/Artists";
import mainTemplate from "./Main.html";

const ARTISTS_DATA = [
  {
    name: "Nicki Minaj",
    cover: "https://bit.ly/2Q4xgEZ",
    link: "https://www.instagram.com/nickiminaj/"
  },
  {
    name: "Eminem",
    cover: "https://bit.ly/2Q4xqfz",
    link: "https://www.instagram.com/eminem/"
  },
  {
    name: "50 Cent",
    cover: "https://bit.ly/2yGMtWs",
    link: "https://www.instagram.com/50cent/"
  },
  {
    name: "Dr. Dre",
    cover: "https://bit.ly/2DeyScx",
    link: "https://www.instagram.com/drdre/"
  },
  {
    name: "Ice Cube",
    cover: "https://bit.ly/2CRLPZ4",
    link: "https://www.instagram.com/icecube/"
  },
  {
    name: "Tech N9ne",
    cover: "https://bit.ly/2OmMUKA",
    link: "https://www.instagram.com/therealtechn9ne/"
  },
  {
    name: "Redman",
    cover: "https://bit.ly/2CQCsbQ",
    link: "https://www.instagram.com/redmangilla/"
  },
  {
    name: "Cassidy",
    cover: "https://bit.ly/2PxjNJ3",
    link: "https://www.instagram.com/cassidy_larsiny/"
  },
  {
    name: "Busta Rhymes",
    cover: "https://bit.ly/2QeXJQE",
    link: "https://www.instagram.com/bustarhymes/"
  },
  {
    name: "Dizaster",
    cover: "https://bit.ly/2RpRDgk",
    link: "https://www.instagram.com/mrdizaster/"
  }
];

export class MainComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
    this.artistsData = ARTISTS_DATA;
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

    this.artist = new ArtistsComponent(this.mainPoint, {
      artistsData: this.artistsData
    });
  }

  render() {
    return mainTemplate();
  }
}
