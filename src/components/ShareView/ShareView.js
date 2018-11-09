import { MDCRipple } from "@material/ripple";
import shareViewTemplate from "./ShareView.html";
import { MusicService } from "../../services/MusicService";

export class ShareViewComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
    this.title = {};
  }

  fetchAuthors(authorsIds) {
    return Promise.all(
      authorsIds.map(authorId => MusicService.getAuthorById(authorId))
    );
  }

  fetchInfoBySong(song) {
    const albumPromise = MusicService.getAlbumById(song.albumId);
    const authorsPromise = this.fetchAuthors(song.authors);

    return Promise.all([albumPromise, authorsPromise]);
  }

  async fetchSongsById(songId) {
    const songsPromise = await MusicService.getSongById(songId);
    this.albumId = songsPromise.albumId;
  }

  fetchSongs(songId) {
    MusicService.getAlbumSongs(this.albumId)
      .then(songs => {
        this.songs = songs;

        return Promise.all(this.songs.map(song => this.fetchInfoBySong(song)));
      })
      .then(songsInfo => {
        songsInfo.forEach((item, i) => {
          const [album, authorsInfo] = item;

          this.songs[i].album = album;
          this.songs[i].authorsInfo = authorsInfo;
        });
        this.initData(songId);
        this.mount();
      });
  }

  querySelectors() {
    this.shareViewRiplePoint = this.mountPoint.querySelector(
      ".share-view__card-riple"
    );
  }

  async setSongId(songId) {
    await this.fetchSongsById(songId);
    this.fetchSongs(songId);
  }

  initData(songId) {
    this.songId = songId;
    const authorArray = [];
    let joinedArray = [];
    let song = {};

    this.songs.forEach(element => {
      if (element.id === this.songId) {
        song = element;
      }
    });

    song.authorsInfo.forEach(author => {
      authorArray.push(author.name);
    });
    joinedArray = authorArray.join(", ");
    this.tile = {
      songName: song.name,
      imageURL: song.album.imageURL,
      authors: joinedArray
    };
  }

  initMaterial() {
    // eslint-disable-next-line no-new
    new MDCRipple(this.shareViewRiplePoint);
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.initMaterial();
  }

  render() {
    return shareViewTemplate(this.tile);
  }
}
