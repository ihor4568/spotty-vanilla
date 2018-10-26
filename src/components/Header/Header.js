import { MDCTopAppBar } from "@material/top-app-bar";
import headerTemplate from "./Header.html";

export class HeaderComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  initMaterial() {
    this.topAppBar = MDCTopAppBar.attachTo(this.mountPoint);
  }

  querySelectors() {
    this.topAppBar.setScrollTarget(this.props.scrollTarget);
  }

  addEventListeners() {
    this.topAppBar.listen("MDCTopAppBar:nav", this.props.onOpen);
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
