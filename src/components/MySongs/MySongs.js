import mySongsTemplate from "./MySongs.html";
import { SongsTableComponent } from "../SongsTable/SongsTable";
import { MusicService } from "../../services/MusicService";
import { AuthService } from "../../services/AuthService";
import { SearchFunctionalityProviderComponent } from "../SearchFunctionalityProvider/SearchFunctionalityProvider";

export class MySongsComponent extends SearchFunctionalityProviderComponent {
  constructor(mountPoint, props = {}) {
    super();
    this.mountPoint = mountPoint;
    this.props = props;
    this.state = {
      initialData: null,
      filteredData: null
    };
  }

  handleSearchQuery(term) {
    super.handleSearchQuery.call(this, term);
    this.mount(false, this.state.filteredData);
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
    return MusicService.getUserSongs(userId)
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
        this.isDataFetched = true;
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

  mountChildren(data) {
    this.table = new SongsTableComponent(this.tableContainer, {
      data,
      dragAndDrop: true,
      onSongPlay: this.props.onSongPlay,
      onSongStop: this.props.onSongStop,
      onSongRemove: this.handleRemoveSong.bind(this),
      onDialogOpen: this.props.onDialogOpen,
      onLegalOptionClick: this.props.onLegalOptionClick,
      playingSongId: this.playingSongId,
      hasRemoveBtn: true
    });
    this.table.mount();
  }

  mount(
    shouldFetchData = true,
    data = this.state.initialData ? [...this.state.initialData] : []
  ) {
    if (shouldFetchData) {
      Promise.resolve(this.fetchSongs())
        .then(() => this.mount(false))
        .then(() => this.props.onDataReceived(this.songs));
      return;
    }
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    if (this.state.initialData.length) {
      this.mountChildren(data);
    }
  }

  render() {
    return mySongsTemplate({
      isDataFetched: this.isDataFetched,
      hasSongs: this.state.initialData.length
    });
  }
}
