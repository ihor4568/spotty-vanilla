import progressBarTemplate from "./ProgressBar.html";

export class ProgressBarComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.audioDuration = 0;
    this.props = props;
    this.timeUpdate = this.timeUpdate.bind(this);
    this.showModal = this.showModal.bind(this);
    this.movePlayTime = this.movePlayTime.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.finishPlay = this.finishPlay.bind(this);
  }

  querySelectors() {
    this.progressBar = this.mountPoint.querySelector(".progress-bar__played");
    this.progressBarMain = this.mountPoint.querySelector(".progress-bar__main");
    this.progressBarCircle = this.mountPoint.querySelector(
      ".progress-bar__circle"
    );
    this.moveCircle = document.createElement("div");
  }

  timeUpdate() {
    this.audioDuration =
      (this.props.audio.currentTime / this.props.audio.duration) * 100;
    this.progressBar.style.width = `${this.audioDuration}%`;
    this.progressBarCircle.style.left = `100%`;
  }

  showModal() {
    if (this.moveCircle) {
      this.moveCircle.remove();
    }
    this.moveCircle = document.createElement("div");
    this.moveCircle.className = "progress-bar__move-circle";
    this.mountPoint.appendChild(this.moveCircle);
  }

  movePlayTime(e) {
    const { target } = e;
    if (target !== this.progressBarCircle) {
      this.props.audio.currentTime =
        this.props.audio.duration *
        (e.offsetX / this.progressBarMain.clientWidth);
    }
  }

  finishPlay() {
    this.props.audio.currentTime = 0;
  }

  mouseDownHandler() {
    this.props.audio.removeEventListener("timeupdate", this.timeUpdate);
    document.addEventListener("mousemove", this.movePlayTime);
    document.addEventListener("mousemove", this.timeUpdate);
    this.showModal();
  }

  mouseUpHandler() {
    this.props.audio.addEventListener("timeupdate", this.timeUpdate);
    document.removeEventListener("mousemove", this.movePlayTime);
    document.removeEventListener("mousemove", this.timeUpdate);
    if (this.moveCircle) {
      this.moveCircle.remove();
    }
  }

  addEventListeners() {
    this.props.audio.addEventListener("timeupdate", this.timeUpdate);
    this.props.audio.addEventListener("ended", this.finishPlay);
    this.progressBarMain.addEventListener("click", this.movePlayTime);
    this.progressBarMain.addEventListener("mousedown", this.mouseDownHandler);
    this.progressBarCircle.addEventListener("mousedown", this.mouseDownHandler);
    document.addEventListener("mouseup", this.mouseUpHandler);
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.addEventListeners();
  }

  render() {
    return progressBarTemplate();
  }
}
