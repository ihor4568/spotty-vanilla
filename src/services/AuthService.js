import { FirebaseService } from "./FirebaseService";

const auth = FirebaseService.auth();

export class AuthService {
  static signIn(email, pass, cb = null) {
    auth
      .signInWithEmailAndPassword(email, pass)
      .then(() => {
        window.location.reload();
      })
      .catch(err => cb(err.code));
  }

  static signUp(email, pass, name, cb) {
    auth
      .createUserWithEmailAndPassword(email, pass)
      .then(() => {
        auth.currentUser.updateProfile({ displayName: name });
        window.location.reload();
      })
      .catch(err => cb(err.code));
  }

  static signOut() {
    auth.signOut();
  }

  static check() {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged(user => {
        if (user) {
          resolve(user);
        } else {
          reject(user);
        }
      });
    });
  }
}
