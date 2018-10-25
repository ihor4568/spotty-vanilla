import { MDCRipple } from "@material/ripple";
import artistComponent from "./ArtistComponent.html";

export class ArtistComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  materialJavaScript() {
    const cardRipple = this.mountPoint.querySelectorAll(".mdc-ripple");
    Array.from(cardRipple).forEach(item => {
      new MDCRipple(item);
    });
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.materialJavaScript();
  }

  render() {
    return artistComponent();
  }
}
