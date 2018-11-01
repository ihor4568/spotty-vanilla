export class FirebaseDatabase {
  constructor(firebaseDatabaseRef) {
    this.database = firebaseDatabaseRef;
  }

  getAlbums(retriveDataCb) {
    const albums = [];
    this.database
      .ref("albums")
      .once("value", snapshot => {
        snapshot.forEach(childSnapshot => {
          albums.push(childSnapshot.val());
        });
      })
      .then(retriveDataCb(albums));
  }

  getAuthors(retriveDataCb) {
    const authors = [];
    this.database
      .ref("authors")
      .once("value", snapshot => {
        snapshot.forEach(childSnapshot => {
          authors.push(childSnapshot.val());
        });
      })
      .then(retriveDataCb(authors));
  }
}
