// Initialize Firebase Authentication
const auth = firebase.auth();

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
        await auth.createUserWithEmailAndPassword(email, password);
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
        await auth.signInWithEmailAndPassword(email, password);
        loginMessage.textContent = 'Login successful!';
        loginForm.reset();
        // Redirect or perform actions after login
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
