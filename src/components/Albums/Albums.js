import { MDCRipple } from "@material/ripple";

import albumsTemplate from "./Albums.html";

const ALBUMS = [
  {
    albumName: "Loud",
    artistName: "by Rihanna",
    imageSource: "https://image.ibb.co/k4Qc8L/rihanna-loud.jpg"
  },
  {
    albumName: "Queen of the clouds",
    artistName: "by Tove Lo",
    imageSource: "https://image.ibb.co/bZSPoL/tove-lo-queenoftheclouds.jpg"
  },
  {
    albumName: "Perfection is a lie",
    artistName: "by The Hardkiss",
    imageSource: "https://image.ibb.co/ikfNa0/hardkiss-perfectionisalie.jpg"
  },
  {
    albumName: "Badlands",
    artistName: "by Halsey",
    imageSource: "https://image.ibb.co/btPR2f/halsey-badlands.jpg"
  },
  {
    albumName: "Dua Lipa",
    artistName: "by Dua Lipa",
    imageSource: "https://image.ibb.co/hPmjoL/dualipa-dualipa.jpg"
  },
  {
    albumName: "Human",
    artistName: "by Three Days Grace",
    imageSource: "https://image.ibb.co/mWqoF0/three-days-grace-human.jpg"
  },
  {
    albumName: "Fear",
    artistName: "by Papa Roach",
    imageSource: "https://image.ibb.co/iOLoF0/papa-roach-fear.jpg"
  },
  {
    albumName: "Reputation",
    artistName: "by Taylor Swift",
    imageSource: "https://image.ibb.co/nfAzNf/taylor-reputation-cr.jpg"
  },
  {
    albumName: "Waking Up",
    artistName: "by OneRepublic",
    imageSource: "https://image.ibb.co/kk7Dhf/onerepublic-wakingup.jpg"
  },
  {
    albumName: "Glorious",
    artistName: "by Foxes",
    imageSource: "https://image.ibb.co/iUVATL/foxes-glorious.png"
  },
  {
    albumName: "My Everything",
    artistName: "by Arianna Grande",
    imageSource: "https://image.ibb.co/jTzR2f/ariannagrande-myeverything.jpg"
  },
  {
    albumName: "Divide",
    artistName: "by Ed Sheeran",
    imageSource: "https://image.ibb.co/iKPha0/edsheeran-divide.jpg"
  }
];

export class AlbumsComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
    this.albums = ALBUMS;
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

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.initMaterial();
  }

  render() {
    return albumsTemplate({ albums: this.albums });
  }
}
