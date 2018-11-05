import albumSongsTable from "./albumSongsTable.html";
import { MusicService } from "../../services/MusicService";

export class AlbumsSongTableComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;

    this.state = {
      title: null,
      imageURL: null,
      authors: null,
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

    Promise.all([MusicService.getAlbums(), MusicService.getAlbumSongs(albumId)])
      .then(([albums, songs]) => {
        albums.forEach(album => {
          if (album.id === albumId) {
            this.state.title = album.title;
            this.state.authors = album.authors.join(", ");
            this.state.imageURL = album.imageURL;
          }
        });
        this.state.songs = songs;
        this.state.isFetching = false;
        this.mountPoint.innerHTML = this.render();
      })
      .catch(() => {
        this.state.isFetching = false;
      });
  }

  mount() {
    this.fetchAlbumData();
    this.mountPoint.innerHTML = this.render();
  }

  render() {
    return albumSongsTable(this.state);
  }
}
