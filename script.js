"use strict";

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("#primary-menu");
const form = document.querySelector("#property-form");
const formMessage = document.querySelector("#form-message");
const yearElement = document.querySelector("#current-year");

if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}

if (menuToggle && navMenu) {
  const closeMenu = () => {
    navMenu.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuToggle.innerHTML = '<i class="ph ph-list" aria-hidden="true"></i>';
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
      return;
    }

    navMenu.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");
    menuToggle.innerHTML = '<i class="ph ph-x" aria-hidden="true"></i>';
  });

  navMenu.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuToggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 821px)").matches) {
      closeMenu();
    }
  });
}

if (form instanceof HTMLFormElement && formMessage) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    formMessage.hidden = true;

    if (!form.reportValidity()) {
      return;
    }

    // TODO: Connect a secure form endpoint, Formspree/Netlify form, or CRM integration here.
    // Do not put API keys or private credentials in this static frontend.
    formMessage.textContent = "Thanks. Your details passed this demo form's validation, but nothing has been sent or stored. Connect a form service or CRM to receive submissions.";
    formMessage.hidden = false;
    formMessage.focus();
  });

  form.addEventListener("input", () => {
    if (!formMessage.hidden) {
      formMessage.hidden = true;
    }
  });
}

const revealElements = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => revealObserver.observe(element));
}
