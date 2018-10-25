import { MDCTopAppBar } from "@material/top-app-bar";
import { SearchComponent } from "../Search/Search";
import Header from "./Header.html";

export class HeaderComponent {
  constructor(mountPoint, drawer, scroll) {
    this.mountPoint = mountPoint;
    this.drawer = drawer;
    this.scroll = scroll;
  }

  querySelectors() {
    this.topAppBar = MDCTopAppBar.attachTo(document.getElementById("app-bar"));
    this.topAppBar.setScrollTarget(this.scroll);
    this.searchPoint = this.mountPoint.querySelector(
      ".mdc-top-app-bar__section--align-end"
    );
  }

  addEventListeners() {
    this.topAppBar.listen("MDCTopAppBar:nav", this.handleOpening.bind(this));
  }

  handleOpening() {
    this.drawer.open = !this.drawer.open;
  }

  mountChildren() {
    this.search = new SearchComponent(this.searchPoint);
    this.search.mount();
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.addEventListeners();
    this.mountChildren();
  }

  render() {
    return Header(this.props);
  }
}
