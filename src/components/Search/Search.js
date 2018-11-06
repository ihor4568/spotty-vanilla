import searchTemplate from "./Search.html";

export class SearchComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.search = this.mountPoint.querySelector(".search");
  }

  addEventListeners() {
    this.search.addEventListener("input", this.props.onSearchQuery);
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.addEventListeners();
  }

  render() {
    return searchTemplate();
  }
}
