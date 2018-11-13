import { ProgressBarComponent } from "./ProgressBar/ProgressBar";
import { AudioInfoComponent } from "./AudioInfo/AudioInfo";
import { RatingComponent } from "./Rating/Rating";
import { MainControlComponent } from "./MainControl/MainControl";
import { DotsMenuComponent } from "../DotsMenu/DotsMenu";
import { LicenseDialogComponent } from "../LicenseDialog/LicenseDialog";

import playerTemplate from "./MediaPlayer.html";
import { MusicService } from "../../services/MusicService";
import { AuthService } from "../../services/AuthService";

const SONG_INFO = {
  id: "song0",
  songSrc:
    "https://storage.mp3cc.biz/download/89035703/U2hXUUsxUTVxellvRHcrQTNaNUdIM0drb2J3dWhaNjNacXRmdGU5bGZtN3pMcHdUNnhicmozMDlHcHBnRHNZRTZoSEJzMldvQTl1SGk1TjU2VFJyK0dHOUFiMUZVZzBYVTQ2NU8xVEwxZjlLbmZtaWlZQk1TVE1MVDBleThqdVg/jazzamor-jazzamor-je-t-aime_(mp3CC.biz).mp3",
  songImageSrc:
    "https://s-media-cache-ak0.pinimg.com/originals/0e/f8/fd/0ef8fd42bb061ede2c2b6d1a9689782b.jpg",
  songName: "Way Back",
  album: "Lazy Sunday",
  artistName: "Jazzamor",
  songId: "song1",
  licenseInfo:
    "BJ Block & Dawn Pemberton is licensed under a Attribution-NonCommercial-NoDerivatives (aka Music Sharing) 3.0 International License.",
  licenseURL: "https://creativecommons.org/licenses/by-nc-nd/3.0/"
};

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
    this.dialogPoint = this.mountPoint.querySelector(".media-player__dialog");
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
        { name: "Add to my songs", handler: this.handleAddSong.bind(this) },
        { name: "Share", handler: this.handleShare.bind(this) }
      ]
    });
    this.dotsMenu.mount();
  }

  handleShare() {
    window.open(`/song/${SONG_INFO.songId}`);
  }

  handleLegal() {
    this.licenseDialogComponent = new LicenseDialogComponent(this.dialogPoint, {
      licenseInfo: SONG_INFO.licenseInfo, // TODO
      licenseURL: SONG_INFO.licenseURL
    });
    this.licenseDialogComponent.mount();
  }

  handleAddSong() {
    MusicService.setUserSong(
      AuthService.getCurrentUser().uid,
      this.song.id
    ).then(() => this.props.onAddSong());
  }

  setNewSong(song) {
    this.song = song;
    this.audioInfoComponent.updateInfo({
      imageSrc: song.album.imageURL,
      songName: song.name,
      album: song.album.name,
      artistName: song.authorsInfo.map(author => author.name).join(", ")
    });

    if (song.songURL !== this.audio.src) {
      this.audio.src = song.songURL;
    }

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
