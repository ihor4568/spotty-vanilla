import { MDCRipple } from "@material/ripple";
import mySongsTableTemplate from "./MySongsTable.html";
import { DotsMenuComponent } from "../DotsMenu/DotsMenu";

const TABLE_DATA = [
  {
    cover: "https://images.unian.net/photos/2017_09/1505748424-6475.jpg",
    name: "Alibaba",
    duration: "9:15",
    artist: "Jazz",
    album: "Super"
  },
  {
    cover:
      "https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/6b2ef062-6913-4a94-a265-7d75f4f91854/64.jpg",
    name: "Timon and Pumba",
    duration: "9:15",
    artist: "Folk",
    album: "Nice"
  },
  {
    cover:
      "https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/12/Stargroves-album-cover.png?auto=format&q=60&fit=max&w=930",
    name: "Alibaba",
    duration: "9:15",
    artist: "Sympho",
    album: "The very best"
  }
];

export class MySongsTableComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
    this.tableData = TABLE_DATA;
    this.dragElement = null;
  }

  querySelectors() {
    this.iconButtonRipple = this.mountPoint.querySelectorAll(
      ".mdc-icon-button"
    );
    this.dotsMenuPoints = this.mountPoint.querySelectorAll(
      ".my-songs-table__td_more"
    );
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

  addEventListeners() {
    this.tableBody.addEventListener("dragover", this.onDragOver.bind(this));
    this.tableBody.addEventListener("dragstart", this.onDragStart.bind(this));
  }

  isBefore(el1, el2) {
    if (el2.parentNode === el1.parentNode) {
      for (
        let currentDragElement = el1.previousSibling;
        currentDragElement;
        currentDragElement = currentDragElement.previousSibling
      ) {
        if (currentDragElement === el2) {
          return true;
        }
      }
    }
    return false;
  }

  onDragStart(e) {
    this.dragElement = e.target;
  }

  onDragOver(e) {
    e.preventDefault();
    const dragOverRow = e.target.closest(".my-songs-table__row");
    if (this.isBefore(this.dragElement, dragOverRow)) {
      dragOverRow.parentNode.insertBefore(this.dragElement, dragOverRow);
    } else {
      dragOverRow.parentNode.insertBefore(
        this.dragElement,
        dragOverRow.nextSibling
      );
    }
  }

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
    return mySongsTableTemplate({ tableData: this.tableData });
  }
}
