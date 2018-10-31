import { firebase } from "./firebase";

const database = firebase.database();

function getAlbumIdByTitle(title) {
  return database
    .ref("albums")
    .orderByChild("title")
    .equalTo(title);
}

export function createAlbum(album) {
  getAlbumIdByTitle(album.title).once("value", snapshot => {
    if (!snapshot.exists()) {
      database
        .ref("albums/")
        .push()
        .set({ ...album });
    }
  });
}

export function addSong(albumTitle, song) {
  getAlbumIdByTitle(albumTitle).once("value", snapshot => {
    if (snapshot.exists()) {
      const albumId = Object.keys(snapshot.val())[0];
      database
        .ref(`songs/${albumId}/`)
        .push()
        .set(song);
    }
  });
}
