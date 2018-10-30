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

  initMaterial() {
    const cardRipple = this.mountPoint.querySelectorAll(
      ".album-card__card-ripple-effect"
    );
    Array.from(cardRipple).forEach(el => {
      new MDCRipple(el);
    });
  }

  setAlbumsDescriptions() {
    this.props = {
      albumName: this.props.album.albumName,
      artistName: this.props.album.artistName,
      sourceImage: this.props.album.sourceImage
    };
  }

  mount() {
    this.mountPoint.innerHTML += this.render();
    this.initMaterial();
  }

  render() {
    this.setAlbumsDescriptions();
    return albumCardTemplate(this.props);
  }
}
