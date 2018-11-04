import { ProgressBarComponent } from "./ProgressBar/ProgressBar";
import { AudioInfoComponent } from "./AudioInfo/AudioInfo";
import { RatingComponent } from "./Rating/Rating";
import { MainControlComponent } from "./MainControl/MainControl";
import { DotsMenuComponent } from "../DotsMenu/DotsMenu";

import playerTemplate from "./MediaPlayer.html";

const SONG_INFO = {
  songSrc:
    "https://storage.mp3cc.biz/download/89035703/U2hXUUsxUTVxellvRHcrQTNaNUdIM0drb2J3dWhaNjNacXRmdGU5bGZtN3pMcHdUNnhicmozMDlHcHBnRHNZRTZoSEJzMldvQTl1SGk1TjU2VFJyK0dHOUFiMUZVZzBYVTQ2NU8xVEwxZjlLbmZtaWlZQk1TVE1MVDBleThqdVg/jazzamor-jazzamor-je-t-aime_(mp3CC.biz).mp3",
  songImageSrc:
    "https://s-media-cache-ak0.pinimg.com/originals/0e/f8/fd/0ef8fd42bb061ede2c2b6d1a9689782b.jpg",
  songName: "Way Back",
  album: "Lazy Sunday",
  artistName: "Jazzamor"
};

export class MediaPlayerComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.audio = this.mountPoint.querySelector(".media-player__main-audio");
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
    this.dotsMenuPoint = this.mountPoint.querySelector(
      ".media-player__dots-menu"
    );
  }

  set audioTime(val) {
    this.audio.currentTime = val;
  }

  mountChildren() {
    this.mainControlPannel = new MainControlComponent(this.mainControl, {
      audio: this.audio
    });
    this.mainControlPannel.mount();
    this.audioProgressBar = new ProgressBarComponent(this.progressBar, {
      audio: this.audio
    });
    this.audioProgressBar.mount();
    this.audioInfoComponent = new AudioInfoComponent(this.audioInfo, {
      image: SONG_INFO.songImageSrc,
      songName: SONG_INFO.songName,
      album: SONG_INFO.album,
      artistName: SONG_INFO.artistName
    });
    this.audioInfoComponent.mount();
    this.audioRatingComponent = new RatingComponent(this.audioRating);
    this.audioRatingComponent.mount();
    this.dotsMenu = new DotsMenuComponent(this.dotsMenuPoint, {
      items: [
        { name: "Add to my songs", handler: () => {} },
        { name: "Share", handler: this.handleShare.bind(this) }
      ]
    });
    this.dotsMenu.mount();
  }

  handleShare() {
    window.open("/song/awdklawj");
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.mountChildren();
  }

  render() {
    return playerTemplate({
      src: SONG_INFO.songSrc
    });
  }
}
