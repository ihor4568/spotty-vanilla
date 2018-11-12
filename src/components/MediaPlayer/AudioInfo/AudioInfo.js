import audioInfoComponentHTML from "./AudioInfo.html";

export class AudioInfoComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  querySelectors() {
    this.img = document.querySelector(".audio-info__image");
    this.songName = document.querySelector(".audio-info__song-name");
    this.albumAndArtist = document.querySelector(".audio-info__album-artist");
  }

  setInfo({ imageSrc, songName, album, artistName }) {
    this.img.src = imageSrc;
    this.songName.innerHTML = songName;
    this.albumAndArtist.innerHTML = `${album} - ${artistName}`;
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
  }

  render() {
    return audioInfoComponentHTML();
  }
}
