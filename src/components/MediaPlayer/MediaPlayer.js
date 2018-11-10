import { ProgressBarComponent } from "./ProgressBar/ProgressBar";
import { AudioInfoComponent } from "./AudioInfo/AudioInfo";
import { RatingComponent } from "./Rating/Rating";
import { MainControlComponent } from "./MainControl/MainControl";
import { DotsMenuComponent } from "../DotsMenu/DotsMenu";

import playerTemplate from "./MediaPlayer.html";

export class MediaPlayerComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;

    this.song = null;
    this.isPlaying = false;
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
      audio: this.audio,
      onPlayerChangeState: this.handlePlayerChangeState.bind(this)
    });
    this.mainControlPannel.mount();
    this.audioProgressBar = new ProgressBarComponent(this.progressBar, {
      audio: this.audio
    });
    this.audioProgressBar.mount();
    this.audioInfoComponent = new AudioInfoComponent(this.audioInfo);
    this.audioInfoComponent.mount();
    this.audioRatingComponent = new RatingComponent(this.audioRating);
    this.audioRatingComponent.mount();
    this.dotsMenu = new DotsMenuComponent(this.dotsMenuPoint, {
      items: [
        { name: "Legal info", handler: this.handleLegal.bind(this) },
        { name: "Add to my songs", handler: () => {} },
        { name: "Share", handler: this.handleShare.bind(this) }
      ]
    });
    this.dotsMenu.mount();
  }

  handleShare() {
    window.open(`/song/${this.song.id}`);
  }

  handleLegal() {
    this.props.dialogGetInfo({
      licenseInfo: this.song.album.licenseInfo,
      licenseURL: this.song.album.licenseURL
    });
    this.props.dialogOpen();
  }

  setNewSong(song) {
    this.song = song;
    this.audioInfoComponent.setInfo({
      imageSrc: song.album.imageURL,
      songName: song.name,
      album: song.album.name,
      artistName: song.authorsInfo.map(author => author.name).join(", ")
    });

    if (song.songURL !== this.audio.src) {
      this.audio.src = song.songURL;
    }
    this.song = song;
    this.mainControlPannel.play();

    this.showPlayer();
  }

  showPlayer() {
    if (this.audio.play) {
      this.mountPoint.classList.remove("main__player_hide");
    }
  }

  stop() {
    this.mainControlPannel.stop();
  }

  handlePlayerChangeState(isPlaying) {
    this.isPlaying = isPlaying;
    this.props.onPlayerChangeState(this.song ? this.song.id : null, isPlaying);
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
