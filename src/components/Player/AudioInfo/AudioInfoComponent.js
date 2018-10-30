import audioInfoComponentHTML from "./AudioInfoComponent.html";
import db from "../tempDB.json";

export class AudioInfoComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
  }

  render() {
    return audioInfoComponentHTML({
      imageSrc: db.songs[0].imageSrc,
      songName: db.songs[0].name,
      album: db.songs[0].album,
      artist: db.songs[0].artist
    });
  }
}
