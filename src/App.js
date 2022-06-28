import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


initializeAuthentication()
const provider = new GoogleAuthProvider();

function App() {
  return (
    <div className="App">

    </div>
  );
}

export default App;
