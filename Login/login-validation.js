function validateForm(event) {
    console.log("validateForm called");  // Check if the function is triggered
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

    console.log(isValid); // Check if it's true or false
    if (isValid) {
         window.location.href = "../Home/Home.html";
    } else {
         event.preventDefault();
    }
    return isValid;
}


(function () {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity() || !validateForm(event)) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false)
        })
})();
