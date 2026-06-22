document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navbar = document.querySelector('.navbar');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navbar.classList.toggle('navbar-mobile-open');
    });
  }

  // Set Active Nav Link
  const currentLocation = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentLocation) {
      link.classList.add('active');
    }
  });

  // Dark Mode Toggle
  const themeToggles = document.querySelectorAll('.theme-toggle, #theme-toggle');
  if (themeToggles.length > 0) {
    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
    }

    themeToggles.forEach(btn => {
      btn.addEventListener('click', () => {
        if (document.body.getAttribute('data-theme') === 'dark') {
          document.body.removeAttribute('data-theme');
          localStorage.setItem('theme', 'light');
        } else {
          document.body.setAttribute('data-theme', 'dark');
          localStorage.setItem('theme', 'dark');
        }
      });
    });
  }

  // RTL Toggle
  const rtlToggles = document.querySelectorAll('.rtl-toggle, #rtl-toggle');
  if (rtlToggles.length > 0) {
    const savedDir = localStorage.getItem('dir');
    if (savedDir === 'rtl') {
      document.documentElement.setAttribute('dir', 'rtl');
    }

    rtlToggles.forEach(btn => {
      btn.addEventListener('click', () => {
        if (document.documentElement.getAttribute('dir') === 'rtl') {
          document.documentElement.setAttribute('dir', 'ltr');
          localStorage.setItem('dir', 'ltr');
        } else {
          document.documentElement.setAttribute('dir', 'rtl');
          localStorage.setItem('dir', 'rtl');
        }
      });
    });
  }

  // Animation Observers (Structural scan effects & Blueprint reveals)
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-blueprint');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  animatedElements.forEach(el => observer.observe(el));

  // Back to Top Button
  const backToTopBtn = document.createElement('button');
  backToTopBtn.innerHTML = '↑';
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.title = 'Back to top';
  document.body.appendChild(backToTopBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});
