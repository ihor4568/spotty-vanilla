import volumeBarTemplate from "./VolumeBarComponent.html";

export class VolumeBarComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
    this.volumeDefault = 0.6;
  }

  querySelectors() {
    this.audio = document.querySelector(".buttons__main-audio");
    this.volumeBar = this.mountPoint.querySelector(".volume-bar__volume");
    this.volumeBarMain = this.mountPoint.querySelector(".volume-bar__main");
    this.volumeBarCircle = this.mountPoint.querySelector(".volume-bar__circle");
    this.volumeIcon = this.mountPoint.querySelector(".volume-bar__icon");
  }

  parameters() {
    this.audio.volume = this.volumeDefault;
    this.volumeBar.style.width = `${this.audio.volume * 100}%`;
    this.volumeBarCircle.style.left = `100%`;

    this.volumeUpdate = () => {
      this.volumeBar.style.width = `${this.audio.volume * 100}%`;
      this.volumeBarCircle.style.left = `100%`;
      this.audio.muted = false;
      this.toggleVolume();
    };

    this.moveVolume = e => {
      let a = e.target;
      if (
        a !== this.volumeBarCircle &&
        e.offsetX / this.volumeBarMain.clientWidth < 1
      ) {
        this.audio.volume = `${e.offsetX / this.volumeBarMain.clientWidth}`;
        this.volumeBar.style.width = `${this.audio.volume * 100}%`;
        this.volumeBarCircle.style.left = `100%`;
        this.audio.muted = false;
        this.toggleVolume();
      }
    };
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

  addEventListeners() {
    this.volumeBarMain.addEventListener("click", this.moveVolume);

    this.volumeBarMain.addEventListener("mousedown", () => {
      this.volumeBarMain.addEventListener("mousemove", this.moveVolume);
    });

    this.volumeBarCircle.addEventListener("mousedown", () => {
      this.volumeBarMain.addEventListener("mousemove", this.moveVolume);
    });

    document.addEventListener("mouseup", () => {
      this.volumeBarMain.removeEventListener("mousemove", this.moveVolume);
    });

    this.volumeIcon.addEventListener("click", () => {
      if (this.audio.muted) {
        this.volumeBar.style.width = `${this.audio.volume * 100}%`;
        this.audio.muted = false;
      } else {
        this.audio.muted = true;
        this.volumeBar.style.width = 0;
      }
      this.toggleVolume();
    });
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.parameters();
    this.addEventListeners();
    this.toggleVolume();
  }

  render() {
    return volumeBarTemplate();
  }
}
