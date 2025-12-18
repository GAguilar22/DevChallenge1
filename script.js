/* 
   CARRUSEL DEL PORTFOLI - NAVEGACIÓ AMB TECLAT I FILTRATGE
 */

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let isAnimating = false;

/* 
   NAVEGACIÓ AMB TECLAT
 */
document.addEventListener('keydown', (e) => {
  if (isAnimating) return;

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    navigateToSlide(currentSlide + 1);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    navigateToSlide(currentSlide - 1);
  }
});

function navigateToSlide(index) {
  if (index < 0 || index >= totalSlides || isAnimating) return;

  isAnimating = true;
  currentSlide = index;

  // Scroll entre slides
  slides[currentSlide].scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });

  // Actualitza punts de navegació
  updateNavigationDots();

  // Reset animatio
  setTimeout(() => {
    isAnimating = false;
  }, 800);
}

/* 
   SINCRONITZACIÓ DE L'SCROLL
 */
const carousel = document.querySelector('.carousel');

if (carousel) {
  carousel.addEventListener('scroll', () => {
    if (isAnimating) return;

    const scrollPosition = carousel.scrollTop;
    const windowHeight = window.innerHeight;

    const newIndex = Math.round(scrollPosition / windowHeight);

    if (newIndex !== currentSlide && newIndex >= 0 && newIndex < totalSlides) {
      currentSlide = newIndex;
      updateNavigationDots();
    }
  });
}

/* 
   PUNTS DE NAVEGACIÓ
 */
function createNavigationDots() {
  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'nav-dots';

  slides.forEach((slide, index) => {
    const dot = document.createElement('div');
    dot.className = 'nav-dot';
    if (index === 0) dot.classList.add('active');

    dot.addEventListener('click', () => navigateToSlide(index));
    dotsContainer.appendChild(dot);
  });

  document.body.appendChild(dotsContainer);
}

function updateNavigationDots() {
  const dots = document.querySelectorAll('.nav-dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

/* 
   FILTRATGE DE PROJECTES
 */
let currentFilter = 'all';

function initializeFilters() {
  const filterButtons = document.querySelectorAll('.filter-icon');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      // Update active state
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Filter projects
      filterProjects(filter);
      currentFilter = filter;
    });
  });
}

function filterProjects(filter) {
  const projects = document.querySelectorAll('.project-card');

  projects.forEach(project => {
    const projectTags = project.dataset.tags.split(',');

    if (filter === 'all' || projectTags.includes(filter)) {
      project.style.display = 'block';
      project.classList.add('fade-in');
      setTimeout(() => project.classList.remove('fade-in'), 500);
    } else {
      project.classList.add('fade-out');
      setTimeout(() => {
        project.style.display = 'none';
        project.classList.remove('fade-out');
      }, 300);
    }
  });
}

/* 
   FORMULARI DE CONTACTE
 */
function initializeContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const messageDiv = document.getElementById('form-message');
    messageDiv.textContent = 'Missatge enviat correctament! (simulació)';
    messageDiv.className = 'form-message success';
    messageDiv.style.display = 'block';

    setTimeout(() => {
      contactForm.reset();
      messageDiv.style.display = 'none';
    }, 3000);
  });


  const inputs = document.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('focus', function () {
      this.parentElement.classList.add('input-focused');
    });

    input.addEventListener('blur', function () {
      this.parentElement.classList.remove('input-focused');
    });
  });
}

/* 
   HAMBURGER MENU
 */
function initializeHamburger() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-links li a');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  // Tancar menú al fer click (per a mobils)
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (hamburger && navLinks) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  });
}

/* 
   INICIALITZACIÓ
 */
document.addEventListener('DOMContentLoaded', () => {
  createNavigationDots();
  initializeFilters();
  initializeContactForm();
  initializeHamburger();
});
