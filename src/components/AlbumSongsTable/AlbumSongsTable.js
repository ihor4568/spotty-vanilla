import albumSongsTable from "./AlbumSongsTable.html";
import { MusicService } from "../../services/MusicService";
import { SongsTableComponent } from "../SongsTable/SongsTable";

export class AlbumSongsTableComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;

    this.state = {
      title: null,
      authors: null,
      imageURL: null
    };
    this.songs = [];
  }

  querySelectors() {
    this.albumSongsTable = this.mountPoint.querySelector(
      ".album-songs-table__container"
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

  fetchSongs(albumId) {
    MusicService.getAlbumSongs(albumId)
      .then(songs => {
        this.songs = songs;

        return Promise.all(this.songs.map(song => this.fetchInfoBySong(song)));
      })
      .then(songsInfo => {
        songsInfo.forEach((item, i) => {
          const [album, authorsInfo] = item;
          this.state.imageURL = album.imageURL;
          this.state.title = album.name;
          this.songs[i].album = album;
          this.songs[i].authorsInfo = authorsInfo;
        });
        this.mount(false);
      });
  }

  fetchAuthorForTitle(albumId) {
    Promise.all([MusicService.getAlbums(), MusicService.getAuthors()]).then(
      ([albums, authors]) => this.fetchAuthorsString([albums, authors], albumId)
    );
  }

  fetchAuthorsString([albums, authors], albumId) {
    albums.forEach(album => {
      if (album.id === albumId) {
        this.state.authors = album.authors
          .map(author => this.getArtistNameById(authors, author))
          .join(", ");
      }
    });
  }

  getArtistNameById(authors, id) {
    return authors.find(author => author.id === id).name;
  }

  changeStateSong(songId, isPlaying) {
    this.playingSongId = isPlaying ? songId : null;
    if (this.mountPoint.querySelector(".album-songs-table__container")) {
      this.albumSongs.changeStateSong(songId, isPlaying);
    }
  }

  mountChildren() {
    this.albumSongs = new SongsTableComponent(this.albumSongsTable, {
      data: this.songs,
      onSongPlay: this.props.onSongPlay,
      onSongStop: this.props.onSongStop,
      playingSongId: this.playingSongId
    });
    this.albumSongs.mount();
  }

  mount(albumId) {
    if (albumId) {
      this.fetchSongs(albumId);
      this.fetchAuthorForTitle(albumId);
      return;
    }
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.mountChildren();
    this.changeStateSong();
  }

  render() {
    return albumSongsTable(this.state);
  }
}
