import { ProgressBarComponent } from "./ProgressBar/ProgressBar";
import { AudioInfoComponent } from "./AudioInfo/AudioInfo";
import { RatingComponent } from "./Rating/Rating";
import { MainControlComponent } from "./MainControl/MainControl";
import { DotsMenuComponent } from "../DotsMenu/DotsMenu";

import playerTemplate from "./MediaPlayer.html";
import { MusicService } from "../../services/MusicService";
import { AuthService } from "../../services/AuthService";

export class MediaPlayerComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
    this.song = null;
    this.isPlaying = false;
    this.songsData = null;
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
      onPlayerChangeState: this.handlePlayerChangeState.bind(this),
      onNextClick: this.onNextClick.bind(this),
      onPrevClick: this.onPrevClick.bind(this)
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
    window.open(`/song/${this.song.id}`);
  }

  handleLegal() {
    this.props.onLegalOptionClick({
      licenseInfo: this.song.album.licenseInfo,
      licenseURL: this.song.album.licenseURL
    });
    this.props.onDialogOpen();
  }

  handleAddSong() {
    MusicService.setUserSong(
      AuthService.getCurrentUser().uid,
      this.song.id
    ).then(this.props.onAddSong);
  }

  setNewSong(song) {
    this.song = song;
    this.audioInfoComponent.setInfo({
      imageSrc: song.album.imageURL,
      songName: song.name,
      album: song.album.name,
      artistName: song.authorsInfo.map(author => author.name).join(", ")
    });
    this.audioRatingComponent.setInfo({
      songId: song.id
    });

    if (song.songURL !== this.audio.src) {
      this.audio.src = song.songURL;
    }
    this.song = song;
    this.mainControlPannel.play();

    this.showPlayer();
    return this.song;
  }

  setSongsData(songs) {
    this.songsData = songs;
  }

  findCurrentSongIndex() {
    const index = this.songsData.findIndex(
      value => this.audio.src === value.songURL
    );
    return index;
  }

  findNextSong() {
    const songIndex = this.findCurrentSongIndex();
    if (this.songsData[songIndex + 1]) {
      return this.songsData[songIndex + 1];
    }
    return this.songsData[0];
  }

  findPrevSong() {
    const songIndex = this.findCurrentSongIndex();
    if (this.songsData[songIndex - 1]) {
      return this.songsData[songIndex - 1];
    }
    return this.songsData[this.songsData.length - 1];
  }

  onNextClick() {
    this.setNewSong(this.findNextSong());
  }

  onPrevClick() {
    this.setNewSong(this.findPrevSong());
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
