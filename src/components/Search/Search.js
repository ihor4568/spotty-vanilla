import { MDCTextField } from "@material/textfield";
import searchTemplate from "./Search.html";

export class SearchComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
    this.state = {
      term: ""
    };

    this.handleTermChange = this.handleTermChange.bind(this);
  }

  handleTermChange(e) {
    const { onSearchQuery } = this.props;
    this.state.term = e.target.value.toLowerCase();
    onSearchQuery(this.state.term);
  }

  querySelectors() {
    this.search = this.mountPoint.querySelector(".search");
  }

  addEventListeners() {
    this.search.addEventListener("input", this.handleTermChange);
  }

  initMaterial() {
    // eslint-disable-next-line no-new
    new MDCTextField(this.mountPoint.querySelector(".search"));
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.initMaterial();
    this.querySelectors();
    this.addEventListeners();
  }

  render() {
    return searchTemplate();
  }
}
