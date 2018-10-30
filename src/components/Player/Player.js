import { ButtonsComponent } from "./Buttons/ButtonsComponent";
import { ProgressBarComponent } from "./ProgressBar/ProgressBarComponent";
import { VolumeBarComponent } from "./VolumeBar/VolumeBarComponent";
import { AudioInfoComponent } from "./AudioInfo/AudioInfoComponent";
import { RatingComponent } from "./Rating/RatingComponent";

import playerTemplate from "./Player.html";

export class PlayerComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
    this.playList = [
      "./src/audio-test/audio.mp3",
      "./src/audio-test/audio1.mp3"
    ];
    this.playSong = this.playList[0];
    this.playNext = this.playList[1];
  }

  querySelectors() {
    this.buttons = this.mountPoint.querySelector(".mediaPlayer__buttons");
    this.progressBar = this.mountPoint.querySelector(
      ".mediaPlayer__progressBar"
    );
    this.volumeBar = this.mountPoint.querySelector(".mediaPlayer__volumeBar");
    this.audioInfo = this.mountPoint.querySelector(".mediaPlayer__audioInfo");
    this.audioRating = this.mountPoint.querySelector(
      ".mediaPlayer__audioRating"
    );
  }

  mountChildren() {
    this.audioButtons = new ButtonsComponent(this.buttons);
    this.audioButtons.mount();
    this.audioProgressBar = new ProgressBarComponent(this.progressBar);
    this.audioProgressBar.mount();
    this.audioVolumeBar = new VolumeBarComponent(this.volumeBar);
    this.audioVolumeBar.mount();
    this.audioInfoComponent = new AudioInfoComponent(this.audioInfo);
    this.audioInfoComponent.mount();
    this.audioRatingComponent = new RatingComponent(this.audioRating);
    this.audioRatingComponent.mount();
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.mountChildren();
  }

  render() {
    return playerTemplate();
  }
}
