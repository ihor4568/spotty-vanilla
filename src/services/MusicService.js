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

  static getSongRating(userId) {
    return database
      .ref(`users/${userId}/rating`)
      .once("value")
      .then(rating => rating.val());
  }

  static setNewRating(userId, songId, ratingValue) {
    database
      .ref(`users/${userId}`)
      .once("value")
      .then(user => user.val().rating)
      .then(rating => {
        if (!rating.includes(songId)) {
          database.ref(`users/${userId}/rating/${rating.length}`).set(songId);
          database
            .ref(`users/${userId}/rating/${rating.length + 1}`)
            .set(ratingValue);
        } else {
          const index = rating.indexOf(songId) + 1;
          database.ref(`users/${userId}/rating/${index}`).set(ratingValue);
        }
      });
  }
}
