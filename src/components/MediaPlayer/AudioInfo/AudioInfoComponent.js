import audioInfoComponentHTML from "./AudioInfoComponent.html";

export class AudioInfoComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
  }

  render() {
    return audioInfoComponentHTML({
      imageSrc: this.props.image,
      songName: this.props.songName,
      album: this.props.album,
      artist: this.props.artistName
    });
  }
}
