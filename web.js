document.addEventListener('DOMContentLoaded', () => {
    const toggleLinks = document.querySelectorAll('.auth-toggle-link');
    const signupSection = document.querySelector('.signup-section');
    const loginSection = document.querySelector('.login-section');

    toggleLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevents the default link behavior

            // Toggles visibility of the sections
            if (signupSection.style.display === 'none') {
                signupSection.style.display = 'block';
                loginSection.style.display = 'none';
            } else {
                signupSection.style.display = 'none';
                loginSection.style.display = 'block';
            }
        });
    });

    // Signup Functionality
    document.getElementById('signup-btn').addEventListener('click', () => {
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        if (name && email && password) {
            // Sends data to the backend to save into MongoDB
            fetch('http://localhost:4000/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            })
            .then(response => response.json())
            .then(data => {
                alert('Sign Up Successful! Redirecting to Login page...');
                // Hides the signup section and shows the login section
                document.querySelector('.signup-section').style.display = 'none';
                document.querySelector('.login-section').style.display = 'block';
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error with the signup process. Please try again.');
            });
        } else {
            alert('Please fill in all fields.');
        }
    });

    // Login Functionality
    document.getElementById('login-btn').addEventListener('click', () => {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // Sends data to the backend for login check
        fetch('http://localhost:4000/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert('Invalid email or password. Please try again.');
            } else {
                alert(`Welcome back, ${data.name}!`);
                window.location.href = 'index.html';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error with the login process. Please try again.');
        });
    });
});