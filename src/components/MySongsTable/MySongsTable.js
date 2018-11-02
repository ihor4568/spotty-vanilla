import { MDCRipple } from "@material/ripple";
import mySongsTableTemplate from "./MySongsTable.html";

export class MySongsTableComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.iconButtonRipple = this.mountPoint.querySelectorAll(
      ".mdc-icon-button"
    );
  }

  initMaterial() {
    Array.from(this.iconButtonRipple).forEach(item => {
      this.iconButtonRipple = new MDCRipple(item);
      this.iconButtonRipple.unbounded = true;
    });
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.initMaterial();
  }

  render() {
    return mySongsTableTemplate({ tableData: this.props.tableData });
  }
}
