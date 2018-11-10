import { FirebaseService } from "./FirebaseService";

const database = FirebaseService.database();

export class MusicService {
  static getAlbums() {
    return database
      .ref("albums")
      .once("value")
      .then(snapshot => Object.values(snapshot.val()));
  }

  static getAuthors() {
    return database
      .ref("authors")
      .once("value")
      .then(snapshot => Object.values(snapshot.val()));
  }

  static getAuthorSongs(authorId) {
    return database
      .ref(`authors/${authorId}`)
      .once("value")
      .then(author =>
        Promise.all(
          author.val().songs.map(songId =>
            database
              .ref(`songs/${songId}`)
              .once("value")
              .then(song => song.val())
          )
        )
      );
  }

  static getAlbumSongs(albumId) {
    return database
      .ref(`albums/${albumId}`)
      .once("value")
      .then(album =>
        Promise.all(
          album.val().songs.map(songId =>
            database
              .ref(`songs/${songId}`)
              .once("value")
              .then(song => song.val())
          )
        )
      );
  }

  static getAlbumById(id) {
    return database
      .ref(`albums/${id}`)
      .once("value")
      .then(album => album.val());
  }

  static getAuthorById(id) {
    return database
      .ref(`authors/${id}`)
      .once("value")
      .then(author => author.val());
  }

  static getSongById(songId) {
    return database
      .ref(`songs/${songId}`)
      .once("value")
      .then(song => song.val());
  }

  static getAuthorNameFromId(authorsIds) {
    return Promise.all(
      authorsIds.map(authorId =>
        this.getAuthorById(authorId).then(author => author.name)
      )
    );
  }
}
