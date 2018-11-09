import { MusicService } from "../../services/MusicService";
import { SongsTableComponent } from "../SongsTable/SongsTable";
import artistSongTable from "./ArtistSongTable.html";

export class ArtistSongTableComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
    this.state = {
      artist: [],
      imageUrl: [],
      id: []
    };
    this.songs = [];
  }

  querySelectors() {
    this.tableContainer = this.mountPoint.querySelector(".table-container");
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

  getArtistFromUrl() {
    const pathNameParts = window.location.href.split("/");
    return pathNameParts[pathNameParts.length - 1];
  }

  fetchSongs() {
    const artistId = this.getArtistFromUrl();

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

        this.mount(false);
      });
  }

  changeStateSong(songId, isPlaying) {
    this.playingSongId = isPlaying ? songId : null;
    if (this.mountPoint.querySelector(".table-container")) {
      this.table.changeStateSong(songId, isPlaying);
    }
  }

  fetchArtist() {
    const artistId = this.getArtistFromUrl();
    MusicService.getAuthorById(artistId).then(artist => {
      this.state.artist = artist.name;
      this.state.imageUrl = artist.imageURL;
      this.state.id = artist.id;
      this.mount(false);
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

  mount(shouldFetchData = true) {
    if (shouldFetchData) {
      this.fetchArtist();
      this.fetchSongs();
      return;
    }
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.mountChildren();
  }

  render() {
    return artistSongTable(this.state);
  }
}
