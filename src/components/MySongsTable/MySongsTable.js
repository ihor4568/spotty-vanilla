import { MDCRipple } from "@material/ripple";
import mySongsTableTemplate from "./MySongsTable.html";
import { DotsMenuComponent } from "../DotsMenu/DotsMenu";

export class MySongsTableComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.iconButtonRipple = this.mountPoint.querySelectorAll(
      ".mdc-icon-button"
    );
    this.dotsMenuPoints = this.mountPoint.querySelectorAll(
      ".my-songs-table__td_more"
    );
  }

  mountChildren() {
    Array.from(this.dotsMenuPoints).forEach(item => {
      this.dotsMenuPoints = new DotsMenuComponent(item, {
        items: [
          { name: "Remove from my songs", handler: () => {} },
          { name: "Share", handler: () => {} }
        ]
      });
      this.dotsMenuPoints.mount();
    });
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
    this.mountChildren();
  }

  render() {
    return mySongsTableTemplate({ tableData: this.props.tableData });
  }
}
