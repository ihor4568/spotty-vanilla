import { MDCTopAppBar } from "@material/top-app-bar";
import { SearchComponent } from "../Search/Search";

export class HeaderComponent {
  constructor(mountPoint, drawer, scroll) {
    this.mountPoint = mountPoint;
    this.drawer = drawer;
    this.scroll = scroll;
  }

  querySelectors() {
    this.topAppBar = MDCTopAppBar.attachTo(document.getElementById("app-bar"));
    this.topAppBar.setScrollTarget(this.scroll);
    this.searchPoint = this.mountPoint.querySelector(
      ".mdc-top-app-bar__section--align-end"
    );
  }

  addEventListeners() {
    this.topAppBar.listen("MDCTopAppBar:nav", this.handleOpening.bind(this));
  }

  handleOpening() {
    this.drawer.open = !this.drawer.open;
  }

  mountChildren() {
    this.search = new SearchComponent(this.searchPoint);
    this.search.mount();
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.addEventListeners();
    this.mountChildren();
  }

  render() {
    return `
      <header class="mdc-top-app-bar app-bar" id="app-bar">
        <div class="mdc-top-app-bar__row">
          <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
            <a href="#" class="demo-menu material-icons mdc-top-app-bar__navigation-icon">menu</a>
            <span class="mdc-top-app-bar__title">Spotty</span>
          </section>
          <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">

          </section>
        </div>
      </header>
    `;
  }
}
