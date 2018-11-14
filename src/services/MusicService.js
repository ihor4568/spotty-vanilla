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

  static getAuthorNamesByIds(authorsIds) {
    return Promise.all(
      authorsIds.map(authorId =>
        this.getAuthorById(authorId).then(author => author.name)
      )
    );
  }

  static changeSongsOrder(arr) {
    return new Promise(() => {
      FirebaseService.auth().onAuthStateChanged(user => {
        if (user) {
          database.ref(`users/${user.uid}/songs`).set(arr);
        }
      });
    });
  }

  static getSongRating(userId) {
    return database
      .ref(`users/${userId}/rating/`)
      .once("value")
      .then(rating => rating.val());
  }

  static setNewRating(userId, songId, ratingValue) {
    return database
      .ref(`users/${userId}`)
      .once("value")
      .then(user => user.val().rating)
      .then(() =>
        database.ref(`users/${userId}/rating/${songId}`).set(ratingValue)
      );
  }
}
