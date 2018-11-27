import { MDCRipple } from "@material/ripple";
import buttonsComponentTemplate from "./PlayerButtons.html";

export class PlayerButtonsComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.isPlayNow = false;
    this.audioDuration = 0;
    this.props = props;
    this.finishPlay = this.finishPlay.bind(this);
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

  finishPlay() {
    this.isPlayNow = false;
    this.playButton.children[0].innerText = "play_arrow";
    this.props.onPlayerChangeState(false);
  }

  initMaterial() {
    this.fabRipplePlay = new MDCRipple(this.playButton);
    this.fabRipplePrev = new MDCRipple(this.prevButton);
    this.fabRippleNext = new MDCRipple(this.nextButton);
  }

  play() {
    this.props.audio.play();
    this.isPlayNow = true;
    this.playButton.children[0].innerText = "pause";
    this.props.onPlayerChangeState(true);
  }

  stop() {
    this.props.audio.pause();
    this.isPlayNow = false;
    this.playButton.children[0].innerText = "play_arrow";
    this.props.onPlayerChangeState(false);
  }

  togglePlay() {
    if (this.isPlayNow) {
      this.stop();
    } else {
      this.play();
    }
  }

  addEventListeners() {
    this.props.audio.addEventListener("ended", this.finishPlay);
    this.playButton.addEventListener("click", () => {
      this.togglePlay();
    });
    this.nextButton.addEventListener("click", this.props.onNextClick);
    this.prevButton.addEventListener("click", this.props.onPrevClick);
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.initMaterial();
    this.addEventListeners();
  }

  render() {
    return buttonsComponentTemplate();
  }
}
