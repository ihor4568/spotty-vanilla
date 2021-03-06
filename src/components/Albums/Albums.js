import { MDCRipple } from "@material/ripple";

import albumsTemplate from "./Albums.html";
import { MusicService } from "../../services/MusicService";
import { SearchFunctionalityProviderComponent } from "../SearchFunctionalityProvider/SearchFunctionalityProvider";
import { Loader } from "../Loader/Loader";

export class AlbumsComponent extends SearchFunctionalityProviderComponent {
  constructor(mountPoint, props = {}) {
    super();
    this.mountPoint = mountPoint;
    this.props = props;
    this.state = {
      isFetching: false,
      initialData: null,
      filteredData: null
    };
  }

  handleSearchQuery(term) {
    super.handleSearchQuery.call(this, term);
    this.mount(false);
  }

  querySelectors() {
    if (this.state.isFetching) {
      this.loaderContainer = this.mountPoint.querySelector(".artists__loader");
    } else {
      this.loaderContainer = null;
    }
    this.albumRipplePoint = this.mountPoint.querySelectorAll(
      ".albums__card-ripple-effect"
    );
    this.albumsContainer = this.mountPoint.querySelector(".albums__container");
  }

  initMaterial() {
    Array.from(this.albumRipplePoint).forEach(el => {
      // eslint-disable-next-line no-new
      new MDCRipple(el);
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
        this.state.isFetching = false;
        this.mount(false);
      }
    );
  }

  getArtistNameById(authors, id) {
    return authors.find(author => author.id === id).name;
  }

  addEventsListeners() {
    if (!this.state.isFetching) {
      this.albumsContainer.addEventListener("click", e => {
        const album = e.target.closest(".albums__card");
        if (album) {
          const albumId = album.dataset.id;
          this.props.onAlbumClick(albumId);
        }
      });
    }
  }

  mount(shouldFetchData = true) {
    if (shouldFetchData) {
      this.state.isFetching = true;
      this.fetchAlbumsCollectionData();
    }
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.mountLoader();
    this.initMaterial();
    this.addEventsListeners();
  }

  mountLoader() {
    if (this.state.isFetching) {
      this.loader = new Loader(this.loaderContainer);
      this.loader.mount();
    } else {
      this.loader = null;
    }
  }

  render() {
    const { isFetching, filteredData } = this.state;
    return albumsTemplate({
      isFetching,
      albums: filteredData
    });
  }
}
