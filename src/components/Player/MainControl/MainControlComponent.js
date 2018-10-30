import { VolumeBarComponent } from "./VolumeBar/VolumeBarComponent";
import { ButtonsComponent } from "./Buttons/ButtonsComponent";
import mainControlTemplate from "./MainControlComponent.html";

export class MainControlComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  querySelectors() {
    this.mainControl = this.mountPoint.querySelector(
      ".main-control__container"
    );
    this.buttons = this.mountPoint.querySelector(".main-control__buttons");
    this.volumeBar = this.mountPoint.querySelector(".main-control__volume-bar");
  }

  mountChildren() {
    this.audioButtons = new ButtonsComponent(this.buttons);
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
