import { MDCRipple } from "@material/ripple";
import artistsTemplate from "./Artists.html";

const ARTISTS_DATA = [
  {
    name: "Nicki Minaj",
    cover: "https://bit.ly/2AMqZZF",
    link: "https://www.instagram.com/nickiminaj/"
  },
  {
    name: "Eminem",
    cover: "https://bit.ly/2yTJKsR",
    link: "https://www.instagram.com/eminem/"
  },
  {
    name: "50 Cent",
    cover: "https://bit.ly/2SOnUPG",
    link: "https://www.instagram.com/50cent/"
  },
  {
    name: "Dr. Dre",
    cover: "https://bit.ly/2F7nVeJ",
    link: "https://www.instagram.com/drdre/"
  },
  {
    name: "Ice Cube",
    cover: "https://bit.ly/2F6VuOd",
    link: "https://www.instagram.com/icecube/"
  },
  {
    name: "Tech N9ne",
    cover: "https://bit.ly/2OoeZkp",
    link: "https://www.instagram.com/therealtechn9ne/"
  },
  {
    name: "Redman",
    cover: "https://bit.ly/2SQf2c6",
    link: "https://www.instagram.com/redmangilla/"
  },
  {
    name: "Cassidy",
    cover: "https://bit.ly/2D4bD40",
    link: "https://www.instagram.com/cassidy_larsiny/"
  },
  {
    name: "Busta Rhymes",
    cover: "https://bit.ly/2ANhlWL",
    link: "https://www.instagram.com/bustarhymes/"
  },
  {
    name: "Dizaster",
    cover: "https://bit.ly/2AO5g3A",
    link: "https://www.instagram.com/mrdizaster/"
  },
  {
    name: "Machine Gun Kelly",
    cover: "https://bit.ly/2F447ZJ",
    link: "https://www.instagram.com/machinegunkelly/"
  },
  {
    name: "Snow Tha Product",
    cover: "https://bit.ly/2RB2wMf",
    link: "https://www.instagram.com/snowthaproduct/"
  }
];

export class ArtistsComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
    this.artistsData = ARTISTS_DATA;
  }

  querySelectors() {
    this.cardRipple = this.mountPoint.querySelectorAll(".artists__ripple");
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
