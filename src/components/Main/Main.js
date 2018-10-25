import { MDCDrawer } from "@material/drawer";

import { SidebarComponent } from "../Sidebar/Sidebar";
import { PlayerComponent } from "../Player/Player";
import { HeaderComponent } from "../Header/Header";

export class MainComponent {
  constructor(mountPoint, props = { element: {} }) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.scrollTarget = document.getElementById("main-content");
    this.sliderPoint = document.querySelector(".mdc-drawer");
    this.playerPoint = document.querySelector(".spotty__player");
    this.headerPoint = document.querySelector(".mdc-drawer-app-content");
    this.drawer = MDCDrawer.attachTo(document.querySelector(".mdc-drawer"));
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.mountChildren();
  }

  mountChildren() {
    this.sidebar = new SidebarComponent(this.sliderPoint);
    this.sidebar.mount();

    this.header = new HeaderComponent(
      this.headerPoint,
      this.drawer,
      this.sliderPoint
    );
    this.header.mount();

    this.player = new PlayerComponent(this.playerPoint);
    this.player.mount();
  }

  render() {
    return `
      <aside class="mdc-drawer mdc-drawer--dismissible"></aside>
      <div class="mdc-drawer-app-content"></div>
      <main class="main-content" id="main-content">
        <div class="mdc-top-app-bar--fixed-adjust main-content__wrapper">
          Your sample content <br /> sample content <br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content<br /> sample content
        </div>
      </main>
      <div class="spotty__player"></div>
    `;
  }
}
