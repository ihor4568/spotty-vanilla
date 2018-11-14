import { MDCSlider } from "@material/slider";

import progressBarTemplate from "./ProgressBar.html";

export class ProgressBarComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.audioDuration = 0;
    this.props = props;
    this.timeUpdate = this.timeUpdate.bind(this);
    this.finishPlay = this.finishPlay.bind(this);
    this.movePlayTime = this.movePlayTime.bind(this);
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  querySelectors() {
    this.progressBarMain = this.mountPoint.querySelector(".progress-bar");
    this.progressBarFocus = this.mountPoint.querySelector(
      ".progress-bar__focus-ring"
    );
  }

  initMaterial() {
    this.slider = new MDCSlider(this.mountPoint.querySelector(".progress-bar"));
  }

  timeUpdate() {
    this.audioDuration =
      (this.props.audio.currentTime / this.props.audio.duration) * 100;
    this.slider.value = this.audioDuration;
  }

  movePlayTime(e) {
    const { target } = e;
    if (target !== this.progressBarFocus) {
      this.props.audio.currentTime =
        (this.props.audio.duration * this.slider.value) / 100;
    }
  }

  finishPlay() {
    this.props.audio.currentTime = 0;
  }

  showModal() {
    if (this.extraDiv) {
      this.extraDiv.remove();
    }
    this.extraDiv = document.createElement("div");
    this.extraDiv.className = "progress-bar__extra-div";
    this.mountPoint.appendChild(this.extraDiv);
  }

  mouseDownHandler() {
    this.props.audio.removeEventListener("timeupdate", this.timeUpdate);
    document.addEventListener("mouseup", this.mouseUpHandler);
    this.showModal();
  }

  mouseUpHandler() {
    this.props.audio.addEventListener("timeupdate", this.timeUpdate);
    this.props.audio.currentTime =
      (this.slider.value * this.props.audio.duration) / 100;
    document.removeEventListener("mouseup", this.mouseUpHandler);
    if (this.extraDiv) {
      this.extraDiv.remove();
    }
  }

  addEventListeners() {
    this.props.audio.addEventListener("timeupdate", this.timeUpdate);
    this.props.audio.addEventListener("ended", this.finishPlay);
    this.progressBarMain.addEventListener("click", this.movePlayTime);
    this.progressBarMain.addEventListener("mousedown", this.mouseDownHandler);
    this.progressBarMain.addEventListener("mouseup", this.mouseUpHandler);
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.initMaterial();
    this.addEventListeners();
  }

  render() {
    return progressBarTemplate();
  }
}
