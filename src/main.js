import './styles/index.css';
import { initShader } from './shader.js';

/* ===== DOM Ready ===== */
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initCursorGlow();
  initGridParallax();
  initMobileNav();
  initSmoothScroll();
  initHeaderScroll();
  initContactForm();

  // Initialize WebGL shader
  const shaderCanvas = document.getElementById('shader-canvas');
  if (shaderCanvas) {
    initShader(shaderCanvas);
  }
});

/* ===== Scroll Reveal (IntersectionObserver) ===== */
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
}

/* ===== Cursor Glow ===== */
function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;

  // Only show on desktop (no touch)
  if (window.matchMedia('(hover: none)').matches) {
    glow.style.display = 'none';
    return;
  }

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

/* ===== Grid Background Parallax ===== */
function initGridParallax() {
  const grid = document.querySelector('.grid-bg');
  if (!grid) return;

  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 20;
    const y = (e.clientY / window.innerHeight) * 20;
    grid.style.transform = `translate(${x}px, ${y}px)`;
  });
}

/* ===== Mobile Navigation ===== */
function initMobileNav() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const closeBtn = document.getElementById('mobile-nav-close');

  if (!menuBtn || !mobileNav) return;

  menuBtn.addEventListener('click', () => {
    mobileNav.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  function closeMenu() {
    mobileNav.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  // Close on nav link click
  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

/* ===== Smooth Scroll for Anchor Links ===== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ===== Header Scroll Effect ===== */
function initHeaderScroll() {
  const header = document.getElementById('main-header');
  if (!header) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 100) {
      header.classList.add('border-b', 'border-outline-variant');
    } else {
      header.classList.remove('border-b', 'border-outline-variant');
    }

    lastScroll = currentScroll;
  });
}

/* ===== Contact Form ===== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Visual feedback — swap button text
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'MESSAGE_SENT ✓';
    btn.classList.add('bg-primary-container');
    setTimeout(() => {
      btn.textContent = originalText;
      btn.classList.remove('bg-primary-container');
      form.reset();
    }, 2500);
  });
}
