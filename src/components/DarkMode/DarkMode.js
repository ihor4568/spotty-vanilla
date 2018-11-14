import { MDCMenuSurface } from "@material/menu-surface";

import darkModeTemplate from "./DarkMode.html";

export class DarkModeComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.darkMode = this.mountPoint.querySelector(".dark-mode__holder");
    this.darkModeButton = this.mountPoint.querySelector(".dark-mode__button");
  }

  initMaterial() {
    this.uiMenu = new MDCMenuSurface(this.darkMode);
  }

  addEventListeners() {
    this.darkModeButton.addEventListener(
      "click",
      this.handleDarkModeButtonClick.bind(this)
    );
    this.darkMode.addEventListener(
      "click",
      this.handleDarkModeItemClick.bind(this)
    );
  }

  handleDarkModeButtonClick() {
    this.uiMenu.open = !this.uiMenu.open;
  }

  handleDarkModeItemClick() {}

  render() {
    return darkModeTemplate();
  }
}
