import mySongs from "./MySongs.html";
import { TableComponent } from "../Table/Table";

const TABLE_DATA = [
  {
    cover: "https://images.unian.net/photos/2017_09/1505748424-6475.jpg",
    name: "Alibaba",
    duration: "9:11",
    author: "Jazz",
    album: "Super"
  },
  {
    cover:
      "https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/6b2ef062-6913-4a94-a265-7d75f4f91854/64.jpg",
    name: "Timon and Pumba",
    duration: "9:17",
    author: "Folk",
    album: "Nice"
  },
  {
    cover:
      "https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/12/Stargroves-album-cover.png?auto=format&q=60&fit=max&w=930",
    name: "Alibaba",
    duration: "9:12",
    author: "Sympho",
    album: "The very best"
  }
];

export class MySongsComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.tableContainer = this.mountPoint.querySelector(
      ".my-songs__table-container"
    );
  }

  mountChildren() {
    this.table = new TableComponent(this.tableContainer, { data: TABLE_DATA });
    this.table.mount();
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.mountChildren();
  }

  render() {
    return mySongs();
  }
}
