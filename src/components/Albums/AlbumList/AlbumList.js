import { AlbumCard } from "../AlbumCard/AlbumCard";
import albumListTemplate from "./AlbumList.html";

export class AlbumList {
  constructor(mountPoint, props = []) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.albumsList = this.mountPoint.querySelector(".album-list__container");
  }

  mountChildren() {
    const albums = [
      {
        albumName: "Loud",
        artistName: "by Rihanna",
        sourceImage: 'src="./assets/img/AlbumsCovers/rihanna_loud.jpg"'
      },
      {
        albumName: "Queen of the clouds",
        artistName: "by Tove Lo",
        sourceImage:
          'src="./assets/img/AlbumsCovers/tove-lo_queenoftheclouds.jpg"'
      },
      {
        albumName: "Perfection is a lie",
        artistName: "by The Hardkiss",
        sourceImage:
          'src="./assets/img/AlbumsCovers/hardkiss_perfectionisalie.jpg"'
      },
      {
        albumName: "Badlands",
        artistName: "by Halsey",
        sourceImage: 'src="./assets/img/AlbumsCovers/halsey_badlands.jpg"'
      },
      {
        albumName: "Dua Lipa",
        artistName: "by Dua Lipa",
        sourceImage: 'src="./assets/img/AlbumsCovers/dualipa_dualipa.jpg"'
      },
      {
        albumName: "Human",
        artistName: "by Three Days Grace",
        sourceImage:
          'src="./assets/img/AlbumsCovers/three_days_grace__human.jpeg"'
      },
      {
        albumName: "Fear",
        artistName: "by Papa Roach",
        sourceImage: 'src="./assets/img/AlbumsCovers/papa-roach_fear.jpg"'
      },
      {
        albumName: "Reputation",
        artistName: "by Taylor Swift",
        sourceImage: 'src="./assets/img/AlbumsCovers/taylor_reputation_cr.jpg"'
      },
      {
        albumName: "Waking Up",
        artistName: "by OneRepublic",
        sourceImage: 'src="./assets/img/AlbumsCovers/onerepublic_wakingup.jpg"'
      },
      {
        albumName: "Glorious",
        artistName: "by Foxes",
        sourceImage: 'src="./assets/img/AlbumsCovers/foxes_glorious.jpg"'
      },
      {
        albumName: "My Everything",
        artistName: "by Arianna Grande",
        sourceImage:
          'src="./assets/img/AlbumsCovers/ariannagrande_myeverything.jpg"'
      },
      {
        albumName: "Divide",
        artistName: "by Ed Sheeran",
        sourceImage: 'src="./assets/img/AlbumsCovers/edsheeran_divide.jpeg"'
      }
    ];
    albums.forEach(album => {
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
