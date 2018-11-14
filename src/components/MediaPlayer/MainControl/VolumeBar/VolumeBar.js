import { MDCSlider } from "@material/slider";

import volumeBarTemplate from "./VolumeBar.html";

export class VolumeBarComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
    this.changeVolumeLevel = this.changeVolumeLevel.bind(this);
    this.volumeIconHandler = this.volumeIconHandler.bind(this);
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);
  }

  initMaterial() {
    this.slider = new MDCSlider(
      this.mountPoint.querySelector(".volume-bar__slider")
    );
    // using setTimeout to fix the bug with initial render of MDCSlider
    // layout() is a built-in method for MDCSlider
    setTimeout(() => {
      this.slider.layout();
    }, 0);
  }

  querySelectors() {
    this.volumeBar = this.mountPoint.querySelector(".volume-bar__slider");
    this.volumeIcon = this.mountPoint.querySelector(".volume-bar__icon");
    this.modalWindow = this.mountPoint.querySelector(
      ".volume-bar__modal-window"
    );
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

  mouseDownHandler() {
    document.addEventListener("mouseup", this.mouseUpHandler);
    this.modalWindow.style.display = "block";
  }

  mouseUpHandler() {
    this.props.audio.volume = this.slider.value / 100;
    this.toggleVolume();
    document.removeEventListener("mouseup", this.mouseUpHandler);
    this.modalWindow.style.display = "none";
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
