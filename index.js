document.addEventListener("DOMContentLoaded", function () {
  // === Theme toggle ===
  const themeBtn = document.getElementById("toggle-theme");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      document.body.classList.toggle("dark");
    });
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  document.querySelectorAll(".feature-card").forEach(card => {
    observer.observe(card);
  });
  // === Reveal on scroll ===
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  // === Accordion toggle for education section ===
  document.querySelectorAll(".accordion-toggle").forEach((button) => {
    button.addEventListener("click", function () {
      const content = this.nextElementSibling;
      const isActive = this.classList.contains("active");

      document.querySelectorAll(".accordion-toggle").forEach((btn) => {
        btn.classList.remove("active");
        btn.setAttribute("aria-expanded", false);
        btn.nextElementSibling.style.maxHeight = null;
      });

      if (!isActive) {
        this.classList.add("active");
        this.setAttribute("aria-expanded", true);
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });

  // === Hero text swap ===
  let current = 0;
  const swapElements = document.querySelectorAll('.hero-swap');
  setInterval(() => {
    swapElements.forEach((el) => el.classList.remove('active'));
    current = (current + 1) % swapElements.length;
    swapElements[current].classList.add('active');
  }, 8000);

  // === Smooth scroll to section ===
  document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const id = this.getAttribute('href');
      const section = document.querySelector(id);
      if (section) {
        window.scrollTo({
          top: section.offsetTop - 60,
          behavior: 'smooth'
        });
      }
    });
  });

  const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".scroll-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 80;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});
document.querySelectorAll('.feature-card').forEach(card => {
  revealObserver.observe(card);
});
});
