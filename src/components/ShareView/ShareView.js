import { MDCRipple } from "@material/ripple";
import shareViewTemplate from "./ShareView.html";

export class ShareViewComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.shareViewRiplePoint = this.mountPoint.querySelector(
      ".share-view__card-riple"
    );
  }

  initMaterial() {
    this.cardRipple = new MDCRipple(this.shareViewRiplePoint);
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.initMaterial();
  }

  render() {
    return shareViewTemplate();
  }
}
