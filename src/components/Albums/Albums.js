import { MDCRipple } from "@material/ripple";

import albumsTemplate from "./Albums.html";
import { MusicService } from "../../services/MusicService";

export class AlbumsComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
    this.state = {
      isFetching: false,
      albums: []
    };
  }

  querySelectors() {
    this.albumRipplePoint = this.mountPoint.querySelectorAll(
      ".albums__card-ripple-effect"
    );
  }

  initMaterial() {
    Array.from(this.albumRipplePoint).forEach(el => {
      this.albumRipplePoint = new MDCRipple(el);
    });
  }

  fetchAlbumsCollectionData() {
    this.state.isFetching = true;
    Promise.all([MusicService.getAlbums(), MusicService.getAuthors()]).then(
      ([albums, authors]) => {
        this.state.albums = albums.map(album =>
          Object.assign(album, {
            authors: album.authors
              .map(author => this.getArtistNameById(authors, author))
              .join(", ")
          })
        );
        this.state.isFetching = false;
        this.mount(false);
      }
    );
  }

  getArtistNameById(authors, id) {
    return authors.filter(author => author.id === id)[0].name;
  }

  mount(shouldFetchData = true) {
    if (shouldFetchData) {
      this.fetchAlbumsCollectionData();
    }
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.initMaterial();
  }

  render() {
    return albumsTemplate(this.state);
  }
}
