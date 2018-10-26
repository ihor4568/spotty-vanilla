import { MDCTopAppBar } from "@material/top-app-bar";
import headerTemplate from "./Header.html";

export class HeaderComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.openFunction = props.openFunction;
    this.scrollTarget = props.scrollTarget;
  }

  initMaterial() {
    this.topAppBar = MDCTopAppBar.attachTo(document.querySelector(".header"));
  }

  querySelectors() {
    this.topAppBar.setScrollTarget(this.scrollTarget);
  }

  addEventListeners() {
    this.topAppBar.listen("MDCTopAppBar:nav", this.onOpen.bind(this));
  }

  onOpen(e) {
    this.openFunction();
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.initMaterial();
    this.querySelectors();
    this.addEventListeners();
  }

  render() {
    return headerTemplate();
  }
}
