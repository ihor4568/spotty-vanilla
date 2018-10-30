import { ProgressBarComponent } from "./ProgressBar/ProgressBarComponent";
import { AudioInfoComponent } from "./AudioInfo/AudioInfoComponent";
import { RatingComponent } from "./Rating/RatingComponent";
import { MainControlComponent } from "./MainControl/MainControlComponent";

import playerTemplate from "./Player.html";
import { DotsMenuComponent } from "../DotsMenu/DotsMenu";

export class PlayerComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  querySelectors() {
    this.buttons = this.mountPoint.querySelector(".media-player__buttons");
    this.progressBar = this.mountPoint.querySelector(
      ".media-player__progress-bar"
    );
    this.mainControl = this.mountPoint.querySelector(
      ".media-player__main-control"
    );
    this.volumeBar = this.mountPoint.querySelector(".media-player__volume-bar");
    this.audioInfo = this.mountPoint.querySelector(".media-player__audio-info");
    this.audioRating = this.mountPoint.querySelector(
      ".media-player__audio-rating"
    );
    this.dotsMenuPoint = this.mountPoint.querySelector(".dots-menu-container");
  }

  mountChildren() {
    this.mainControlPannel = new MainControlComponent(this.mainControl);
    this.mainControlPannel.mount();
    this.audioProgressBar = new ProgressBarComponent(this.progressBar);
    this.audioProgressBar.mount();
    this.audioInfoComponent = new AudioInfoComponent(this.audioInfo);
    this.audioInfoComponent.mount();
    this.audioRatingComponent = new RatingComponent(this.audioRating);
    this.audioRatingComponent.mount();
    this.dotsMenu = new DotsMenuComponent(this.dotsMenuPoint, {
      items: [
        { name: "Add to my songs", handler: () => {} },
        { name: "Lyrics", handler: () => {} },
        { name: "Share", handler: () => {} }
      ]
    });
    this.dotsMenu.mount();
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
