import { MDCRipple } from "@material/ripple";
import SharingSongTemplate from "./SharingSong.html";

export class SharingSongComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  initMaterialCard() {
    const cardRipple = new MDCRipple(
      this.mountPoint.querySelector(".share-view__card-riple")
    );
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.initMaterialCard();
  }

  render() {
    return SharingSongTemplate();
  }
}
