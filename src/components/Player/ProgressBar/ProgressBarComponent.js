import progressBarTemplate from "./ProgressBarComponent.html";

export class ProgressBarComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
    this.audioDuration = 0;
  }

  querySelectors() {
    this.audio = document.querySelector(".player-buttons__main-audio");
    this.progressBar = this.mountPoint.querySelector(".progress-bar__played");
    this.progressBarMain = this.mountPoint.querySelector(".progress-bar__main");
    this.progressBarCircle = this.mountPoint.querySelector(
      ".progress-bar__circle"
    );
  }

  parameters() {
    this.progressBarCircle.style.left = `100%`;

    this.timeUpdate = () => {
      this.audioDuration = (this.audio.currentTime / this.audio.duration) * 100;
      this.progressBar.style.width = `${this.audioDuration}%`;
      this.progressBarCircle.style.left = `100%`;
    };

    this.modal = () => {
      this.moveCircle = document.createElement("div");
      this.moveCircle.className = "progress-bar__move-circle";
      this.mountPoint.appendChild(this.moveCircle);
    };

    this.movePlayTime = e => {
      const a = e.target;
      if (a !== this.progressBarCircle) {
        this.audio.currentTime =
          this.audio.duration * (e.offsetX / this.progressBarMain.clientWidth);
      }
    };
  }

  addEventListeners() {
    this.audio.addEventListener("timeupdate", this.timeUpdate);

    this.progressBarMain.addEventListener("click", this.movePlayTime);

    this.progressBarMain.addEventListener("mousedown", () => {
      this.audio.removeEventListener("timeupdate", this.timeUpdate);
      document.addEventListener("mousemove", this.movePlayTime);
      document.addEventListener("mousemove", this.timeUpdate);
      this.modal();
    });

    this.progressBarCircle.addEventListener("mousedown", () => {
      this.audio.removeEventListener("timeupdate", this.timeUpdate);
      document.addEventListener("mousemove", this.movePlayTime);
      document.addEventListener("mousemove", this.timeUpdate);
    });

    document.addEventListener("mouseup", () => {
      this.audio.addEventListener("timeupdate", this.timeUpdate);
      document.removeEventListener("mousemove", this.movePlayTime);
      document.removeEventListener("mousemove", this.timeUpdate);
      if (this.moveCircle) {
        this.moveCircle.remove();
      }
    });
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.parameters();
    this.addEventListeners();
  }

  render() {
    return progressBarTemplate();
  }
}
