import { MDCTextField } from "@material/textfield";
import searchTemplate from "./Search.html";

export class SearchComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  initMaterial() {
    // eslint-disable-next-line no-new
    new MDCTextField(this.mountPoint.querySelector(".search"));
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.initMaterial();
  }

  render() {
    return searchTemplate();
  }
}
