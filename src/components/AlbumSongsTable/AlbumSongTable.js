import albumSongsTable from "./albumSongsTable.html";
import { MusicService } from "../../services/MusicService";
import { SongsTableComponent } from "../SongsTable/SongsTable";

export class AlbumsSongTableComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;

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

  fetchSongs() {
    MusicService.getAlbumSongs(this.getAlbumIdFromUrl())
      .then(songs => {
        this.songs = songs;

        return Promise.all(this.songs.map(song => this.fetchInfoBySong(song)));
      })
      .then(songsInfo => {
        songsInfo.forEach((item, i) => {
          const [album, authorsInfo] = item;
          this.state.imageURL = album.imageURL;
          this.state.title = album.title;
          this.songs[i].album = album;
          this.songs[i].authorsInfo = authorsInfo;
        });
        this.mount(false);
      });
  }

  getAlbumIdFromUrl() {
    const pathnameParts = window.location.href.split("/");
    return pathnameParts[pathnameParts.length - 1];
  }

  fetchAuthorForTitle() {
    const albumId = this.getAlbumIdFromUrl();
    Promise.all([MusicService.getAlbums(), MusicService.getAuthors()]).then(
      ([albums, authors]) => {
        albums.forEach(album => {
          if (album.id === albumId) {
            this.state.authors = album.authors
              .map(author => this.getArtistNameById(authors, author))
              .join(", ");
          }
        });
      }
    );
  }

  getArtistNameById(authors, id) {
    return authors.filter(author => author.id === id)[0].name;
  }

  mountChildren() {
    this.table = new SongsTableComponent(this.albumSongsTable, {
      data: this.songs
    });
    this.table.mount();
  }

  mount(shouldFetchData = true) {
    if (shouldFetchData) {
      this.fetchSongs();
    }
    this.mountPoint.innerHTML = this.render();
    this.fetchAuthorForTitle();
    this.querySelectors();
    this.mountChildren();
  }

  render() {
    return albumSongsTable(this.state);
  }
}
