import progressBarHTML from "./ProgressBarComponent.html";

export class ProgressBarComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
    this.audioDuration = 0;
  }

  querySelectors() {
    this.audio = document.getElementById("music");
    this.progressBar = this.mountPoint.querySelector(
      ".mdc-linear-progress__primary-bar"
    );
    this.progressBarMain = this.mountPoint.querySelector(
      ".mdc-linear-progress"
    );
    this.progressBarCircle = this.mountPoint.querySelector(
      ".mdc-linear-progress__circle"
    );
  }

  parameters() {
    this.progressBarCircle.style.left = `100%`;

    this.timeUpdate = () => {
      this.audioDuration = (this.audio.currentTime / this.audio.duration) * 100;
      this.progressBar.style.width = `${this.audioDuration}%`;
      this.progressBarCircle.style.left = `100%`;
    };

    this.movePlayTime = e => {
      let a = e.target;
      if (a !== this.progressBarCircle) {
        this.audio.currentTime =
          this.audio.duration * (e.offsetX / this.progressBarMain.clientWidth);
      }
    };
  }

  addEventListeners() {
    this.audio.addEventListener("timeupdate", this.timeUpdate);

    this.progressBarMain.addEventListener("click", this.movePlayTime);

    this.progressBarCircle.addEventListener("mousedown", () => {
      this.audio.removeEventListener("timeupdate", this.timeUpdate);
      this.progressBarMain.addEventListener("mousemove", this.movePlayTime);
      this.progressBarMain.addEventListener("mousemove", this.timeUpdate);
    });

    window.addEventListener("mouseup", () => {
      this.audio.addEventListener("timeupdate", this.timeUpdate);
      this.progressBarMain.removeEventListener("mousemove", this.movePlayTime);
      this.progressBarMain.removeEventListener("mousemove", this.timeUpdate);
    });
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.parameters();
    this.addEventListeners();
  }

  render() {
    return progressBarHTML();
  }
}
