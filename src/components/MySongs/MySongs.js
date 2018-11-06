import mySongs from "./MySongs.html";
import { SongsTableComponent } from "../SongsTable/SongsTable";
import { MusicService } from "../../services/MusicService";

export class MySongsComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
    this.state = {
      initialData: null,
      filteredData: null
    };
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
    MusicService.getAlbumSongs("album1")
      .then(songs => {
        this.state.initialData = songs;

        return Promise.all(
          this.state.initialData.map(song => this.fetchInfoBySong(song))
        );
      })
      .then(songsInfo => {
        songsInfo.forEach((item, i) => {
          const [album, authorsInfo] = item;
          this.state.initialData[i].album = album;
          this.state.initialData[i].authorsInfo = authorsInfo;
        });
        this.state.filteredData = [...this.state.initialData];
        this.mount(false);
      });
  }

  mountChildren(data) {
    this.table = new SongsTableComponent(this.tableContainer, {
      data,
      onSongPlay: this.props.onSongPlay
    });
    this.table.mount();
  }

  mount(
    shouldFetchData = true,
    data = this.state.initialData ? [...this.state.initialData] : []
  ) {
    if (shouldFetchData) {
      this.fetchSongs();
    }
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.mountChildren(data);
  }

  render() {
    return mySongs();
  }
}
