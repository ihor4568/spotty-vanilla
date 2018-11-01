import volumeBarTemplate from "./VolumeBar.html";

export class VolumeBarComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.volumeDefault = 0.6;
    this.props = props;
  }

  querySelectors() {
    this.audio = this.props.audio;
    this.volumeBar = this.mountPoint.querySelector(".volume-bar__volume");
    this.volumeBarMain = this.mountPoint.querySelector(".volume-bar__main");
    this.volumeBarCircle = this.mountPoint.querySelector(".volume-bar__circle");
    this.volumeIcon = this.mountPoint.querySelector(".volume-bar__icon");
  }

  defaultView() {
    this.audio.volume = this.volumeDefault;
    this.volumeBar.style.width = `${this.audio.volume * 100}%`;
    this.volumeBarCircle.style.left = `100%`;
  }

  volumeUpdate() {
    this.volumeBar.style.width = `${this.audio.volume * 100}%`;
    this.volumeBarCircle.style.left = `100%`;
    this.audio.muted = false;
    this.toggleVolume();
  }

  moveVolume(e) {
    const { target } = e;
    if (
      target !== this.volumeBarCircle &&
      e.offsetX / this.volumeBarMain.clientWidth < 1
    ) {
      this.audio.volume = `${e.offsetX / this.volumeBarMain.clientWidth}`;
      this.volumeBar.style.width = `${this.audio.volume * 100}%`;
      this.volumeBarCircle.style.left = `100%`;
      this.audio.muted = false;
      this.toggleVolume();
    }
  }

  toggleVolume() {
    if (this.audio.volume > 0.6 && this.audio.muted === false) {
      this.volumeIcon.innerText = "volume_up";
    } else if (this.audio.volume > 0.3 && this.audio.muted === false) {
      this.volumeIcon.innerText = "volume_down";
    } else if (this.audio.volume > 0 && this.audio.muted === false) {
      this.volumeIcon.innerText = "volume_mute";
    } else {
      this.volumeIcon.innerText = "volume_off";
    }
  }

  mouseDownHandler() {
    this.volumeBarMain.addEventListener("mousemove", this.moveVolume);
  }

  mouseUpHandler() {
    this.volumeBarMain.removeEventListener("mousemove", this.moveVolume);
  }

  volumeIconHandler() {
    if (this.audio.muted) {
      this.volumeBar.style.width = `${this.audio.volume * 100}%`;
      this.audio.muted = false;
    } else {
      this.audio.muted = true;
      this.volumeBar.style.width = 0;
    }
    this.toggleVolume();
  }

  bindThis() {
    this.volumeUpdate = this.volumeUpdate.bind(this);
    this.moveVolume = this.moveVolume.bind(this);
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);
    this.volumeIconHandler = this.volumeIconHandler.bind(this);
  }

  addEventListeners() {
    this.volumeBarMain.addEventListener("click", this.moveVolume);
    this.volumeBarMain.addEventListener("mousedown", this.mouseDownHandler);
    this.volumeBarCircle.addEventListener("mousedown", this.mouseDownHandler);
    document.addEventListener("mouseup", this.mouseUpHandler);
    this.volumeIcon.addEventListener("click", this.volumeIconHandler);
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.defaultView();
    this.bindThis();
    this.addEventListeners();
    this.toggleVolume();
  }

  render() {
    return volumeBarTemplate();
  }
}
