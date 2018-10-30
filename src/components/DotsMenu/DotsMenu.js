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
  }

  handleMenuBtnClick() {
    this.uiMenu.open = !this.uiMenu.open;
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
