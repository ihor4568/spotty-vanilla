import mySongs from "./MySongs.html";
import { SongsTableComponent } from "../SongsTable/SongsTable";
import { MusicService } from "../../services/MusicService";
import { AuthService } from "../../services/AuthService";

export class MySongsComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
    this.songs = [];
    this.isDataFetched = false;
  }

  querySelectors() {
    this.tableContainer = this.mountPoint.querySelector(
      ".my-songs__table-container"
    );
  }

  fetchAuthors(authorsIds) {
    return Promise.all(
      authorsIds.map(authorId => MusicService.getAuthorById(authorId))
    );
  }

  fetchInfoBySong(song) {
    const albumPromise = MusicService.getAlbumById(song.albumId);
    const authorsPromise = this.fetchAuthors(song.authors);

    return Promise.all([albumPromise, authorsPromise]);
  }

  fetchSongs() {
    const userId = AuthService.getCurrentUser().uid;
    MusicService.getUserSongs(userId)
      .then(songs => {
        this.songs = songs;

        return Promise.all(this.songs.map(song => this.fetchInfoBySong(song)));
      })
      .then(songsInfo => {
        songsInfo.forEach((item, i) => {
          const [album, authorsInfo] = item;

          this.songs[i].album = album;
          this.songs[i].authorsInfo = authorsInfo;
        });
        this.isDataFetched = true;
        this.mount(false);
      });
  }

  changeStateSong(songId, isPlaying) {
    this.playingSongId = isPlaying ? songId : null;
    if (this.mountPoint.querySelector(".my-songs")) {
      this.table.changeStateSong(songId, isPlaying);
    }
  }

  handleRemoveSong(songId) {
    MusicService.removeUserSong(AuthService.getCurrentUser().uid, songId).then(
      () => this.mount()
    );
  }

  addSong() {
    if (this.mountPoint.querySelector(".my-songs")) {
      this.mount();
    }
  }

  mountChildren() {
    this.table = new SongsTableComponent(this.tableContainer, {
      onDrag: true,
      data: this.songs,
      onSongPlay: this.props.onSongPlay,
      onSongStop: this.props.onSongStop,
      onSongRemove: this.handleRemoveSong.bind(this),
      onDialogOpen: this.props.onDialogOpen,
      onLegalOptionClick: this.props.onLegalOptionClick,
      playingSongId: this.playingSongId
    });
    this.table.mount();
  }

  mount(shouldFetchData = true) {
    if (shouldFetchData) {
      this.fetchSongs();
    }
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    if (this.songs.length) {
      this.mountChildren();
    }
  }

  render() {
    return mySongs({
      isDataFetched: this.isDataFetched,
      hasSongs: this.songs.length
    });
  }
}
