import { MDCRipple } from "@material/ripple";
import buttonsComponentTemplate from "./ButtonsComponent.html";

export class ButtonsComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
    this.ifPlayNow = false;
    this.audioDuration = 0;
    this.songSrc =
      "http://drivemusic.me/dl/ar8_BdKPhBpvPyoPFMdryQ/1540528751/download_music/2013/06/jazzamor-way-back.mp3";
  }

  querySelectors() {
    this.playButton = this.mountPoint.querySelector(".buttons__play-button");
    this.prevButton = this.mountPoint.querySelector(
      ".buttons__navigate-button_previous"
    );
    this.nextButton = this.mountPoint.querySelector(
      ".buttons__navigate-button_next"
    );
    this.audio = this.mountPoint.querySelector(".buttons__main-audio");
  }

  initMaterial(button) {
    this.fabRipple = new MDCRipple(button);
  }

  togglePlay() {
    if (this.ifPlayNow === false) {
      this.audio.play();
      this.ifPlayNow = true;
      this.playButton.children[0].innerText = "pause";
    } else {
      this.audio.pause();
      this.ifPlayNow = false;
      this.playButton.children[0].innerText = "play_arrow";
    }
  }

  addEventListeners() {
    this.playButton.addEventListener("click", () => {
      this.initMaterial(this.playButton);
      this.togglePlay();
    });

    this.prevButton.addEventListener("click", () => {
      this.initMaterial(this.prevButton);
    });

    this.nextButton.addEventListener("click", () => {
      this.initMaterial(this.nextButton);
    });
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.addEventListeners();
  }

  render() {
    return buttonsComponentTemplate({ src: this.songSrc });
  }
}
