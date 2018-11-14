import { MDCSlider } from "@material/slider";

import volumeBarTemplate from "./VolumeBar.html";

export class VolumeBarComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
    this.changeVolumeLevel = this.changeVolumeLevel.bind(this);
    this.volumeIconHandler = this.volumeIconHandler.bind(this);
    this.showModal = this.showModal.bind(this);
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);
  }

  initMaterial() {
    this.slider = new MDCSlider(
      this.mountPoint.querySelector(".volume-bar__slider")
    );
    setTimeout(() => {
      this.slider.layout();
    }, 0);
  }

  querySelectors() {
    this.volumeBar = this.mountPoint.querySelector(".volume-bar__slider");
    this.volumeIcon = this.mountPoint.querySelector(".volume-bar__icon");
  }

  changeVolumeLevel() {
    this.props.audio.muted = false;
    this.currentVolume = this.slider.value / 100;
    this.props.audio.volume = this.currentVolume;
    this.toggleVolume();
  }

  toggleVolume() {
    if (this.props.audio.volume > 0.6 && this.props.audio.muted === false) {
      this.volumeIcon.innerText = "volume_up";
    } else if (
      this.props.audio.volume > 0.3 &&
      this.props.audio.muted === false
    ) {
      this.volumeIcon.innerText = "volume_down";
    } else if (
      this.props.audio.volume > 0 &&
      this.props.audio.muted === false
    ) {
      this.volumeIcon.innerText = "volume_mute";
    } else {
      this.volumeIcon.innerText = "volume_off";
    }
  }

  volumeIconHandler() {
    if (this.props.audio.muted) {
      this.volumeBar.value = this.currentVolume * 100;
      this.props.audio.muted = false;
    } else {
      this.props.audio.muted = true;
      this.volumeBar.value = 0;
    }
    this.toggleVolume();
  }

  showModal() {
    if (this.extraDiv) {
      this.extraDiv.remove();
    }
    this.extraDiv = document.createElement("div");
    this.extraDiv.className = "volume-bar__extra-div";
    this.mountPoint.appendChild(this.extraDiv);
  }

  mouseDownHandler() {
    document.addEventListener("mouseup", this.mouseUpHandler);
    this.showModal();
  }

  mouseUpHandler() {
    this.props.audio.volume = this.slider.value / 100;
    this.toggleVolume();
    document.removeEventListener("mouseup", this.mouseUpHandler);
    if (this.extraDiv) {
      this.extraDiv.remove();
    }
  }

  addEventListeners() {
    this.volumeBar.addEventListener("click", this.changeVolumeLevel);
    this.volumeBar.addEventListener("mousedown", this.mouseDownHandler);
    this.volumeBar.addEventListener("mouseup", this.mouseUpHandler);
    this.volumeIcon.addEventListener("click", this.volumeIconHandler);
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.initMaterial();
    this.addEventListeners();
  }

  render() {
    return volumeBarTemplate();
  }
}
