import { MDCRipple } from "@material/ripple";
import ArtistItemTemplate from "./ArtistItem.html";

export class ArtistItemComponent {
  constructor(mountPoint, artistData) {
    this.mountPoint = mountPoint;
    this.artistData = artistData;
  }

  querySelectors() {
    const cardRipple = this.mountPoint.querySelectorAll(".artist_ripple");
    Array.from(cardRipple).forEach(item => {
      new MDCRipple(item);
    });
  }

  mount() {
    this.mountPoint.innerHTML += this.render();
    this.querySelectors();
  }

  render() {
    return ArtistItemTemplate(
      (this.artistData = {
        artistName: this.artistData.name,
        artistCover: this.artistData.cover,
        artistLink: this.artistData.link
      })
    );
  }
}
