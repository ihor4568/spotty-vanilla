import { MDCTopAppBar } from "@material/top-app-bar";
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
  }

  addEventListeners() {
    this.topAppBar.listen("MDCTopAppBar:nav", this.handleOpening.bind(this));
  }

  handleOpening() {
    this.drawer.open = !this.drawer.open;
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.addEventListeners();
  }

  render() {
    return Header();
  }
}
