import { AlbumListItemComponent } from "../AlbumListItemComponent/AlbumListItemComponent";
import AlbumList from "./AlbumList.html";

export class AlbumListComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  querySelectors() {
    this.albumsList = this.mountPoint.querySelector(".albums__list");
  }

  mountChildren() {
    this.albumItem = new AlbumListItemComponent(this.albumsList);
    this.albumItem.mount();
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.mountChildren();
  }

  render() {
    return AlbumList();
  }
}
