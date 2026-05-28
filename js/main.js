// ============================================================
// main.js – Gedeelde JavaScript voor het portfolio
// ============================================================

// ── Feather Icons initialiseren ──
document.addEventListener('DOMContentLoaded', function () {
  if (typeof feather !== 'undefined') {
    feather.replace();
  }

  initNavbar();
  initProjectFilters();
  initContactForm();
  initCustomCursor();
  initParticleCanvas();
});

// ── Navigatie: hamburger menu ──
function initNavbar() {
  var hamburger = document.querySelector('.hamburger');
  var navLinks = document.querySelector('.nav-links');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });

  // Sluit menu bij klikken op link
  navLinks.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
    });
  });
}

// ── Project filters (work.html) ──
function initProjectFilters() {
  var filterBtns = document.querySelectorAll('.filter-btn');
  var projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.getAttribute('data-filter');

      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      projectCards.forEach(function (card) {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// ── Contactformulier ──
function initContactForm() {
  var form = document.getElementById('contact-form');
  var feedback = document.getElementById('form-feedback');

  if (!form || !feedback) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    feedback.classList.remove('hidden', 'success', 'error');
    feedback.classList.add('success');
    feedback.textContent = 'Bedankt voor je bericht! Ik neem zo snel mogelijk contact met je op.';

    form.reset();
  });
}

// ── Aangepaste cursor ──
function initCustomCursor() {
  var cursor = document.querySelector('.custom-cursor');
  var dot = document.querySelector('.custom-cursor-dot');

  if (!cursor || !dot) return;

  document.addEventListener('mousemove', function (e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
  });
}

// ── Particle canvas achtergrond ──
function initParticleCanvas() {
  var canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var particles = [];
  var particleCount = 60;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.4 + 0.1
    };
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(function (p) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(124, 106, 255, ' + p.opacity + ')';
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  resize();
  window.addEventListener('resize', resize);

  for (var i = 0; i < particleCount; i++) {
    particles.push(createParticle());
  }

  animate();
}
