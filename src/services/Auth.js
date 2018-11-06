import { FirebaseService } from "./FirebaseService";

const auth = FirebaseService.auth();

export class AuthService {
  static signIn(email, pass) {
    auth.signInWithEmailAndPassword(email, pass);
  }

  static signUp(email, pass) {
    auth.createUserWithEmailAndPassword(email, pass);
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
