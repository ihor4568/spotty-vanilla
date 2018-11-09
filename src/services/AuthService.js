import { FirebaseService } from "./FirebaseService";

const auth = FirebaseService.auth();

export class AuthService {
  static signIn(email, pass) {
    return auth
      .signInWithEmailAndPassword(email, pass)
      .then(() => window.location.reload());
  }

  static signUp(email, pass, name) {
    return auth.createUserWithEmailAndPassword(email, pass).then(() => {
      auth.currentUser.updateProfile({ displayName: name });
      window.location.reload();
    });
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
