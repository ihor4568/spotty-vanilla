import { MDCRipple } from "@material/ripple";
import artistsTemplate from "./Artists.html";

const ARTISTS_DATA = [
  {
    name: "Nicki Minaj",
    cover: "https://bit.ly/2Q4xgEZ",
    link: "https://www.instagram.com/nickiminaj/"
  },
  {
    name: "Eminem",
    cover: "https://bit.ly/2Q4xqfz",
    link: "https://www.instagram.com/eminem/"
  },
  {
    name: "50 Cent",
    cover: "https://bit.ly/2yGMtWs",
    link: "https://www.instagram.com/50cent/"
  },
  {
    name: "Dr. Dre",
    cover: "https://bit.ly/2DeyScx",
    link: "https://www.instagram.com/drdre/"
  },
  {
    name: "Ice Cube",
    cover: "https://bit.ly/2CRLPZ4",
    link: "https://www.instagram.com/icecube/"
  },
  {
    name: "Tech N9ne",
    cover: "https://bit.ly/2OmMUKA",
    link: "https://www.instagram.com/therealtechn9ne/"
  },
  {
    name: "Redman",
    cover: "https://bit.ly/2CQCsbQ",
    link: "https://www.instagram.com/redmangilla/"
  },
  {
    name: "Cassidy",
    cover: "https://bit.ly/2PxjNJ3",
    link: "https://www.instagram.com/cassidy_larsiny/"
  },
  {
    name: "Busta Rhymes",
    cover: "https://bit.ly/2QeXJQE",
    link: "https://www.instagram.com/bustarhymes/"
  },
  {
    name: "Dizaster",
    cover: "https://bit.ly/2RpRDgk",
    link: "https://www.instagram.com/mrdizaster/"
  }
];

export class ArtistsComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
    this.artistsData = ARTISTS_DATA;
  }

  querySelectors() {
    this.cardRipple = this.mountPoint.querySelectorAll(".artist__ripple");
  }

  initMaterial() {
    Array.from(this.cardRipple).forEach(item => {
      this.cardRipple = new MDCRipple(item);
    });
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.initMaterial();
  }

  render() {
    return artistsTemplate({ artistsData: this.artistsData });
  }
}
