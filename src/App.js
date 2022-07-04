import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut, FacebookAuthProvider } from "firebase/auth";
import { useState } from 'react';

initializeAuthentication()
const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();


function App() {
  const [user, setUser] = useState({})
  const auth = getAuth();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const { displayName, photoURL, email } = result.user;
        const loggedInUser = {
          name: displayName,
          photoUrl: photoURL,
          email: email
        };
        setUser(loggedInUser);
      }).catch((error) => {
        console.log(error.message);
      })
  }
  const handleGitHubSingIn = () => {
    signInWithPopup(auth, gitHubProvider)
      .then((result) => {
        const { displayName, photoURL, email } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photoURL: photoURL
        }
        setUser(loggedInUser)
      })
  }
  const handleSingOut = () => {
    signOut(auth)
      .then(() => {
        setUser({})
      })
  }
  const handleFacebookSingIn = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        const { displayName, photoURL, email } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photoURL: photoURL
        }
        setUser(loggedInUser);
      })
  }
  return (
    <div className="App">
      {!user.name ?
        <div>
          <button onClick={handleGoogleSignIn}>Google Sign In</button>
          <button onClick={handleGitHubSingIn}>GitHub Sing In</button>
          <button onClick={handleFacebookSingIn}>Facebook Sign In</button>
        </div> :
        <button onClick={handleSingOut}>Log Out</button>
      }

      {
        user.name && <div>
          <h1>Welcome  {user.name}</h1>
          <h3>I know your email {user.email}</h3>
          <img src={user.photoUrl} alt=''></img>
        </div>
      }
    </div>
  );
}

export default App;
