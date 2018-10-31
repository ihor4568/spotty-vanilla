import { MDCRipple } from "@material/ripple";
import albumCardTemplate from "./AlbumCard.html";

export class AlbumCard {
  constructor(
    mountPoint,
    props = {
      album: {
        albumName: "",
        albumArtist: "",
        sourceImage: ""
      }
    }
  ) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.albumRipplePoint = this.mountPoint.querySelectorAll(
      ".album-card__card-ripple-effect"
    );
  }

  initMaterial() {
    Array.from(this.albumRipplePoint).forEach(el => {
      new MDCRipple(el);
    });
  }

  mount() {
    this.mountPoint.innerHTML += this.render();
    this.querySelectors();
    this.initMaterial();
  }

  render() {
    return albumCardTemplate(this.props.album);
  }
}
