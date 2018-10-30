import { AlbumCard } from "../AlbumListItem/AlbumCard";
import albumListTemplate from "./AlbumList.html";

export class AlbumList {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  querySelectors() {
    this.albumsList = this.mountPoint.querySelector(".album-list__container");
  }

  mountChildren() {
    this.albumItem = new AlbumCard(this.albumsList);
    this.albumItem.mount();
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.mountChildren();
  }

  render() {
    return albumListTemplate();
  }
}
