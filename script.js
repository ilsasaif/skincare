
/* =================================
   FEATURE A: MOBILE MENU TOGGLE
================================= */

// Find the menu button and navigation
const menuButton =
    document.getElementById("menuButton") ||
    document.getElementById("menu-btn") ||
    document.querySelector(".menu-button");

const nav =
    document.getElementById("nav") ||
    document.getElementById("nav-links") ||
    document.getElementById("navigation") ||
    document.querySelector(".nav-links");

if (menuButton && nav) {

    menuButton.addEventListener("click", function () {
        const isOpen = nav.classList.toggle("open");

        // Support CSS that uses the "active" class
        nav.classList.toggle("active", isOpen);

        menuButton.textContent = isOpen ? "×" : "☰";
        menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    // Close the menu after clicking a navigation link
    nav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            nav.classList.remove("open", "active");
            menuButton.textContent = "☰";
            menuButton.setAttribute("aria-expanded", "false");
        });
    });
}


/* =================================
   FEATURE B: DARK MODE TOGGLE
================================= */

// Find the dark mode button
const themeButton =
    document.getElementById("themeButton") ||
    document.getElementById("theme-btn") ||
    document.getElementById("theme-toggle");

if (themeButton) {

    // Set the initial button text
    themeButton.textContent =
        document.body.classList.contains("dark")
            ? "Light Mode"
            : "Dark Mode";

    themeButton.addEventListener("click", function () {

        // Toggle dark mode on the body
        const isDark = document.body.classList.toggle("dark");

        // Update button text
        themeButton.textContent = isDark
            ? "Light Mode"
            : "Dark Mode";

        // Accessibility support
        themeButton.setAttribute(
            "aria-pressed",
            String(isDark)
        );
    });
}
document.addEventListener("DOMContentLoaded", function () {
    const themeButton = document.getElementById("themeButton");

    themeButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            themeButton.textContent = "Light Mode";
        } else {
            themeButton.textContent = "Dark Mode";
        }
    });
});

/* =================================
   FEATURE C: CONTACT FORM VALIDATION
================================= */

document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contactForm");

    if (!contactForm) {
        return;
    }

    const nameInput = document.getElementById("contactName");
    const emailInput = document.getElementById("contactEmail");
    const messageInput = document.getElementById("contactMessage");
    const formMessage = document.getElementById("formMessage");

    function showError(input, message) {
        let error = document.getElementById(input.id + "Error");

        if (!error) {
            error = document.createElement("small");
            error.id = input.id + "Error";
            error.className = "field-error";
            input.insertAdjacentElement("afterend", error);
        }

        error.textContent = message;
        input.setAttribute("aria-invalid", "true");
    }

    function clearError(input) {
        const error = document.getElementById(input.id + "Error");

        if (error) {
            error.textContent = "";
        }

        input.removeAttribute("aria-invalid");
    }

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        clearError(nameInput);
        clearError(emailInput);
        clearError(messageInput);

        formMessage.textContent = "";
        formMessage.style.color = "#38734a";

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        let isValid = true;

        // NAME VALIDATION
        const namePattern = /^[A-Za-z][A-Za-z\s'-]{1,49}$/;

        if (name === "") {
            showError(nameInput, "Name is required.");
            isValid = false;
        } else if (!namePattern.test(name)) {
            showError(
                nameInput,
                "Invalid name! Enter a valid name using letters only."
            );
            isValid = false;
        }

        // EMAIL VALIDATION
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "") {
            showError(emailInput, "Email is required.");
            isValid = false;
        } else if (!emailPattern.test(email)) {
            showError(
                emailInput,
                "Invalid email! Please enter a valid email address."
            );
            isValid = false;
        }

        // MESSAGE VALIDATION
        if (message === "") {
            showError(messageInput, "Message is required.");
            isValid = false;
        } else if (message.length < 10) {
            showError(
                messageInput,
                "Message must be at least 10 characters long."
            );
            isValid = false;
        }

        // STOP IF THERE ARE ERRORS
        if (!isValid) {
            formMessage.style.color = "#d93025";
            formMessage.textContent =
                "Please correct the errors above and try again.";
            return;
        }

        // SUCCESS MESSAGE
        formMessage.textContent =
            "Thank you for contacting ILSEA! This website is for practice purposes only, so your message has not been sent.";

        contactForm.reset();

        clearError(nameInput);
        clearError(emailInput);
        clearError(messageInput);
    });

});
