import { MDCRipple } from "@material/ripple";
import artistsTemplate from "./Artists.html";

export class ArtistsComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.cardRipple = this.mountPoint.querySelectorAll(".artist__ripple");
  }

  initMaterial() {
    Array.from(this.cardRipple).forEach(item => {
      this.cardRipple = new MDCRipple(item);
    });
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.initMaterial();
  }

  render() {
    return artistsTemplate({ artistsData: this.props.artistsData });
  }
}
