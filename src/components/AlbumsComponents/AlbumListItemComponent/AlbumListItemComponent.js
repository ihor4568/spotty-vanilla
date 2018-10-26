import { MDCRipple } from "@material/ripple";
import AlbumListItem from "./AlbumListItem.html";

export class AlbumListItemComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  initMaterialCard() {
    const cardRipple = document.querySelectorAll(".mdc-card__primary-action");
    Array.from(cardRipple).forEach(el => {
      new MDCRipple(el);
    });
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.initMaterialCard();
  }

  render() {
    return AlbumListItem();
  }
}
