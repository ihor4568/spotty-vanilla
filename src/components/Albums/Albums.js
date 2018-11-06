import { MDCRipple } from "@material/ripple";

import albumsTemplate from "./Albums.html";
import { MusicService } from "../../services/MusicService";

export class AlbumsComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
    this.state = {
      initialData: null,
      filteredData: null
    };
  }

  querySelectors() {
    this.albumRipplePoint = this.mountPoint.querySelectorAll(
      ".albums__card-ripple-effect"
    );
  }

  initMaterial() {
    Array.from(this.albumRipplePoint).forEach(item => {
      // eslint-disable-next-line no-new
      new MDCRipple(item);
    });
  }

  fetchAlbumsCollectionData() {
    Promise.all([MusicService.getAlbums(), MusicService.getAuthors()]).then(
      ([albums, authors]) => {
        this.state.initialData = albums.map(album => ({
          ...album,
          authors: album.authors
            .map(author => this.getArtistNameById(authors, author))
            .join(", ")
        }));
        this.state.filteredData = [...this.state.initialData];
        this.mount(false);
      }
    );
  }

  getArtistNameById(authors, id) {
    return authors.find(author => author.id === id).name;
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
    return albumsTemplate({ data: this.state.filteredData });
  }
}
