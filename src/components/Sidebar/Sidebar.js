import { MDCDrawer } from "@material/drawer";
import { HeaderComponent } from "../Header/Header";

export class SidebarComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  querySelectors() {
    this.drawer = MDCDrawer.attachTo(document.querySelector(".mdc-drawer"));
    this.headerPoint = document.querySelector(".mdc-drawer-app-content");
  }

  mountChildren() {
    this.header = new HeaderComponent(this.headerPoint, this.drawer);
    this.header.mount();
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.mountChildren();
  }

  render() {
    return `
      <aside class="mdc-drawer mdc-drawer--dismissible">
        <div class="mdc-drawer__content">
          <div class="mdc-list">
            <a class="mdc-list-item mdc-list-item--activated" href="#" aria-selected="true">
              <i class="material-icons mdc-list-item__graphic" aria-hidden="true">library_music</i>
              <span class="mdc-list-item__text">My Songs</span>
            </a>
            <a class="mdc-list-item" href="#">
              <i class="material-icons mdc-list-item__graphic" aria-hidden="true">album</i>
              <span class="mdc-list-item__text">Albums</span>
            </a>
            <a class="mdc-list-item" href="#">
              <i class="material-icons mdc-list-item__graphic" aria-hidden="true">person_outline</i>
              <span class="mdc-list-item__text">Artists</span>
            </a>
            <a class="mdc-list-item" href="#">
              <i class="material-icons mdc-list-item__graphic" aria-hidden="true">info</i>
              <span class="mdc-list-item__text">About</span>
            </a>
          </div>
        </div>
      </aside>

      <div class="mdc-drawer-app-content"></div>
    `;
  }
}
