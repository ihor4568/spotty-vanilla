import { MDCRipple } from "@material/ripple";
import buttonsComponentHTML from "./ButtonsComponent.html";
import db from "../tempDB.json";

export class ButtonsComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
    this.ifPlayNow = false;
    this.audioDuration = 0;
  }

  querySelectors() {
    this.playButton = this.mountPoint.querySelector(".mdc-fab_playButton");
    this.prevButton = this.mountPoint.querySelector(".mdc-fab_prevButton");
    this.nextButton = this.mountPoint.querySelector(".mdc-fab_nextButton");
    this.audio = document.getElementById("music");
  }

  animateTouch(button) {
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
      this.animateTouch(this.playButton);
      this.togglePlay();
    });

    this.prevButton.addEventListener("click", () => {
      this.animateTouch(this.prevButton);
    });

    this.nextButton.addEventListener("click", () => {
      this.animateTouch(this.nextButton);
    });
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.addEventListeners();
  }

  render() {
    return buttonsComponentHTML({ src: db.songs[0].src });
  }
}
