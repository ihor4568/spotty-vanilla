import { FirebaseService } from "./FirebaseService";

const auth = FirebaseService.auth();

export class AuthentificationService {
  static signIn(email, pass, cbf) {
    auth.createUserWithEmailAndPassword(email, pass).catch(err => {
      cbf(err);
    });
  }

  static signUp(email, pass, name, cbf) {
    auth
      .createUserWithEmailAndPassword(email, pass)
      .then(
        auth.currentUser.updateProfile({
          displayName: name
        })
      )
      .catch(err => {
        cbf(err);
      });
  }

  static signOut() {
    auth.signOut();
  }

  static check(cb) {
    auth.onAuthStateChanged(user => {
      cb(user);
    });
  }
}
