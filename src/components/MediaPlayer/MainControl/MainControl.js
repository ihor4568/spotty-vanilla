import { VolumeBarComponent } from "./VolumeBar/VolumeBar";
import { ButtonsComponent } from "./Buttons/Buttons";
import mainControlTemplate from "./MainControl.html";

export class MainControlComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.mainControl = this.mountPoint.querySelector(
      ".main-control__container"
    );
    this.buttons = this.mountPoint.querySelector(".main-control__buttons");
    this.volumeBar = this.mountPoint.querySelector(".main-control__volume-bar");
  }

  mountChildren() {
    this.audioButtons = new ButtonsComponent(this.buttons, {
      song: this.props.song
    });
    this.audioButtons.mount();
    this.audioVolumeBar = new VolumeBarComponent(this.volumeBar);
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
