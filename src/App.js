import Router from "./routes";
import { initializeApp } from "firebase/app";

function App() {
  initializeApp({
    apiKey: "AIzaSyA7QyNDFFHJh3k4Z0JycEcKHjbVeH3EJtA",
    authDomain: "react-chat-81fe0.firebaseapp.com",
    projectId: "react-chat-81fe0",
    storageBucket: "react-chat-81fe0.appspot.com",
    messagingSenderId: "511726385829",
    appId: "1:511726385829:web:e1d91d3820b1e8f9b76b4c",
    measurementId: "G-VKWBGJPCZT",
  });
  return <Router />;
}

export default App;
