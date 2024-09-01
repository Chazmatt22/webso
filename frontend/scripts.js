import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';

// Initialize Firebase
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

// Get DOM elements
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const loginDiv = document.getElementById('loginDiv');
const signupDiv = document.getElementById('signupDiv');
const showSignup = document.getElementById('showSignup');
const showLogin = document.getElementById('showLogin');
const loginMessage = document.getElementById('loginMessage');
const signupMessage = document.getElementById('signupMessage');

// Handle signup
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        signupMessage.textContent = 'Signup successful! You can now log in.';
        signupForm.reset();
        setTimeout(() => {
            loginDiv.style.display = 'block';
            signupDiv.style.display = 'none';
        }, 2000);
    } catch (error) {
        signupMessage.textContent = 'Error: ' + error.message;
    }
});

// Handle login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        loginMessage.textContent = 'Login successful!';
        loginForm.reset();
        // Redirect to the homepage
        window.location.href = 'homepage.html'; // Change 'homepage.html' to the URL of your homepage
    } catch (error) {
        loginMessage.textContent = 'Error: ' + error.message;
    }
});

// Toggle between login and signup forms
showSignup.addEventListener('click', () => {
    loginDiv.style.display = 'none';
    signupDiv.style.display = 'block';
});

showLogin.addEventListener('click', () => {
    signupDiv.style.display = 'none';
    loginDiv.style.display = 'block';
});
