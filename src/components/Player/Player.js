import playerTemplate from "./Player.html";
import { SearchComponent } from "../Search/Search";
import { DotsMenuComponent } from "../DotsMenu/DotsMenu";

export class PlayerComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  querySelectors() {
    this.dotsMenuPoint = this.mountPoint.querySelector(".dots-menu-container");
  }

  mountChildren() {
    this.dotsMenu = new DotsMenuComponent(this.dotsMenuPoint, {
      items: [
        { name: "Add to my songs", handler: () => {} },
        { name: "Lyrics", handler: () => {} },
        { name: "Share", handler: () => {} }
      ]
    });
    this.dotsMenu.mount();
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.mountChildren();
  }

  render() {
    return playerTemplate();
  }
}
