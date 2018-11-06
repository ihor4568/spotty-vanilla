import { MDCRipple } from "@material/ripple";

import artistsTemplate from "./Artists.html";

const TABLE_DATA = [
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
  },
  {
    name: "Machine Gun Kelly",
    cover: "https://bit.ly/2PyW0bA",
    link: "https://www.instagram.com/machinegunkelly/"
  },
  {
    name: "Snow Tha Product",
    cover: "https://bit.ly/2qkMUB2",
    link: "https://www.instagram.com/snowthaproduct/"
  }
];

export class ArtistsComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
    this.state = {
      initialData: TABLE_DATA,
      filteredData: TABLE_DATA
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

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.initMaterial();
  }

  render() {
    return artistsTemplate({ data: this.state.filteredData });
  }
}
