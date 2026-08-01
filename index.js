// === Theme toggle function ===
function toggleTheme() {
  const body = document.body;
  const themeBtn = document.getElementById("toggle-theme");
  const icon = themeBtn.querySelector("i");
  const text = themeBtn.querySelector("span");

  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    icon.className = "fas fa-sun";
    text.textContent = "Light";
    localStorage.setItem("theme", "dark");
  } else {
    icon.className = "fas fa-moon";
    text.textContent = "Dark";
    localStorage.setItem("theme", "light");
  }
}

// === Coming Soon alert ===
function showComingSoon(event) {
  event.preventDefault();
  alert("COMING SOON");
}

document.addEventListener("DOMContentLoaded", function () {
  // === Load saved theme ===
  const savedTheme = localStorage.getItem("theme");
  const themeBtn = document.getElementById("toggle-theme");
  const icon = themeBtn.querySelector("i");
  const text = themeBtn.querySelector("span");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    icon.className = "fas fa-sun";
    text.textContent = "Light";
  }

  // === Split background text into words for proper distribution ===
  const backgroundText = document.querySelector('.background-text');
  if (backgroundText) {
    const textContent = backgroundText.textContent;
    const words = textContent.split(' ');
    backgroundText.innerHTML = words.map(word => `<span>${word}</span>`).join(' ');
  }

  const backgroundTextBottom = document.querySelector('.background-text-bottom');
  if (backgroundTextBottom) {
    const textContent = backgroundTextBottom.textContent;
    const words = textContent.split(' ');
    backgroundTextBottom.innerHTML = words.map(word => `<span>${word}</span>`).join(' ');
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
  if (swapElements.length > 1) {
    setInterval(() => {
      swapElements.forEach((el) => el.classList.remove('active'));
      current = (current + 1) % swapElements.length;
      swapElements[current].classList.add('active');
    }, 8000);
  }

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
  const backToTopBtn = document.getElementById('back-to-top');
  const contactForm = document.querySelector('.contact-form');

  let scrollTicking = false;

  // Optimized scroll handler with requestAnimationFrame
  function handleScroll() {
    const scrollPos = window.pageYOffset;

    // Update back to top button
    if (backToTopBtn) {
      if (scrollPos > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }

    // Update active navigation link
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 80;
      if (scrollPos >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href === `#${current}`) {
        if (!link.classList.contains("active")) {
          link.classList.add("active");
        }
      } else {
        link.classList.remove("active");
      }
    });

    scrollTicking = false;
  }

  window.addEventListener("scroll", () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(handleScroll);
      scrollTicking = true;
    }
  }, { passive: true });

  handleScroll();

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      alert('This feature is not available yet. Please contact me directly by email.');
    });
  }

// === Back to Top Button Click Handler ===
if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// === Tab Switching ===
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetTab = button.getAttribute('data-tab');

    // Remove active class from all buttons and contents
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    // Add active class to clicked button
    button.classList.add('active');

    // Show corresponding tab content
    const targetContent = document.getElementById(`${targetTab}-tab`);
    if (targetContent) {
      targetContent.classList.add('active');
    }
  });
});
});
