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
}
