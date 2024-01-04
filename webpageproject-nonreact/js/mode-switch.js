document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('toggleButton');
    const body = document.body;

    // Check if the user has a preference for dark mode
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Apply the initial mode based on user's preference or stored cookie
    const initialMode = getCookie('mode') || (prefersDarkMode ? 'dark' : 'light');
    setMode(initialMode);

    // Toggle the mode on button click
    toggleButton.addEventListener('click', function () {
        const newMode = body.classList.contains('light-mode') ? 'dark' : 'light';
        setMode(newMode);
        setCookie('mode', newMode);
    });

    function setMode(mode) {
    body.classList.remove('light-mode', 'dark-mode');
    body.classList.add(`${mode}-mode`);
    const elementsToSwitch = document.querySelectorAll(':not(.no-mode-switch)');
    elementsToSwitch.forEach((element) => {
        if (!element.style.backgroundColor) {
            element.classList.remove('light-mode', 'dark-mode');
            element.classList.add(`${mode}-mode`);
        }
    });

    // Apply the mode to the footer explicitly
    const footer = document.querySelector('footer');
    if (footer) {
        footer.classList.remove('light-mode', 'dark-mode');
        footer.classList.add(`${mode}-mode`);
    }
    }

    function setCookie(name, value) {
        document.cookie = `${name}=${value}; path=/`;
    }

    function getCookie(name) {
        const cookies = document.cookie.split('; ');
        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName === name) {
                return cookieValue;
            }
        }
        return null;
    }
});

