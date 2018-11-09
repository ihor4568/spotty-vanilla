import { MDCSlider } from "@material/slider";

import progressBarTemplate from "./ProgressBar.html";

export class ProgressBarComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.audioDuration = 0;
    this.props = props;
    this.timeUpdate = this.timeUpdate.bind(this);
    // this.showModal = this.showModal.bind(this);
    this.movePlayTime = this.movePlayTime.bind(this);
    // this.mouseUpHandler = this.mouseUpHandler.bind(this);
    // this.mouseDownHandler = this.mouseDownHandler.bind(this);
    // this.finishPlay = this.finishPlay.bind(this);
  }

  querySelectors() {
    this.progressBar = this.mountPoint.querySelector(".progress-bar__played");
    this.progressBarCircle = this.mountPoint.querySelector(
      ".progress-bar__thumb-container"
    );
    this.progressBarMain = this.mountPoint.querySelector(".progress-bar");
    this.progressBarFocus = document.querySelector(".progress-bar__focus-ring");
    // this.moveCircle = document.createElement("div");
  }

  initMaterial() {
    this.slider = new MDCSlider(document.querySelector(".mdc-slider"));
    // this.slider.listen("MDCSlider:change", () =>
    //   console.log(`Value changed to ${this.slider.value}`)
    // );
  }

  timeUpdate() {
    this.audioDuration =
      (this.props.audio.currentTime / this.props.audio.duration) * 100;

    this.progressBar.style.transform = `scaleX(${this.audioDuration / 100})`;

    this.progressBarCircle.style.transform = `translateX(${(this.audioDuration *
      this.progressBarMain.clientWidth) /
      100}px) translateX(-50%)`;

    //   this.progressBar.style.width = `${this.audioDuration}%`;
    // this.progressBarCircle.style.left = `100%`;
  }

  // showModal() {
  //   if (this.moveCircle) {
  //     this.moveCircle.remove();
  //   }
  //   this.moveCircle = document.createElement("div");
  //   this.moveCircle.className = "progress-bar__move-circle";
  //   this.mountPoint.appendChild(this.moveCircle);
  // }

  movePlayTime(e) {
    const { target } = e;
    if (target !== this.progressBarFocus) {
      this.props.audio.currentTime =
        (this.props.audio.duration * this.slider.value) / 100;
    }
  }

  // finishPlay() {
  //   this.props.audio.currentTime = 0;
  // }

  // mouseDownHandler() {
  //   this.props.audio.removeEventListener("timeupdate", this.timeUpdate);
  //   document.addEventListener("mousemove", this.movePlayTime);
  //   document.addEventListener("mousemove", this.timeUpdate);
  //   this.showModal();
  // }

  // mouseUpHandler() {
  //   this.props.audio.addEventListener("timeupdate", this.timeUpdate);
  //   document.removeEventListener("mousemove", this.movePlayTime);
  //   document.removeEventListener("mousemove", this.timeUpdate);
  //   if (this.moveCircle) {
  //     this.moveCircle.remove();
  //   }
  // }

  addEventListeners() {
    this.props.audio.addEventListener("timeupdate", this.timeUpdate);
    // this.props.audio.addEventListener("ended", this.finishPlay);
    this.progressBarMain.addEventListener("click", this.movePlayTime);
    // this.progressBarMain.addEventListener("mousedown", this.mouseDownHandler);
    // this.progressBarCircle.addEventListener("mousedown", this.mouseDownHandler);
    // document.addEventListener("mouseup", this.mouseUpHandler);
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
