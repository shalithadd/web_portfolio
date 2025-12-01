document.addEventListener("DOMContentLoaded", function () {
  // ---- Footer Content Injection ----
  fetch("footer.html")
    .then((response) => response.text())
    .then((data) => {
      const footerElement = document.getElementById("my-footer");
      if (footerElement) {
        footerElement.innerHTML = data;
      }
    })
    .catch((err) => console.error("Error loading footer:", err));

  // ---- Navigation Bar Loading and Highlighting ----
  fetch("nav.html")
    .then((response) => response.text())
    .then((data) => {
      const navContainer = document.getElementById("nav-container");
      if (navContainer) {
        navContainer.innerHTML = data;

        // ---- Highlight current page ----
        const currentPath = window.location.pathname.split("/").pop();
        const navLinks = navContainer.querySelectorAll("a");
        navLinks.forEach((link) => {
          const linkPath = link.getAttribute("href");
          if (linkPath === currentPath) {
            link.classList.add("active");
          }
        });

        // ---- Sticky Navigation + Name Fade-In ----
        const navbar = navContainer.querySelector(".navbar");
        const header = document.querySelector("header");
        const triggerHeight = header ? header.offsetHeight : 150;

        window.addEventListener("scroll", () => {
          if (window.scrollY > triggerHeight) {
            navbar.classList.add("sticky");
          } else {
            navbar.classList.remove("sticky");
          }
        });
      }
    })
    .catch((err) => console.error("Error loading navigation:", err));

  // ---- Contact Form Logic ----
  const contactForm = document.getElementById('contact-form');

  // This 'if' check ensures the code only runs on contact.html
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Stop the form from reloading the page

      const to = document.getElementById('email-to').value;
      const subject = document.getElementById('email-subject').value;
      const fromEmail = document.getElementById('email-from').value;
      const bodyText = document.getElementById('email-body').value;

      // Construct the mailto link
      const body = `From: ${fromEmail}\n\n${bodyText}`;
      const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      // Open the user's email client
      window.location.href = mailtoLink;
    });
  }
});