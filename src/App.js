import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
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
        const user = result.user;
        console.log(user)
      })

  }
  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Google Sign In</button>
      <button onClick={handleGitHubSingIn}>GitHub Sing In</button>
      {
        user.email && <div>
          <h1>Welcome  {user.name}</h1>
          <h3>I know your email {user.email}</h3>
          <img src={user.photoUrl} alt=''></img>
        </div>
      }
    </div>
  );
}

export default App;
