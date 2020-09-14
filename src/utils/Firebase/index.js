import app from "firebase/app";
import "firebase/auth";

import { signinWithAuthProvider } from "../../pages/LoginPage/containers/UserFunctions";

let firebase;

const config = {
  appId: process.env.REACT_APP_APP_ID,
  apiKey: process.env.REACT_APP_API_KEY,
  projectId: process.env.REACT_APP_PROJECT_ID,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.app = app;
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();
  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  googleSignIn = (checkUser, push) => {
    const provider = new this.app.auth.GoogleAuthProvider();
    this.app
      .auth()
      .signInWithPopup(provider)
      .then(async function (result) {
        var token = result.credential.accessToken;
        var user = result.user;
        const resp = await signinWithAuthProvider(user.email, token);
        if (resp) {
          checkUser();
          push("/home");
        }
        return resp;
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log({ errorMessage, errorCode });
      });
  };

  fbSignIn = (checkUser, push) => {
    const provider = new this.app.auth.FacebookAuthProvider();
    this.app
      .auth()
      .signInWithPopup(provider)
      .then(async function (result) {
        // var token = result.credential.accessToken;
        var user = result.user;
        const resp = await signinWithAuthProvider(user.email);
        if (resp) {
          checkUser();
          push("/home");
        }
        return resp;
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log({ errorMessage, errorCode });
      });
  };
}

if (!firebase) {
  console.log("New Firebase");
  firebase = new Firebase();
} else {
  console.log("Already have firebase instance");
}

export default firebase;
