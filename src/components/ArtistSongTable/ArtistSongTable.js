import { MusicService } from "../../services/MusicService";
import { SongsTableComponent } from "../SongsTable/SongsTable";
import artistSongTable from "./ArtistSongTable.html";

export class ArtistSongTableComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
    this.state = {
      artist: [],
      imageUrl: []
    };
    this.songs = [];
  }

  querySelectors() {
    this.tableContainer = this.mountPoint.querySelector(
      ".artist-song-table__table-container"
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

  fetchSongs(artistId) {
    MusicService.getAuthorSongs(artistId)
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

        this.mount();
      });
  }

  changeStateSong(songId, isPlaying) {
    this.playingSongId = isPlaying ? songId : null;
    if (this.mountPoint.querySelector(".artist-song-table__table-container")) {
      this.table.changeStateSong(songId, isPlaying);
    }
  }

  fetchArtist(artistId) {
    MusicService.getAuthorById(artistId).then(artist => {
      this.state.artist = artist.name;
      this.state.imageUrl = artist.imageURL;
    });
  }

  mountChildren() {
    this.table = new SongsTableComponent(this.tableContainer, {
      data: this.songs,
      onSongPlay: this.props.onSongPlay,
      onSongStop: this.props.onSongStop,
      playingSongId: this.playingSongId
    });
    this.table.mount();
  }

  mount(artistId) {
    if (artistId) {
      this.fetchArtist(artistId);
      this.fetchSongs(artistId);
      return;
    }
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.mountChildren();
    this.changeStateSong();
  }

  render() {
    return artistSongTable(this.state);
  }
}
