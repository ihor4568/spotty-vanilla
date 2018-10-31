import { AlbumCard } from "../AlbumCard/AlbumCard";
import albumListTemplate from "./AlbumList.html";

const ALBUMS = [
  {
    albumName: "Loud",
    artistName: "by Rihanna",
    sourceImage: "./assets/img/AlbumsCovers/rihanna_loud.jpg"
  },
  {
    albumName: "Queen of the clouds",
    artistName: "by Tove Lo",
    sourceImage: "./assets/img/AlbumsCovers/tove-lo_queenoftheclouds.jpg"
  },
  {
    albumName: "Perfection is a lie",
    artistName: "by The Hardkiss",
    sourceImage: "./assets/img/AlbumsCovers/hardkiss_perfectionisalie.jpg"
  },
  {
    albumName: "Badlands",
    artistName: "by Halsey",
    sourceImage: "./assets/img/AlbumsCovers/halsey_badlands.jpg"
  },
  {
    albumName: "Dua Lipa",
    artistName: "by Dua Lipa",
    sourceImage: "./assets/img/AlbumsCovers/dualipa_dualipa.jpg"
  },
  {
    albumName: "Human",
    artistName: "by Three Days Grace",
    sourceImage: "./assets/img/AlbumsCovers/three_days_grace__human.jpeg"
  },
  {
    albumName: "Fear",
    artistName: "by Papa Roach",
    sourceImage: "./assets/img/AlbumsCovers/papa-roach_fear.jpg"
  },
  {
    albumName: "Reputation",
    artistName: "by Taylor Swift",
    sourceImage: "./assets/img/AlbumsCovers/taylor_reputation_cr.jpg"
  },
  {
    albumName: "Waking Up",
    artistName: "by OneRepublic",
    sourceImage: "./assets/img/AlbumsCovers/onerepublic_wakingup.jpg"
  },
  {
    albumName: "Glorious",
    artistName: "by Foxes",
    sourceImage: "./assets/img/AlbumsCovers/foxes_glorious.jpg"
  },
  {
    albumName: "My Everything",
    artistName: "by Arianna Grande",
    sourceImage: "./assets/img/AlbumsCovers/ariannagrande_myeverything.jpg"
  },
  {
    albumName: "Divide",
    artistName: "by Ed Sheeran",
    sourceImage: "./assets/img/AlbumsCovers/edsheeran_divide.jpeg"
  }
];

export class AlbumList {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.albumsList = this.mountPoint.querySelector(".album-list__container");
  }

  mountChildren() {
    ALBUMS.forEach(album => {
      this.albumItem = new AlbumCard(this.albumsList, { album });
      this.albumItem.mount();
    });
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.mountChildren();
  }

  render() {
    return albumListTemplate();
  }
}
