import VolumeBarTemplate from "./VolumeBarComponent.html";

export class VolumeBarComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
    this.volumeDefault = 0.6;
  }

  querySelectors() {
    this.audio = document.querySelector(".mediaPlayer__music");
    this.volumeBar = this.mountPoint.querySelector(".volumeBar__volume");
    this.volumeBarContainer = this.mountPoint.querySelector(".volumeBar");
    this.volumeBarCircle = this.mountPoint.querySelector(".volumeBar__circle");
    this.volumeIcon = this.mountPoint.querySelector(".volumeBar__icon");
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
        e.offsetX / this.volumeBarContainer.clientWidth < 1
      ) {
        this.audio.volume = `${e.offsetX /
          this.volumeBarContainer.clientWidth}`;
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
    this.volumeBarContainer.addEventListener("click", this.moveVolume);

    this.volumeBarContainer.addEventListener("mousedown", () => {
      this.volumeBarContainer.addEventListener("mousemove", this.moveVolume);
    });

    this.volumeBarCircle.addEventListener("mousedown", () => {
      this.volumeBarContainer.addEventListener("mousemove", this.moveVolume);
    });

    document.addEventListener("mouseup", () => {
      this.volumeBarContainer.removeEventListener("mousemove", this.moveVolume);
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
    return VolumeBarTemplate();
  }
}
