/* ==========================================
   INCREDIBLE INDIA - MAIN JS MODULE
   Global Navigation, Theme Toggle, Scroll Progress, & Micro-Interactions
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initThemeToggle();
  initScrollProgress();
  initScrollReveal();
  initButtonRipples();
  initBackToTop();
  setActiveNavLink();
});

/* --- 1. NAVBAR & MOBILE DRAWER LOGIC --- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileBtn = document.querySelector('.mobile-toggle-btn');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.mobile-drawer-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  // Sticky Navbar Blur Shift
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // Toggle Mobile Menu Drawer
  function toggleMobileMenu() {
    mobileBtn?.classList.toggle('open');
    drawer?.classList.toggle('open');
    overlay?.classList.toggle('open');
    document.body.style.overflow = drawer?.classList.contains('open') ? 'hidden' : '';
  }

  mobileBtn?.addEventListener('click', toggleMobileMenu);
  overlay?.addEventListener('click', toggleMobileMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (drawer?.classList.contains('open')) {
        toggleMobileMenu();
      }
    });
  });
}

/* --- 2. ACTIVE NAVIGATION INDICATOR --- */
function setActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* --- 3. DARK / LIGHT THEME TOGGLE --- */
function initThemeToggle() {
  const toggleBtn = document.querySelector('.theme-toggle-btn');
  const savedTheme = localStorage.getItem('india-theme') || 'dark';

  // Apply saved theme
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  toggleBtn?.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('india-theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const toggleBtn = document.querySelector('.theme-toggle-btn');
  if (!toggleBtn) return;
  
  if (theme === 'light') {
    toggleBtn.innerHTML = '🌙'; // Moon icon for switching to dark
    toggleBtn.setAttribute('title', 'Switch to Dark Mode');
  } else {
    toggleBtn.innerHTML = '☀️'; // Sun icon for switching to light
    toggleBtn.setAttribute('title', 'Switch to Light Mode');
  }
}

/* --- 4. SCROLL PROGRESS BAR --- */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

/* --- 5. INTERSECTION OBSERVER SCROLL REVEAL --- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('active'));
    return;
  }

  const observerOptions = {
    root: null,
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  reveals.forEach(el => revealObserver.observe(el));
}

/* --- 6. BUTTON RIPPLE MICRO-INTERACTION --- */
function initButtonRipples() {
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach(button => {
    button.addEventListener('click', function (e) {
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;

      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

/* --- 7. BACK TO TOP BUTTON --- */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');

  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
