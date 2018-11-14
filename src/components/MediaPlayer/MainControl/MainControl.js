import { VolumeBarComponent } from "./VolumeBar/VolumeBar";
import { PlayerButtonsComponent } from "./PlayerButtons/PlayerButtons";
import mainControlTemplate from "./MainControl.html";

export class MainControlComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  play() {
    this.audioButtons.play();
  }

  stop() {
    this.audioButtons.stop();
  }

  querySelectors() {
    this.buttons = this.mountPoint.querySelector(".main-control__buttons");
    this.volumeBar = this.mountPoint.querySelector(".main-control__volume-bar");
  }

  mountChildren() {
    this.audioButtons = new PlayerButtonsComponent(this.buttons, {
      song: this.props.song,
      audio: this.props.audio,
      onPlayerChangeState: this.props.onPlayerChangeState,
      tableData: this.props.tableData,
      albumData: this.props.albumData,
      nextSong: this.props.nextSong,
      prevSong: this.props.prevSong
    });
    this.audioButtons.mount();
    this.audioVolumeBar = new VolumeBarComponent(this.volumeBar, {
      audio: this.props.audio
    });
    this.audioVolumeBar.mount();
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.mountChildren();
  }

  render() {
    return mainControlTemplate();
  }
}
