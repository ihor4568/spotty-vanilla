import { MDCMenuSurface } from "@material/menu-surface";
import { AuthService } from "../../services/AuthService";
import { ThemeService } from "../../services/ThemeService";
import darkModeTemplate from "./DarkModeSelector.html";

export class DarkModeSelectorComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.darkModeHolder = this.mountPoint.querySelector(
      ".dark-mode-selector__holder"
    );
    this.darkModeButton = this.mountPoint.querySelector(
      ".dark-mode-selector__button"
    );
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
    const dark = e.target.closest(".dark-mode-selector__item_dark");
    const light = e.target.closest(".dark-mode-selector__item_light");
    if (dark) {
      ThemeService.setTheme(userId, "dark");
      document.documentElement.classList.add("page_dark-mode");
    } else if (light) {
      ThemeService.setTheme(userId, "light");
      document.documentElement.classList.remove("page_dark-mode");
    }
    this.uiMenu.open = false;
  }

  async checkTheme() {
    const user = await AuthService.check();
    const currentTheme = await ThemeService.getTheme(user.uid);
    if (currentTheme === "dark") {
      document.documentElement.classList.add("page_dark-mode");
    }
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.checkTheme();
    this.querySelectors();
    this.initMaterial();
    this.addEventListeners();
  }

  render() {
    return darkModeTemplate();
  }
}
