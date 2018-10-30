import audioInfoComponentHTML from "./AudioInfoComponent.html";

export class AudioInfoComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
    this.imageSrc =
      "https://s-media-cache-ak0.pinimg.com/originals/0e/f8/fd/0ef8fd42bb061ede2c2b6d1a9689782b.jpg";
    this.songName = "Way Back";
    this.album = "Lazy Sunday";
    this.artist = "Jazzamor";
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
  }

  render() {
    return audioInfoComponentHTML({
      imageSrc: this.imageSrc,
      songName: this.songName,
      album: this.album,
      artist: this.artist
    });
  }
}
