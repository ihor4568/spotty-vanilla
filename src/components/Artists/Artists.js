import { MDCRipple } from "@material/ripple";

import artistsTemplate from "./Artists.html";
import { MusicService } from "../../services/MusicService";
import { SearchFunctionalityProviderComponent } from "../SearchFunctionalityProvider/SearchFunctionalityProvider";
import { Loader } from "../Loader/Loader";

export class ArtistsComponent extends SearchFunctionalityProviderComponent {
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
    this.cardRipple = this.mountPoint.querySelectorAll(".artists__ripple");
    this.artistsContainer = this.mountPoint.querySelector(
      ".artists__container"
    );
  }

  initMaterial() {
    Array.from(this.cardRipple).forEach(item => {
      // eslint-disable-next-line no-new
      new MDCRipple(item);
    });
  }

  addEventListeners() {
    if (!this.state.isFetching) {
      this.artistsContainer.addEventListener("click", e => {
        const artistLink = e.target.closest(".artists__link");
        if (artistLink) {
          const artistId = artistLink.dataset.id;
          this.props.onArtistClick(artistId);
        }
      });
    }
  }

  fetchArtistsData() {
    MusicService.getAuthors().then(artists => {
      this.state.initialData = artists;
      this.state.filteredData = [...this.state.initialData];
      this.state.isFetching = false;
      this.mount(false);
    });
  }

  mount(shouldFetchData = true) {
    if (shouldFetchData) {
      this.state.isFetching = true;
      this.fetchArtistsData();
    }
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.mountLoader();
    this.initMaterial();
    this.addEventListeners();
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
    return artistsTemplate({
      isFetching,
      artists: filteredData
    });
  }
}
