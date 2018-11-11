import { MDCRipple } from "@material/ripple";
import shareViewTemplate from "./ShareView.html";

const SONG = {
  albumName: "Loud",
  artistName: "by Rihanna",
  imageSource: "https://image.ibb.co/k4Qc8L/rihanna-loud.jpg"
};

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

  setSongId(songId) {
    this.songId = songId;
  }

  initMaterial() {
    // eslint-disable-next-line no-new
    new MDCRipple(this.shareViewRiplePoint);
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.initMaterial();
  }

  render() {
    return shareViewTemplate(SONG);
  }
}
