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
