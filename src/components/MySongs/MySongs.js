import mySongs from "./MySongs.html";
import { SongsTableComponent } from "../SongsTable/SongsTable";
import { MusicService } from "../../services/MusicService";

export class MySongsComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
<<<<<<< HEAD
    this.state = {
      initialData: TABLE_DATA,
      filteredData: TABLE_DATA
    };
=======
    this.songs = [];
>>>>>>> master
  }

  querySelectors() {
    this.tableContainer = this.mountPoint.querySelector(
      ".my-songs__table-container"
    );
  }

<<<<<<< HEAD
  mountChildren(data) {
    this.table = new SongsTableComponent(this.tableContainer, {
      data
=======
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
    MusicService.getAlbumSongs("album1")
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

        this.mount(false);
      });
  }

  mountChildren() {
    this.table = new SongsTableComponent(this.tableContainer, {
      data: this.songs,
      onSongPlay: this.props.onSongPlay
>>>>>>> master
    });
    this.table.mount();
  }

<<<<<<< HEAD
  mount(data = [...this.state.initialData]) {
=======
  mount(shouldFetchData = true) {
    if (shouldFetchData) {
      this.fetchSongs();
    }
>>>>>>> master
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.mountChildren(data);
  }

  render() {
    return mySongs();
  }
}
