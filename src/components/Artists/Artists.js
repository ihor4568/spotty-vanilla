import { MDCRipple } from "@material/ripple";
import artistsTemplate from "./Artists.html";
import { MusicService } from "../../services/MusicService";
import { SearchFunctionalityProviderComponent } from "../SearchFunctionalityProvider/SearchFunctionalityProvider";

export class ArtistsComponent extends SearchFunctionalityProviderComponent {
  constructor(mountPoint, props = {}) {
    super();
    this.mountPoint = mountPoint;
    this.props = props;
    this.state = {
      initialData: null,
      filteredData: null
    };
  }

  handleSearchQuery(term) {
    super.handleSearchQuery.call(this, term);
    this.mount(false);
  }

  querySelectors() {
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
    this.artistsContainer.addEventListener("click", e => {
      const artistLink = e.target.closest(".artists__link");
      if (artistLink) {
        const artistId = artistLink.dataset.id;
        this.props.onArtistClick(artistId);
      }
    });
  }

  fetchArtistsData() {
    MusicService.getAuthors().then(artists => {
      this.state.initialData = artists;
      this.state.filteredData = [...this.state.initialData];
      this.mount(false);
    });
  }

  mount(shouldFetchData = true) {
    if (shouldFetchData) {
      this.fetchArtistsData();
      return;
    }
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.initMaterial();
    this.addEventListeners();
  }

  render() {
    return artistsTemplate({ artists: this.state.filteredData });
  }
}
