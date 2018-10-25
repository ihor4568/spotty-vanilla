import { MDCMenu } from "@material/menu";

import dotsMenuTpl from "./DotsMenu.html";

export class DotsMenu {
  constructor(mountPoint, props = { items: [] }) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.menu = this.mountPoint.querySelector(".overflow-menu__holder");
    this.menuButton = this.mountPoint.querySelector(".overflow-menu__button");
  }

  initUIElements() {
    this.uiMenu = new MDCMenu(this.menu);
  }

  addEventListeners() {
    this.menuButton.addEventListener(
      "click",
      this.handleMenuBtnClick.bind(this)
    );
  }

  handleMenuBtnClick() {
    this.uiMenu.open = !this.uiMenu.open;
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.initUIElements();
    this.addEventListeners();
  }

  render() {
    return dotsMenuTpl(this.props);
  }
}
