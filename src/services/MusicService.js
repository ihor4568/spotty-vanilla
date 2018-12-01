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
          author.val().songs.map(songId => MusicService.getSongById(songId))
        )
      );
  }

  static getAlbumSongs(albumId) {
    return database
      .ref(`albums/${albumId}`)
      .once("value")
      .then(album =>
        Promise.all(
          album.val().songs.map(songId => MusicService.getSongById(songId))
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

  static getUserSongs(userId) {
    return database
      .ref(`users/${userId}/songs`)
      .once("value")
      .then(data => data.val() || [])
      .then(songs =>
        Promise.all(songs.map(songId => MusicService.getSongById(songId)))
      );
  }

  static setUserSong(userId, songId) {
    return database
      .ref(`users/${userId}/songs`)
      .once("value")
      .then(data => data.val() || [])
      .then(songs => {
        if (!songs.includes(songId)) {
          return database
            .ref(`users/${userId}/songs/${songs.length}`)
            .set(songId);
        }
        return Promise.reject();
      });
  }

  static removeUserSong(userId, songId) {
    return database
      .ref(`users/${userId}/songs`)
      .once("value")
      .then(data => data.val())
      .then(songs => {
        const filteredSongs = songs.filter(song => song !== songId);
        return database.ref(`users/${userId}/songs`).set(filteredSongs);
      });
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
      .then(rating => rating.val() || {});
  }

  static setNewSongRating(userId, songId, ratingValue) {
    return database.ref(`users/${userId}/rating/${songId}`).set(ratingValue);
  }
}
