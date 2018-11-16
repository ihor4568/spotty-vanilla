import { MDCMenuSurface } from "@material/menu-surface";
import { AuthService } from "../../services/AuthService";
import { MusicService } from "../../services/MusicService";
import darkModeTemplate from "./DarkMode.html";

export class DarkModeComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.darkModeHolder = this.mountPoint.querySelector(".dark-mode__holder");
    this.darkModeButton = this.mountPoint.querySelector(".dark-mode__button");
  }

  initMaterial() {
    this.uiMenu = new MDCMenuSurface(this.darkModeHolder);
  }

  addEventListeners() {
    this.darkModeButton.addEventListener(
      "click",
      this.handleDarkModeButtonClick.bind(this)
    );
    this.darkModeHolder.addEventListener(
      "click",
      this.handleDarkModeItemClick.bind(this)
    );
  }

  handleDarkModeButtonClick() {
    this.uiMenu.open = !this.uiMenu.open;
  }

  async handleDarkModeItemClick(e) {
    const userId = await AuthService.getCurrentUser().uid;
    const dark = e.target.closest(".dark-mode__item_dark");
    const light = e.target.closest(".dark-mode__item_light");
    if (dark) {
      MusicService.setTheme(userId, "dark");
      document.documentElement.classList.add("page_dark-mode");
    } else if (light) {
      MusicService.setTheme(userId, "light");
      document.documentElement.classList.remove("page_dark-mode");
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
