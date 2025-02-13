function validateForm(event) {
    event.preventDefault(); 

    const email = document.getElementById('email');
    const password = document.getElementById('password');

    const emailPattern = /^[a-zA-Z0-9._-]+@(gmail\.com|northeastern\.edu)$/;
    const emailValid = emailPattern.test(email.value);
    const passwordValid = password.value.length >= 6;

    email.classList.remove('is-invalid');
    password.classList.remove('is-invalid');

    if (!emailValid) {
        email.classList.add('is-invalid');
    }

    if (!passwordValid) {
        password.classList.add('is-invalid');
    }

    if (emailValid && passwordValid) {
        window.location.href = "../Home/Home.html"; // Redirect to home page
    }
}

document.getElementById('email').addEventListener('input', function () {
    const email = document.getElementById('email');
    const emailPattern = /^[a-zA-Z0-9._-]+@(gmail\.com|northeastern\.edu)$/;
    
    // Check if the email is valid and update error dynamically
    if (emailPattern.test(email.value)) {
        email.classList.remove('is-invalid');
    } else {
        email.classList.add('is-invalid');
    }
});

document.getElementById('password').addEventListener('input', function () {
    const password = document.getElementById('password');
    
    if (password.value.length >= 6) {
        password.classList.remove('is-invalid');
    } else {
        password.classList.add('is-invalid');
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('.needs-validation');

    form.addEventListener("submit", function (event) {
        if (!validateForm(event)) {
            event.preventDefault();
            event.stopPropagation();
        }
        form.classList.add("was-validated");
    });
});

