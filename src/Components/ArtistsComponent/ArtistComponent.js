import { MDCRipple } from "@material/ripple";
import artistComponentTemplate from "./ArtistComponent.html";

export class ArtistComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  initMaterial() {
    const cardRipple = this.mountPoint.querySelectorAll(".artist_ripple");
    Array.from(cardRipple).forEach(item => {
      new MDCRipple(item);
    });
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.initMaterial();
  }

  render() {
    return artistComponentTemplate();
  }
}
