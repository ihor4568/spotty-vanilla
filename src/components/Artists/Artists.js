import { MDCRipple } from "@material/ripple";
import artistsTemplate from "./Artists.html";
import { MusicService } from "../../services/MusicService";

export class ArtistsComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
    this.state = {
      artists: []
    };
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
      e.path.forEach(node => {
        if (node.classList && node.classList.contains("artists__link")) {
          const artistId = node.dataset.id;

          this.props.onArtistClick(artistId);
        }
      });
    });
  }

  fetchArtistsData() {
    MusicService.getAuthors().then(artists => {
      this.state.artists = artists;
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
    return artistsTemplate(this.state);
  }
}
