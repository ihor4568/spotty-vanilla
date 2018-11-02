import volumeBarTemplate from "./VolumeBar.html";

export class VolumeBarComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.volumeDefault = 0.6;
    this.currentVolume = this.volumeDefault;
    this.props = props;
    this.defaultView = this.defaultView.bind(this);
    this.changeVolumeLevel = this.changeVolumeLevel.bind(this);
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);
    this.volumeIconHandler = this.volumeIconHandler.bind(this);
    // this.volumeBarGradient = this.volumeBarGradient.bind(this);
  }

  querySelectors() {
    this.volumeBar = this.mountPoint.querySelector(".volume-bar__range");
    this.volumeIcon = this.mountPoint.querySelector(".volume-bar__icon");
  }

  volumeBarGradient(val) {
    this.volumeBar.style.background = `linear-gradient(to right, #6200ee 0%, #6200ee ${val}%, #e6e6e6 ${val}%, #e6e6e6 100%`;
  }

  defaultView() {
    this.volumeBar.value = this.volumeDefault * 100;
    this.volumeBarGradient(this.volumeBar.value);
  }

  changeVolumeLevel() {
    this.props.audio.muted = false;
    this.props.audio.volume = this.volumeBar.value / 100;
    this.volumeBarGradient(this.volumeBar.value);
    this.toggleVolume();
    this.currentVolume = this.props.audio.volume;
  }

  mouseDownHandler() {
    this.volumeBar.addEventListener("mousemove", this.changeVolumeLevel);
  }

  mouseUpHandler() {
    this.volumeBar.removeEventListener("mousemove", this.changeVolumeLevel);
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
      this.volumeBarGradient(this.volumeBar.value);
    } else {
      this.props.audio.muted = true;
      this.volumeBar.value = 0;
      this.volumeBarGradient(this.volumeBar.value);
    }
    this.toggleVolume();
  }

  addEventListeners() {
    this.volumeBar.addEventListener("mousedown", this.mouseDownHandler);
    this.volumeBar.addEventListener("mouseup", this.mouseUpHandler);
    this.volumeIcon.addEventListener("click", this.volumeIconHandler);
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.defaultView();
    this.addEventListeners();
    this.toggleVolume();
  }

  render() {
    return volumeBarTemplate();
  }
}
