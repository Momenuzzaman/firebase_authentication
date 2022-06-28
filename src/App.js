import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from 'react';

initializeAuthentication()
const provider = new GoogleAuthProvider();

function App() {
  const [user, setUser] = useState({})
  const handleGoogleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, photoURL, email } = result.user;
        const loggedInUser = {
          name: displayName,
          photo: photoURL,
          email: email
        };
        setUser(loggedInUser);
      }).catch((error) => {
        console.log(error.message);
      })

  }
  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Google Sign In</button>
      {
        user.email && <div>
          <h1>Welcome  {user.name}</h1>
          <h3>I know your email {user.email}</h3>
          <img src={user.photo} alt=''></img>
        </div>
      }
    </div>
  );
}

export default App;
