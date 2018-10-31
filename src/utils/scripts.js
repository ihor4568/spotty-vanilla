import { firebase } from "./firebase";

const database = firebase.database();

// TODO: Prevent album creation if album with this name already exists
export function createAlbum(title) {
  database
    .ref("albums/")
    .push()
    .set({ title });
}

function getAlbumIdByTitle(title) {
  return this.firebaseRealtimeDatabase
    .ref("albums")
    .orderByChild("title")
    .equalTo(title)
    .once("value");
}

// TODO: Same with the song. I think two songs with the same name can be in different albums, but not in one album
export function addSong(album, song) {
  getAlbumIdByTitle(album).then(snapshot => {
    const albumId = Object.keys(snapshot.val())[0];
    database
      .ref(`songs/${albumId}/`)
      .push()
      .set(song);
  });
}
