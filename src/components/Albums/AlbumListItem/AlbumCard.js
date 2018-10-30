import { MDCRipple } from "@material/ripple";
import albumListItemTemplate from "./AlbumCard.html";

export class AlbumCard {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  initMaterial() {
    const cardRipple = this.mountPoint.querySelectorAll(
      ".album-card__card-ripple-effect"
    );
    Array.from(cardRipple).forEach(el => {
      new MDCRipple(el);
    });
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.initMaterial();
  }

  render() {
    return albumListItemTemplate();
  }
}
