import { MDCRipple } from "@material/ripple";
import shareViewTemplate from "./ShareView.html";
import { MusicService } from "../../services/MusicService";

export class ShareViewComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
    this.tile = {
      songName: {},
      imageURL: {},
      authors: []
    };
  }

  async setSongId(songId) {
    const song = await MusicService.getSongById(songId);
    const album = await MusicService.getAlbumById(song.albumId);
    const authorName = await MusicService.getAuthorNamesByIds(song.authors);

    this.tile.songName = song.name;
    this.tile.imageURL = album.imageURL;
    this.tile.authors = authorName.join(", ");
    this.mount(this.tile);
  }

  querySelectors() {
    this.shareViewRiplePoint = this.mountPoint.querySelector(
      ".share-view__card-riple"
    );
  }

  initMaterial() {
    // eslint-disable-next-line no-new
    new MDCRipple(this.shareViewRiplePoint);
  }

  mount(data) {
    if (data) {
      this.mountPoint.innerHTML = this.render(data);
      this.querySelectors();
      this.initMaterial();
    }
  }

  render() {
    return shareViewTemplate(this.tile);
  }
}
