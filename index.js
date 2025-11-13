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
  const backToTopBtn = document.getElementById('back-to-top');

  let scrollTicking = false;

  // Optimized scroll handler with requestAnimationFrame
  function handleScroll() {
    const scrollPos = window.pageYOffset;

    // Update back to top button
    if (scrollPos > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
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

  document.querySelectorAll('.feature-card').forEach(card => {
    revealObserver.observe(card);
  });

// === Back to Top Button Click Handler ===
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// === Service Modal ===
const modal = document.getElementById('service-modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalClose = document.querySelector('.modal-close');

const serviceDetails = {
  fullstack: {
    title: 'Full-Stack Development: From Concept to Deployment',
    content: `
      <p>I offer end-to-end development of modern web applications, ensuring a seamless user experience (UX) and robust server-side architecture. Utilizing JavaScript/TypeScript, React, and Node.js, I handle the entire lifecycle, from database design to frontend implementation.</p>
      <h4>What I Offer:</h4>
      <ul>
        <li>Complete application architecture design</li>
        <li>Frontend development with React and modern frameworks</li>
        <li>Backend API development with Node.js and Express</li>
        <li>Database design and integration (SQL/NoSQL)</li>
        <li>Deployment and DevOps setup</li>
        <li>Testing and quality assurance</li>
      </ul>
    `
  },
  uiux: {
    title: 'Accessible & User-Friendly UI/UX Implementation',
    content: `
      <p>Specializing in creating highly interactive and responsive user interfaces with React. My focus is on accessibility (A11y), performance optimization, and implementing designs that prioritize the user experience.</p>
      <h4>What I Offer:</h4>
      <ul>
        <li>Responsive and mobile-first design implementation</li>
        <li>Accessibility (WCAG) compliant interfaces</li>
        <li>Performance optimization for fast load times</li>
        <li>Component-based architecture with React</li>
        <li>Interactive animations and smooth transitions</li>
        <li>Cross-browser compatibility testing</li>
      </ul>
    `
  },
  backend: {
    title: 'Robust Backend and Scalable API Design',
    content: `
      <p>Designing and developing reliable, high-performance backends using Node.js and TypeScript. Services include RESTful/GraphQL API development, secure data handling, and integrating with SQL/NoSQL databases to support scalability.</p>
      <h4>What I Offer:</h4>
      <ul>
        <li>RESTful and GraphQL API development</li>
        <li>Database architecture and optimization</li>
        <li>Authentication and authorization systems</li>
        <li>Microservices architecture</li>
        <li>API documentation and versioning</li>
        <li>Performance monitoring and scaling strategies</li>
      </ul>
    `
  },
  consultant: {
    title: 'Front-End Consultant',
    content: `
      <h4>I need help with my existing project</h4>
      <ul>
        <li>Does it take a long time to implement new features?</li>
        <li>Do front-end developers produce a lot of bugs?</li>
        <li>Are user interactions too slow and not user friendly?</li>
        <li>The user interface doesn't match designs and design system?</li>
      </ul>

      <h4>I am building a new project</h4>
      <ul>
        <li>How to deal with dependencies across multiple front-end projects?</li>
        <li>Don't want to waste time with reinventing the wheel and leverage existing libraries to speed up the development process?</li>
        <li>Want to be sure that the code base is well structured from the beginning?</li>
        <li>Want to be sure that the user interface is seamless without bugs?</li>
      </ul>
    `
  }
};

// Open modal when service card is clicked
document.querySelectorAll('.service-card-clickable').forEach(card => {
  card.addEventListener('click', () => {
    const serviceType = card.getAttribute('data-service');
    const service = serviceDetails[serviceType];

    modalTitle.textContent = service.title;
    modalBody.innerHTML = service.content;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  });
});

// Close modal when X is clicked
modalClose.addEventListener('click', () => {
  modal.classList.remove('show');
  document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('show')) {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
  }
});
});
