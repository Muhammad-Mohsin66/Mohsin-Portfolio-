document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const allBtns = document.querySelectorAll('.btn, .social-icon-btn');
  allBtns.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const circle = document.createElement('span');
      circle.classList.add('ripple');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      circle.style.width = circle.style.height = `${size}px`;
      circle.style.left = `${e.clientX - rect.left - size / 2}px`;
      circle.style.top = `${e.clientY - rect.top - size / 2}px`;
      this.appendChild(circle);
      setTimeout(() => circle.remove(), 650);
    });
  });

  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (navbar) {
      navbar.classList.toggle('scrolled', scrollY > 40);
    }

    if (backToTopBtn) {
      backToTopBtn.classList.toggle('visible', scrollY > 350);
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  const hamburger = document.getElementById('hamburger');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileBackdrop = document.getElementById('mobileBackdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-actions a');

  function openMobileMenu() {
    hamburger?.classList.add('open');
    mobileDrawer?.classList.add('open');
    mobileBackdrop?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    hamburger?.classList.remove('open');
    mobileDrawer?.classList.remove('open');
    mobileBackdrop?.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileDrawer?.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeMobileMenu);
  }

  mobileLinks.forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (currentId && link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

  const roles = [
    'Computer Science Student @ COMSATS',
    'Python & FastAPI Backend Developer',
    'Frontend Developer (HTML, CSS, JS, Bootstrap)',
    'PostgreSQL & API Integrator',
    'C++ & Java Programmer'
  ];

  const typedEl = document.getElementById('typed-text');
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function typeRoleEffect() {
    if (!typedEl) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedEl.textContent = currentRole.substring(0, charIndex--);
      typingSpeed = 40;
    } else {
      typedEl.textContent = currentRole.substring(0, charIndex++);
      typingSpeed = 85;
    }

    if (!isDeleting && charIndex === currentRole.length + 1) {
      typingSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(typeRoleEffect, typingSpeed);
  }

  typeRoleEffect();

  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedFilter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const cardCat = card.getAttribute('data-category');
        if (selectedFilter === 'all' || cardCat === selectedFilter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  const counterElements = document.querySelectorAll('.counter');
  let countersAnimated = false;

  function runCounters() {
    counterElements.forEach((counter) => {
      const target = +counter.getAttribute('data-target');
      let current = 0;
      const increment = Math.ceil(target / 40);
      const stepTime = 30;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = current;
        }
      }, stepTime);
    });
  }

  const revealElements = document.querySelectorAll('.reveal-init');
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');

        if (!countersAnimated && entry.target.closest('.hero')) {
          runCounters();
          countersAnimated = true;
        }

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => revealObserver.observe(el));

  setTimeout(() => {
    if (!countersAnimated) {
      runCounters();
      countersAnimated = true;
    }
  }, 400);

  const contactForm = document.getElementById('contactForm');
  const formToast = document.getElementById('formToast');

  if (contactForm && formToast) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('formName')?.value.trim();
      const email = document.getElementById('formEmail')?.value.trim();
      const subject = document.getElementById('formSubject')?.value.trim() || 'Portfolio Inquiry';
      const message = document.getElementById('formMessage')?.value.trim();

      if (!name || !email || !message) {
        showFormFeedback(false, 'Please fill in all required fields.');
        return;
      }

      showFormFeedback(
        true,
        `Thank you, ${name}! Your message has been prepared. Opening your direct mail client...`
      );

      const mailtoUrl = `mailto:contact@muhammadmohsin.dev?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(`Hi Muhammad Mohsin,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

      setTimeout(() => {
        window.location.href = mailtoUrl;
        contactForm.reset();
      }, 1400);
    });
  }

  function showFormFeedback(isSuccess, messageText) {
    if (!formToast) return;
    formToast.className = `form-toast ${isSuccess ? 'success' : 'error'}`;
    formToast.innerHTML = `
      <i class="fas ${isSuccess ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i>
      <span>${messageText}</span>
    `;
    formToast.style.display = 'flex';

    setTimeout(() => {
      formToast.style.display = 'none';
    }, 6000);
  }
});
