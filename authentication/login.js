function handleSignIn(event) {
    event.preventDefault(); // Prevent the default form submission
    // Here you can add validation or API call to verify user credentials

    // If sign-in is successful, redirect to home.html
    window.location.href = '../home.html';
}

// Existing code for toggling panels remains
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});
