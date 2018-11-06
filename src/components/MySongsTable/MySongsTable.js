import { MDCRipple } from "@material/ripple";
import mySongsTableTemplate from "./MySongsTable.html";
import { DotsMenuComponent } from "../DotsMenu/DotsMenu";
import { MusicService } from "../../services/MusicService";

export class MySongsTableComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
    this.songs = [];
  }

  querySelectors() {
    this.table = this.mountPoint.querySelector(".my-songs-table__table");
    this.iconButtonRipple = this.mountPoint.querySelectorAll(
      ".mdc-icon-button"
    );
    this.dotsMenuPoints = this.mountPoint.querySelectorAll(
      ".my-songs-table__td_more"
    );
  }

  addEventListeners() {
    this.table.addEventListener("click", this.handlePlayClick.bind(this));
  }

  handlePlayClick(e) {
    const target = e.target.closest(".my-songs-table__td_play-btn");
    if (target) {
      const songId = target.closest(".my-songs-table__row").dataset.id;
      const song = this.songs.find(songItem => songItem.id === songId);
      this.props.onSongPlay(song);
    }
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

  initMaterial() {
    Array.from(this.iconButtonRipple).forEach(item => {
      this.iconButtonRipple = new MDCRipple(item);
      this.iconButtonRipple.unbounded = true;
    });
  }

  fetchSongs() {
    MusicService.getAlbumSongs("album1").then(songs => {
      this.songs = songs;

      Promise.all(
        this.songs.map(song => {
          const albumPromise = MusicService.getAlbumById(song.albumId);
          const authorsPromise = Promise.all(
            song.authors.map(authorId => MusicService.getAuthorById(authorId))
          );

          const songInfoPromises = Promise.all([albumPromise, authorsPromise]);
          songInfoPromises.then(([album, authors]) => {
            /* eslint-disable no-param-reassign */
            song.album = album;
            song.authorsInfo = authors;
            /* eslint-enable no-param-reassign */
          });

          return songInfoPromises;
        })
      ).then(() => this.mount(false));
    });
  }

  mount(shouldFetchData = true) {
    if (shouldFetchData) {
      this.fetchSongs();
    }
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.initMaterial();
    this.mountChildren();
    this.addEventListeners();
  }

  render() {
    return mySongsTableTemplate({ tableData: this.songs });
  }
}
