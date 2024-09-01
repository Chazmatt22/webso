// Import and configure Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCxaE_CkJASq7V5L0injFdbyYiBXTodVts",
    authDomain: "westminster-64587.firebaseapp.com",
    projectId: "westminster-64587",
    storageBucket: "westminster-64587.appspot.com",
    messagingSenderId: "622409416864",
    appId: "1:622409416864:web:0183c189c12adebad5c9c5",
    measurementId: "G-JS4B5CGKHT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle signup
document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        document.getElementById('message').textContent = 'Signup successful!';
    } catch (error) {
        document.getElementById('message').textContent = 'Error: ' + error.message;
    }
});

// Handle login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        document.getElementById('message').textContent = 'Login successful!';
    } catch (error) {
        document.getElementById('message').textContent = 'Error: ' + error.message;
    }
});
