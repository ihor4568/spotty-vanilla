import albumSongsTable from "./albumSongsTable.html";
import { MusicService } from "../../services/MusicService";

export class AlbumsSongTableComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;

    this.state = {
      title: null,
      authors: null,
      imageURL: null,
      songs: [],
      isFetching: false
    };
  }

  getAlbumIdFromUrl() {
    const pathnameParts = window.location.href.split("/");
    return pathnameParts[pathnameParts.length - 1];
  }

  fetchAlbumData() {
    const albumId = this.getAlbumIdFromUrl();
    this.state.isFetching = true;

    Promise.all([
      MusicService.getAlbums(),
      MusicService.getAlbumSongs(albumId),
      MusicService.getAuthors()
    ]).then(([albums, songs, authors]) => {
      albums.forEach(album => {
        if (album.id === albumId) {
          this.state = Object.assign(album, {
            authors: album.authors
              .map(author => this.getArtistNameById(authors, author))
              .join(", ")
          });
        }
      });
      this.state.songs = songs;
      this.state.isFetching = false;
      this.mountPoint.innerHTML = this.render();
    });
  }

  getArtistNameById(authors, id) {
    return authors.filter(author => author.id === id)[0].name;
  }

  mount() {
    this.fetchAlbumData();
    this.mountPoint.innerHTML = this.render();
  }

  render() {
    return albumSongsTable(this.state);
  }
}
