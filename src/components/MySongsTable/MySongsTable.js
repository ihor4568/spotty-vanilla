import { MDCRipple } from "@material/ripple";
import mySongsTableTemplate from "./MySongsTable.html";
import { DotsMenuComponent } from "../DotsMenu/DotsMenu";

const TABLE_DATA = [
  {
    cover: "https://images.unian.net/photos/2017_09/1505748424-6475.jpg",
    name: "Alibaba",
    duration: "9:15",
    artist: "Jazz",
    album: "Super",
    id: 1,
    position: 20
  },
  {
    cover:
      "https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/6b2ef062-6913-4a94-a265-7d75f4f91854/64.jpg",
    name: "Timon and Pumba",
    duration: "9:15",
    artist: "Folk",
    album: "Nice",
    id: 2,
    position: 10
  },
  {
    cover:
      "https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/12/Stargroves-album-cover.png?auto=format&q=60&fit=max&w=930",
    name: "baba",
    duration: "9:15",
    artist: "Sympho",
    album: "The very best",
    id: 3,
    position: 30
  }
];

export class MySongsTableComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
    this.tableData = TABLE_DATA;

    this.cur = null;
    this.selected = null;
  }

  querySelectors() {
    this.iconButtonRipple = this.mountPoint.querySelectorAll(
      ".mdc-icon-button"
    );
    this.dotsMenuPoints = this.mountPoint.querySelectorAll(
      ".my-songs-table__td_more"
    );
    this.rows = this.mountPoint.querySelectorAll(".my-songs-table__row");
    this.tableBody = this.mountPoint.querySelector(".my-songs-table__body");
  }

  mountChildren() {
    Array.from(this.dotsMenuPoints).forEach(item => {
      this.dotsMenuPoints = new DotsMenuComponent(item, {
        items: [
          { name: "Remove from my songs", handler: () => {} },
          { name: "Share", handler: this.handleShare.bind(this) }
        ]
      });
      this.dotsMenuPoints.mount();
    });
  }

  handleShare() {
    window.open("/song/awdklawj");
  }

  // //
  addEventListeners() {
    Array.from(this.rows).forEach(row => {
      row.addEventListener("dragstart", this.dragstart.bind(this));
    });
    this.tableBody.addEventListener("dragover", this.dragover.bind(this));
    this.tableBody.addEventListener("drop", this.drop.bind(this));
  }

  dragstart(e) {
    this.cur = parseInt(e.target.id, 10);
  }

  dragover(e) {
    e.preventDefault();
    const row = e.target.closest(".my-songs-table__row");
    if (row.id) {
      this.selected = parseInt(row.id, 10);
    }
  }

  drop(e) {
    e.preventDefault();

    const curSongId = this.tableData.findIndex(el => el.id === this.cur);
    const selectedSongId = this.tableData.findIndex(
      el => el.id === this.selected
    );

    if (curSongId !== -1 && selectedSongId !== -1) {
      const curPos = this.tableData[curSongId].position;
      this.tableData[curSongId].position = this.tableData[
        selectedSongId
      ].position;
      this.tableData[selectedSongId].position = curPos;

      this.mount();
    }
  }

  // //

  initMaterial() {
    Array.from(this.iconButtonRipple).forEach(item => {
      this.iconButtonRipple = new MDCRipple(item);
      this.iconButtonRipple.unbounded = true;
    });
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.initMaterial();
    this.mountChildren();
    this.addEventListeners();
  }

  render() {
    // return mySongsTableTemplate({ tableData: this.tableData });
    return mySongsTableTemplate({
      tableData: this.tableData.sort((a, b) => a.position - b.position)
    });
  }
}
