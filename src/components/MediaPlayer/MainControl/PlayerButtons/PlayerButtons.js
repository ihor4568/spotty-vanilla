import { MDCRipple } from "@material/ripple";
import buttonsComponentTemplate from "./PlayerButtons.html";

export class PlayerButtonsComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.isPlayNow = false;
    this.audioDuration = 0;
    this.props = props;
  }

  querySelectors() {
    this.playButton = this.mountPoint.querySelector(
      ".player-buttons__play-button"
    );
    this.prevButton = this.mountPoint.querySelector(
      ".player-buttons__navigate-button_previous"
    );
    this.nextButton = this.mountPoint.querySelector(
      ".player-buttons__navigate-button_next"
    );
  }

  initMaterial() {
    this.fabRipplePlay = new MDCRipple(this.playButton);
    this.fabRipplePrev = new MDCRipple(this.prevButton);
    this.fabRippleNext = new MDCRipple(this.nextButton);
  }

  togglePlay() {
    if (this.isPlayNow === false) {
      this.props.audio.play();
      this.isPlayNow = true;
      this.playButton.children[0].innerText = "pause";
    } else {
      this.props.audio.pause();
      this.isPlayNow = false;
      this.playButton.children[0].innerText = "play_arrow";
    }
  }

  addEventListeners() {
    this.playButton.addEventListener("click", () => {
      this.togglePlay();
    });
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.initMaterial();
    this.addEventListeners();
  }

  render() {
    return buttonsComponentTemplate({ src: this.props.song });
  }
}
