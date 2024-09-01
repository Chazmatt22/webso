import { getAuth, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
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

// Redirect to login if not authenticated
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = 'index.html'; // Redirect to login page
    } else {
        // User is signed in, update UI with user info
        document.getElementById('userName').textContent = `Welcome ${user.email}`;
        // Assuming user's profile picture URL is available in user.photoURL
        document.getElementById('profilePic').src = user.photoURL || 'path/to/default-profile.jpg';
    }
});

// Sign-out functionality
document.getElementById('signOutButton').addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = 'index.html'; // Redirect to login page after sign out
    }).catch((error) => {
        console.error('Sign Out Error', error);
    });
});
