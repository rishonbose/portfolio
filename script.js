const body = document.body;
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const themeToggle = document.querySelector(".theme-toggle");
const backToTop = document.querySelector(".back-to-top");
const revealElements = document.querySelectorAll(".reveal");

/* Mobile menu */
if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

/* Theme toggle with local storage */
if (themeToggle) {
  const savedTheme = localStorage.getItem("portfolio-theme");

  if (savedTheme === "light") {
    body.classList.add("light-theme");
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("light-theme");
    const currentTheme = body.classList.contains("light-theme") ? "light" : "dark";
    localStorage.setItem("portfolio-theme", currentTheme);
  });
}

/* Reveal on scroll */
function revealOnScroll() {
  revealElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      element.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* Back to top button */
if (backToTop) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/* Project filters */
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

if (filterButtons.length && projectCards.length) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.filter;

      projectCards.forEach((card) => {
        const category = card.dataset.category;

        if (filter === "all" || category.includes(filter)) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/* Project modal */
const modal = document.getElementById("project-modal");
const modalOpenButtons = document.querySelectorAll(".modal-open");
const closeModalButtons = document.querySelectorAll("[data-close-modal]");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalTech = document.getElementById("modal-tech");

if (modal && modalOpenButtons.length) {
  modalOpenButtons.forEach((button) => {
    button.addEventListener("click", () => {
      modal.classList.add("show");
      modal.setAttribute("aria-hidden", "false");

      if (modalTitle) modalTitle.textContent = button.dataset.title;
      if (modalDescription) modalDescription.textContent = button.dataset.description;
      if (modalTech) modalTech.textContent = button.dataset.tech;
    });
  });

  closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      modal.classList.remove("show");
      modal.setAttribute("aria-hidden", "true");
    });
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      modal.classList.remove("show");
      modal.setAttribute("aria-hidden", "true");
    }
  });
}

/* FAQ accordion */
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  if (question) {
    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      faqItems.forEach((faq) => {
        faq.classList.remove("open");
        const btn = faq.querySelector(".faq-question");
        if (btn) btn.setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("open");
        question.setAttribute("aria-expanded", "true");
      }
    });
  }
});

/* Contact form validation */
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");
    const successMessage = document.getElementById("form-success");

    let isValid = true;
    const fields = [name, email, subject, message];

    fields.forEach((field) => {
      const error = field.parentElement.querySelector(".error-message");
      error.textContent = "";
      field.style.borderColor = "";
    });

    if (!name.value.trim()) {
      const error = name.parentElement.querySelector(".error-message");
      error.textContent = "Please enter your name.";
      name.style.borderColor = "#f87171";
      isValid = false;
    }

    if (!email.value.trim()) {
      const error = email.parentElement.querySelector(".error-message");
      error.textContent = "Please enter your email address.";
      email.style.borderColor = "#f87171";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) {
      const error = email.parentElement.querySelector(".error-message");
      error.textContent = "Please enter a valid email address.";
      email.style.borderColor = "#f87171";
      isValid = false;
    }

    if (!subject.value.trim()) {
      const error = subject.parentElement.querySelector(".error-message");
      error.textContent = "Please enter a subject.";
      subject.style.borderColor = "#f87171";
      isValid = false;
    }

    if (!message.value.trim()) {
      const error = message.parentElement.querySelector(".error-message");
      error.textContent = "Please enter your message.";
      message.style.borderColor = "#f87171";
      isValid = false;
    }

    if (isValid) {
      successMessage.textContent = "Your message has been validated successfully.";
      contactForm.reset();
    } else {
      successMessage.textContent = "";
    }
  });
}