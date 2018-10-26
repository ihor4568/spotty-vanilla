import VolumeBarHTML from "./VolumeBarComponent.html";

export class VolumeBarComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
    this.volumeDefault = 0.6;
  }

  querySelectors() {
    this.audio = document.getElementById("music");
    this.progressBar = this.mountPoint.querySelector(
      ".mdc-linear-progress__primary-bar_volume"
    );
    this.progressBarMain = this.mountPoint.querySelector(
      ".mdc-linear-progress_volume"
    );
    this.progressBarCircle = this.mountPoint.querySelector(
      ".mdc-linear-progress__circle_volume"
    );
    this.volumeIcon = this.mountPoint.querySelector(".volume__icon");
  }

  parameters() {
    this.audio.volume = this.volumeDefault;
    this.progressBar.style.width = `${this.audio.volume * 100}%`;
    this.progressBarCircle.style.left = `100%`;

    this.volumeUpdate = () => {
      this.progressBar.style.width = `${this.audio.volume * 100}%`;
      this.progressBarCircle.style.left = `100%`;
      this.audio.muted = false;
      this.toggleVolume();
    };

    this.moveVolume = e => {
      let a = e.target;
      if (
        a !== this.progressBarCircle &&
        e.offsetX / this.progressBarMain.clientWidth < 1
      ) {
        this.audio.volume = `${e.offsetX / this.progressBarMain.clientWidth}`;
        this.progressBar.style.width = `${this.audio.volume * 100}%`;
        this.progressBarCircle.style.left = `100%`;
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
    this.progressBarMain.addEventListener("click", this.moveVolume);

    this.progressBarCircle.addEventListener("mousedown", () => {
      this.progressBarMain.addEventListener("mousemove", this.moveVolume);
    });

    window.addEventListener("mouseup", () => {
      this.progressBarMain.removeEventListener("mousemove", this.moveVolume);
    });

    this.volumeIcon.addEventListener("click", () => {
      if (this.audio.muted) {
        this.progressBar.style.width = `${this.audio.volume * 100}%`;
        this.audio.muted = false;
      } else {
        this.audio.muted = true;
        this.progressBar.style.width = 0;
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
    return VolumeBarHTML();
  }
}
