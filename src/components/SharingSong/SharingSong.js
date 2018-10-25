import { MDCRipple } from "@material/ripple";
import SharingSong from "./SharingSong.html";

export class SharingSongComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  initMaterialCard() {
    const cardRipple = new MDCRipple(
      document.querySelector(".mdc-card__primary-action")
    );
  }

  mount() {
    this.mountPoint.innerHTML += this.render();
    this.initMaterialCard();
  }

  render() {
    return SharingSong();
  }
}
