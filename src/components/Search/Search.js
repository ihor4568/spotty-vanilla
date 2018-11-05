import { MDCTextField } from "@material/textfield";
import searchTemplate from "./Search.html";

export class SearchComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.searchIcon = this.mountPoint.querySelector(".search__icon");
  }

  addEventListeners() {
    this.searchIcon.addEventListener("click", this.props.onSearchQuery);
  }

  initMaterial() {
    this.textField = new MDCTextField(this.mountPoint.querySelector(".search"));
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.addEventListeners();
    this.initMaterial();
  }

  render() {
    return searchTemplate();
  }
}
