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

  handleDarkModeItemClick(e) {
    const dark = e.target.closest(".dark-mode__item_dark");
    const light = e.target.closest(".dark-mode__item_light");
    if (dark) {
      document.documentElement.classList.add("page-dark-mode");
    } else if (light) {
      document.documentElement.classList.remove("page-dark-mode");
    }
    this.uiMenu.open = false;
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.initMaterial();
    this.addEventListeners();
  }

  render() {
    return darkModeTemplate();
  }
}
