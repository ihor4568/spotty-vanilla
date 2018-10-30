import { MDCMenu } from "@material/menu";

import dotsMenuTemplate from "./DotsMenu.html";

export class DotsMenuComponent {
  constructor(mountPoint, props = { items: [] }) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.menu = this.mountPoint.querySelector(".dots-menu__holder");
    this.menuButton = this.mountPoint.querySelector(".dots-menu__button");
  }

  initMaterial() {
    this.uiMenu = new MDCMenu(this.menu);
  }

  addEventListeners() {
    this.menuButton.addEventListener(
      "click",
      this.handleMenuBtnClick.bind(this)
    );
    this.menu.addEventListener("click", this.handleMenuItemClick.bind(this));
  }

  handleMenuBtnClick() {
    this.uiMenu.open = !this.uiMenu.open;
  }

  handleMenuItemClick(e) {
    const activeMenuItem = e.target.closest(".dots-menu__item");
    if (activeMenuItem) {
      const id = parseInt(activeMenuItem.dataset.id, 10);
      this.props.items[id].handler();
    }
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.initMaterial();
    this.addEventListeners();
  }

  render() {
    return dotsMenuTemplate(this.props);
  }
}
