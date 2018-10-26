import { MDCTextField } from "@material/textfield";
import searchTemplate from "./Search.html";

export class SearchComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  initMaterial() {
    this.textField = new MDCTextField(
      document.querySelector(".search__wrapper")
    );
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.initMaterial();
  }

  render() {
    return searchTemplate();
  }
}
