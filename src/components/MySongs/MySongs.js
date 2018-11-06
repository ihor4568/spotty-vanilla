import mySongs from "./MySongs.html";
import { SongsTableComponent } from "../SongsTable/SongsTable";
import { MusicService } from "../../services/MusicService";

export class MySongsComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
    this.songs = [];
  }

  querySelectors() {
    this.tableContainer = this.mountPoint.querySelector(
      ".my-songs__table-container"
    );
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

  mountChildren() {
    this.table = new SongsTableComponent(this.tableContainer, {
      data: this.songs,
      onSongPlay: this.props.onSongPlay
    });
    this.table.mount();
  }

  mount(shouldFetchData = true) {
    if (shouldFetchData) {
      this.fetchSongs();
    }
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.mountChildren();
  }

  render() {
    return mySongs();
  }
}
