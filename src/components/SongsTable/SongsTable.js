import _ from "lodash";
import { MDCRipple } from "@material/ripple";

import { MusicService } from "../../services/MusicService";

import songsTableTemplate from "./SongsTable.html";
import { DotsMenuComponent } from "../DotsMenu/DotsMenu";

const INITIAL_ORDER = 0;
const ASC_ORDER = 1;
const DESC_ORDER = 2;

const ORDER_TYPES = {
  [INITIAL_ORDER]: "initial",
  [ASC_ORDER]: "asc",
  [DESC_ORDER]: "desc"
};

export class SongsTableComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
    this.state = {
      data: this.fillObjectsWithNumbersAsIndices(this.props.data),
      initialData: this.fillObjectsWithNumbersAsIndices(this.props.data),
      currentOrderTypeIndex: 1,
      columnName: ""
    };
    this.dragElement = null;
    this.handleOrderClick = this.handleOrderClick.bind(this);
    this.playingSongId = this.props.playingSongId;
  }

  fillObjectsWithNumbersAsIndices(array) {
    return array.map((item, index) => ({ ...item, number: index }));
  }

  getColumnName(target) {
    if (target.tagName === "SPAN") {
      return target.firstElementChild.attributes.data.value;
    }
    if (target.tagName === "I" && target.innerHTML !== "watch_later") {
      return target.attributes.data.value;
    }
    return null;
  }

  handleOrderClick(e) {
    const { data, initialData, currentOrderTypeIndex } = this.state;

    this.state.columnName = this.getColumnName(e.target);
    if (!this.state.columnName) {
      return;
    }

    if (currentOrderTypeIndex === INITIAL_ORDER) {
      this.state.data = initialData;
    } else {
      this.state.data = _.orderBy(
        data,
        this.state.columnName,
        ORDER_TYPES[currentOrderTypeIndex]
      );
    }

    this.mount();
  }

  playSong(songId) {
    if (this.playingSongId) {
      this.stopSong();
    }

    const activeRow = this.tableBody.querySelector(`[data-id="${songId}"]`);
    if (activeRow) {
      const activeIconBtn = activeRow.querySelector(
        ".songs-table__td_play-btn-icon"
      );

      activeIconBtn.innerHTML = "pause";
    }

    this.playingSongId = songId;
  }

  stopSong() {
    const activeRow = this.tableBody.querySelector(
      `[data-id="${this.playingSongId}"]`
    );

    if (activeRow) {
      const activeIconBtn = activeRow.querySelector(
        ".songs-table__td_play-btn-icon"
      );
      activeIconBtn.innerHTML = "play_arrow";
    }

    this.playingSongId = null;
  }

  handlePlayClick(e) {
    const target = e.target.closest(".songs-table__td_play-btn");

    if (target) {
      const songId = target.closest(".songs-table__row").dataset.id;

      if (songId === this.playingSongId) {
        this.props.onSongStop();
      } else {
        const song = this.props.data.find(songItem => songItem.id === songId);
        this.props.onSongPlay(song);
      }
    }
  }

  changeStateSong(songId, isPlaying) {
    if (isPlaying) {
      this.playSong(songId);
    } else {
      this.stopSong();
    }
  }

  querySelectors() {
    const { mountPoint } = this;
    this.tableHead = mountPoint.querySelector(".songs-table__head");
    this.iconButtonRipples = mountPoint.querySelectorAll(
      ".songs-table__td_play-btn"
    );
    this.dotsMenu = mountPoint.querySelectorAll(".songs-table__td_more");
    this.orderIcon = mountPoint.querySelector(
      `.songs-table__th-icon_${this.state.columnName}`
    );
    this.tableBody = this.mountPoint.querySelector(".songs-table__body");
    this.tableRows = this.mountPoint.querySelectorAll(".songs-table__row");
  }

  addEventListeners() {
    if (this.tableHead) {
      this.tableHead.addEventListener("click", this.handleOrderClick);
      if (this.props.dragAndDrop) {
        this.tableBody.addEventListener(
          "dragstart",
          this.handleDragStart.bind(this)
        );
        this.tableBody.addEventListener("drop", this.handleDrop.bind(this));
        this.tableBody.addEventListener(
          "dragover",
          this.handleDragOver.bind(this)
        );
      }
      this.tableBody.addEventListener("click", this.handlePlayClick.bind(this));
    }
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

  handleDragStart(e) {
    this.dragElement = e.target;
  }

  handleDrop(e) {
    e.preventDefault();
    this.querySelectors();
    const songsTable = Array.from(this.tableRows).map(item =>
      item.getAttribute("data-id")
    );
    MusicService.changeSongsOrder(songsTable);
  }

  handleDragOver(e) {
    e.preventDefault();
    const dragOverRow = e.target.closest(".songs-table__row");
    if (this.isBefore(this.dragElement, dragOverRow)) {
      dragOverRow.parentNode.insertBefore(this.dragElement, dragOverRow);
    } else {
      dragOverRow.parentNode.insertBefore(
        this.dragElement,
        dragOverRow.nextSibling
      );
    }
  }

  handleRemoveSong(song) {
    this.props.onSongRemove(song.id);
  }

  setupOrderIconDisplay() {
    const { currentOrderTypeIndex } = this.state;

    if (!this.state.columnName) {
      return;
    }

    if (currentOrderTypeIndex === ASC_ORDER) {
      this.orderIcon.classList.add("songs-table__th-icon_order_asc");
    } else if (currentOrderTypeIndex === DESC_ORDER) {
      this.orderIcon.classList.add("songs-table__th-icon_order_desc");
    }

    this.changeCurrentOrderTypeIndex();
  }

  changeCurrentOrderTypeIndex() {
    if (this.state.currentOrderTypeIndex === DESC_ORDER) {
      this.state.currentOrderTypeIndex = INITIAL_ORDER;
      return;
    }
    this.state.currentOrderTypeIndex += 1;
  }

  handleLegal(data) {
    this.props.onLegalOptionClick({
      licenseInfo: data.album.licenseInfo,
      licenseURL: data.album.licenseURL
    });
    this.props.onDialogOpen();
  }

  mountChildren() {
    Array.from(this.dotsMenu).forEach((item, i) => {
      new DotsMenuComponent(item, {
        items: [
          {
            name: "Legal info",
            handler: this.handleLegal.bind(this, this.state.data[i])
          },
          {
            name: "Remove from my songs",
            handler: this.handleRemoveSong.bind(this, this.state.data[i])
          },
          {
            name: "Share",
            handler: this.handleShare.bind(this, this.state.data[i])
          }
        ]
      }).mount();
    });
  }

  handleShare(data) {
    window.open(`/song/${data.id}`);
  }

  initMaterial() {
    Array.from(this.iconButtonRipples).forEach(item => {
      new MDCRipple(item); // eslint-disable-line no-new
    });
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.addEventListeners();
    this.setupOrderIconDisplay();
    this.initMaterial();
    this.mountChildren();
  }

  render() {
    return songsTableTemplate({
      data: this.state.data,
      playingSongId: this.playingSongId
    });
  }
}
