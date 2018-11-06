import { MDCRipple } from "@material/ripple";

import albumsTemplate from "./Albums.html";

const TABLE_DATA = [
  {
    name: "Loud",
    artistName: "by Rihanna",
    imageSource: "https://image.ibb.co/k4Qc8L/rihanna-loud.jpg"
  },
  {
    name: "Queen of the clouds",
    artistName: "by Tove Lo",
    imageSource: "https://image.ibb.co/bZSPoL/tove-lo-queenoftheclouds.jpg"
  },
  {
    name: "Perfection is a lie",
    artistName: "by The Hardkiss",
    imageSource: "https://image.ibb.co/ikfNa0/hardkiss-perfectionisalie.jpg"
  },
  {
    name: "Badlands",
    artistName: "by Halsey",
    imageSource: "https://image.ibb.co/btPR2f/halsey-badlands.jpg"
  },
  {
    name: "Dua Lipa",
    artistName: "by Dua Lipa",
    imageSource: "https://image.ibb.co/hPmjoL/dualipa-dualipa.jpg"
  },
  {
    name: "Human",
    artistName: "by Three Days Grace",
    imageSource: "https://image.ibb.co/mWqoF0/three-days-grace-human.jpg"
  },
  {
    name: "Fear",
    artistName: "by Papa Roach",
    imageSource: "https://image.ibb.co/iOLoF0/papa-roach-fear.jpg"
  },
  {
    name: "Reputation",
    artistName: "by Taylor Swift",
    imageSource: "https://image.ibb.co/nfAzNf/taylor-reputation-cr.jpg"
  },
  {
    name: "Waking Up",
    artistName: "by OneRepublic",
    imageSource: "https://image.ibb.co/kk7Dhf/onerepublic-wakingup.jpg"
  },
  {
    name: "Glorious",
    artistName: "by Foxes",
    imageSource: "https://image.ibb.co/iUVATL/foxes-glorious.png"
  },
  {
    name: "My Everything",
    artistName: "by Arianna Grande",
    imageSource: "https://image.ibb.co/jTzR2f/ariannagrande-myeverything.jpg"
  },
  {
    name: "Divide",
    artistName: "by Ed Sheeran",
    imageSource: "https://image.ibb.co/iKPha0/edsheeran-divide.jpg"
  }
];

export class AlbumsComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
    this.state = {
      initialData: TABLE_DATA,
      filteredData: TABLE_DATA
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

  mount(data = [...this.state.initialData]) {
    this.mountPoint.innerHTML = this.render(data);
    this.querySelectors();
    this.initMaterial();
  }

  render(data) {
    return albumsTemplate({ data });
  }
}
