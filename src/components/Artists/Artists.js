import { MDCRipple } from "@material/ripple";

import artistsTemplate from "./Artists.html";
import { MusicService } from "../../services/MusicService";
import loaderTemplate from "../Loader/Loader.html";

export class ArtistsComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
    this.state = {
      initialData: null,
      filteredData: null,
      isFetching: false
    };
  }

  querySelectors() {
    this.cardRipple = this.mountPoint.querySelectorAll(".artists__ripple");
  }

  initMaterial() {
    Array.from(this.cardRipple).forEach(item => {
      // eslint-disable-next-line no-new
      new MDCRipple(item);
    });
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
      this.state.isFetching = shouldFetchData;
      this.fetchArtistsData();
    }
    this.mountPoint.innerHTML = this.render(this.state.isFetching);
    this.querySelectors();
    this.initMaterial();
  }

  render(dataIsFetching) {
    return artistsTemplate({
      dataIsFetching,
      data: this.state.filteredData,
      loader: loaderTemplate()
    });
  }
}
