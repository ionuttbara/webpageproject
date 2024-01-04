// form.js
document.addEventListener('DOMContentLoaded', function () {
    // Obține referință la formular
    var form = document.querySelector('form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var message = document.getElementById('message').value;
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Message:', message);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('form');
    var submitButton = document.querySelector('button');

    submitButton.addEventListener('click', function () {
        form.classList.add('submitting');
        // Aici poți adăuga logica pentru trimiterea formularului la server, dacă este necesar
    });
});
