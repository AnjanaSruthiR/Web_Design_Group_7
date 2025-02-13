function redirectToHome(event) {
    event.preventDefault();  // Prevents default form submission

    console.log("Redirect function called");  // Debugging log

    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const emailPattern = /^[a-zA-Z0-9._-]+@(gmail\.com|northeastern\.edu)$/;

    email.classList.remove('is-invalid');
    password.classList.remove('is-invalid');

    let isValid = true;

    if (!emailPattern.test(email.value)) {
        email.classList.add('is-invalid');
        isValid = false;
    }

    if (password.value.length < 6) {
        password.classList.add('is-invalid');
        isValid = false;
    }

    console.log("Is form valid?:", isValid);  // Debugging log

    if (isValid) {
        window.location.href = "../Home/Home.html";  // Redirect to Home
    }
}


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

