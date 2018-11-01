function getAuthorByName(name, databaseRef) {
  return databaseRef
    .ref("authors")
    .orderByChild("name")
    .equalTo(name);
}

function getAlbumByTitle(title, databaseRef) {
  return databaseRef
    .ref("albums")
    .orderByChild("title")
    .equalTo(title);
}

export class MusicStorage {
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

  getAuthorSongs(authorName) {
    return getAuthorByName(authorName, this.database)
      .once("value")
      .then(author => {
        const songs = [];
        Object.values(author.val())[0].songs.forEach(songId =>
          this.database
            .ref(`songs/${songId}`)
            .once("value")
            .then(song => songs.push(song.val()))
        );
        return songs;
      });
  }

  getAlbumSongs(albumTitle) {
    return getAlbumByTitle(albumTitle, this.database)
      .once("value")
      .then(album => {
        const songs = [];
        Object.values(album.val())[0].songs.forEach(songId =>
          this.database
            .ref(`songs/${songId}`)
            .once("value")
            .then(song => songs.push(song.val()))
        );
        return songs;
      });
  }
}
