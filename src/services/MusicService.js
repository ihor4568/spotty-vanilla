export class MusicService {
  constructor(database) {
    this.database = database;
  }

  getAlbums() {
    return this.database
      .ref("albums")
      .once("value")
      .then(snapshot => Object.values(snapshot.val()).map(child => child));
  }

  getAuthors() {
    return this.database
      .ref("authors")
      .once("value")
      .then(snapshot => Object.values(snapshot.val()).map(child => child));
  }

  getAuthorSongs(authorId) {
    return this.database
      .ref(`authors/${authorId}`)
      .once("value")
      .then(author => {
        const songs = [];
        author.val().songs.forEach(songId =>
          this.database
            .ref(`songs/${songId}`)
            .once("value")
            .then(song => songs.push(song.val()))
        );
        return songs;
      });
  }

  getAlbumSongs(albumId) {
    return this.database
      .ref(`albums/${albumId}`)
      .once("value")
      .then(album => {
        const songs = [];
        album.val().songs.forEach(songId =>
          this.database
            .ref(`songs/${songId}`)
            .once("value")
            .then(song => songs.push(song.val()))
        );
        return songs;
      });
  }
}
