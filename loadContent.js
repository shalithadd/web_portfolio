document.addEventListener("DOMContentLoaded", function () {
  // =========================================
  // 1. Footer Content Injection
  // =========================================
  fetch("footer.html")
    .then((response) => response.text())
    .then((data) => {
      const footerElement = document.getElementById("my-footer");
      if (footerElement) {
        footerElement.innerHTML = data;
      }
    })
    .catch((err) => console.error("Error loading footer:", err));

  // =========================================
  // 2. Navigation Bar Loading & Logic
  // =========================================
  fetch("nav.html")
    .then((response) => response.text())
    .then((data) => {
      const navContainer = document.getElementById("nav-container");
      if (navContainer) {
        navContainer.innerHTML = data;

        // A. Highlight current page
        const currentPath = window.location.pathname.split("/").pop();
        const navLinks = navContainer.querySelectorAll("a");
        navLinks.forEach((link) => {
          const linkPath = link.getAttribute("href");
          if (linkPath === currentPath) {
            link.classList.add("active");
          }
        });

        // B. Sticky Navigation + Name Fade-In
        const navbar = navContainer.querySelector(".navbar");
        const header = document.querySelector("header");
        const triggerHeight = header ? header.offsetHeight : 150;

        // We combine the scroll logic here with the Back to Top logic later if we wanted,
        // but keeping them separate is cleaner for maintenance.
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

  // =========================================
  // 3. Contact Form Logic (Only runs if form exists)
  // =========================================
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // 1. Define the recipient email
      const recipient = "shalitha.dehigaspitiyage@gmail.com";

      // 2. Get values from the HTML
      const subject = document.getElementById("email-subject").value;
      const bodyText = document.getElementById("email-body").value;

      // 3. Construct the mailto link
      window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(bodyText)}`;
    });
  }

  // =========================================
  // 4. Back to Top Button Logic
  // =========================================

  // Create the button element using JS
  const backToTopBtn = document.createElement("button");
  backToTopBtn.id = "back-to-top";
  backToTopBtn.innerHTML = "&#8679;"; // HTML Code for an Up Arrow
  backToTopBtn.title = "Go to top";
  document.body.appendChild(backToTopBtn); // Add it to the page

  // Show/Hide button on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      // Show after scrolling down 300px
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  // Scroll to top when clicked
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // This gives the nice gliding effect
    });
  });
});
