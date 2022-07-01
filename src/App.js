import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from "firebase/auth";
import { useState } from 'react';

initializeAuthentication()
const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();


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
        console.log(photoURL)
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
  return (
    <div className="App">
      {!user.name ?
        <div>
          <button onClick={handleGoogleSignIn}>Google Sign In</button>
          <button onClick={handleGitHubSingIn}>GitHub Sing In</button>
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
