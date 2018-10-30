import { MDCRipple } from "@material/ripple";
import buttonsComponentTemplate from "./ButtonsComponent.html";
import db from "../tempDB.json";

export class ButtonsComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
    this.ifPlayNow = false;
    this.audioDuration = 0;
  }

  querySelectors() {
    this.playButton = this.mountPoint.querySelector(
      ".mediaPlayer__button_playButton"
    );
    this.prevButton = this.mountPoint.querySelector(
      ".mediaPlayer__button_prevButton"
    );
    this.nextButton = this.mountPoint.querySelector(
      ".mediaPlayer__button_nextButton"
    );
    this.audio = this.mountPoint.querySelector(".mediaPlayer__music");
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
    return buttonsComponentTemplate({ src: db.songs[0].src });
  }
}
