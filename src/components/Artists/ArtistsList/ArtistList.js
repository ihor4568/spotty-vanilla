import { ArtistItemComponent } from "../ArtistsItem/ArtistItem";
import ArtistListTemplate from "./ArtistList.html";
import { ArtistData } from "./ArtistData";

export class ArtistListComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  querySelectors() {
    this.artistList = this.mountPoint.querySelector(".artist__container");
  }

  mountChildren() {
    ArtistData.forEach(item => {
      this.artistItem = new ArtistItemComponent(this.artistList, item);
      this.artistItem.mount();
    });
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.mountChildren();
  }

  render() {
    return ArtistListTemplate();
  }
}
