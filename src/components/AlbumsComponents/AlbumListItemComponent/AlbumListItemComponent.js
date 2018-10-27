import { MDCRipple } from "@material/ripple";
import albumListItemTemplate from "./AlbumListItem.html";

export class AlbumListItemComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  initMaterialCard() {
    const cardRipple = this.mountPoint.querySelectorAll(
      ".albums__card-ripple-effect"
    );
    Array.from(cardRipple).forEach(el => {
      new MDCRipple(el);
    });
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.initMaterialCard();
  }

  render() {
    return albumListItemTemplate();
  }
}
