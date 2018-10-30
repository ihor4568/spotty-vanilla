import { MDCRipple } from "@material/ripple";
import albumListItemTemplate from "./AlbumCard.html";

export class AlbumCard {
  constructor(
    mountPoint,
    props = {
      album: {}
    }
  ) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  initMaterial() {
    const cardRipple = this.mountPoint.querySelectorAll(
      ".album-card__card-ripple-effect"
    );
    Array.from(cardRipple).forEach(el => {
      new MDCRipple(el);
    });
  }

  mount() {
    this.mountPoint.innerHTML += this.render();
    this.initMaterial();
  }

  render() {
    return albumListItemTemplate(
      (this.props = {
        albumName: this.props.albumName,
        artistName: this.props.artistName,
        sourceImage: this.props.sourceImage
      })
    );
  }
}
