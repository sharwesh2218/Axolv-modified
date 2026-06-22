/**
 * ═══════════════════════════════════════════════════════════════
 *  Axolv — Premium AI Automation Agency
 *  Main Application Controller
 *
 *  Handles preloader, interactive 3D parallax, magnetic hover,
 *  scroll-driven animations, stats counters, form flows,
 *  smooth navigation, and all micro-interactions.
 * ═══════════════════════════════════════════════════════════════
 */

/* ---------- Inline Spinner Keyframe (injected immediately) ---------- */
(() => {
  const sheet = document.createElement('style');
  sheet.textContent = `@keyframes spin{to{transform:rotate(360deg)}}`;
  document.head.appendChild(sheet);
})();

/* ---------- Config Parameters ---------- */
// Google Sheet Integration: Paste your deployed Google Apps Script Web App URL here:
const CONFIG_GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbwN0cpduufQ-F86G4XKuiUCXCcGxDaoPJAssKaydMuyMLSpTJr2jBFAGSNKwYv9XX0FUg/exec";

/* ---------- Boot ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initScrollProgress();
  initNavbarScroll();
  initMobileNav();
  initCursorGlow();
  initScrollAnimations();
  initApproachAnimation();
  initStatsCounter();
  initContactForm();
  initSmoothScroll();
  initActiveNavHighlight();
  initParallaxScroll();
  initFaqAccordion();
  initCaseStudyDrawer();
  initLogoCanvasKeyer();
  initTypewriter();
  // initServicesCarousel(); // Disabled: marquee is now CSS-animation driven

  // Desktop-only premium micro-interactions
  if (window.matchMedia('(hover: hover)').matches) {
    initMagneticElements();
    initCard3DTilt();
    initLogo3DCenterpiece();
    initSpotlightCards();
  }
});

  // Premium Animation Observers for Approach and About
  const premiumObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.15 });
  
  document.querySelectorAll('.approach-section, .about-section-new, .approach-card, .team-grid-container').forEach(el => {
    premiumObserver.observe(el);
  });



/* ============================================================
   1. Preloader
   ============================================================ */
function initPreloader() {
  const preloader = document.querySelector('.preloader');
  if (!preloader) return;

  // Lock scroll while loading
  document.body.style.overflow = 'hidden';

  const dismiss = () => {
    preloader.style.transition = 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    preloader.style.opacity = '0';
    preloader.addEventListener('transitionend', () => {
      preloader.remove();
      document.body.style.overflow = '';
    }, { once: true });
  };

  // If the page has already loaded (cached), dismiss immediately
  if (document.readyState === 'complete') {
    setTimeout(dismiss, 800);
  } else {
    window.addEventListener('load', () => setTimeout(dismiss, 800));
  }
}


/* ============================================================
   2. Navbar Scroll State (glassmorphism + shadow elevation)
   ============================================================ */
function initNavbarScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // set initial state
}


/* ============================================================
   3. Mobile Navigation Toggle
   ============================================================ */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navLinks  = document.querySelector('.nav-links');
  if (!toggleBtn || !navLinks) return;

  const anchors = navLinks.querySelectorAll('a');

  const toggleMenu = () => {
    const willOpen = !navLinks.classList.contains('open');
    toggleBtn.classList.toggle('open', willOpen);
    navLinks.classList.toggle('open', willOpen);
    document.body.style.overflow = willOpen ? 'hidden' : '';
  };

  toggleBtn.addEventListener('click', toggleMenu);

  anchors.forEach(anchor => {
    anchor.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) toggleMenu();
    });
  });
}


/* ============================================================
   4. Ambient Cursor Glow Follower
   ============================================================ */
function initCursorGlow() {
  if (!window.matchMedia('(hover: hover)').matches) return;

  const glow = document.createElement('div');
  glow.className = 'cursor-glow-overlay';
  document.body.appendChild(glow);
  glow.style.display = 'block';

  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;
  const LERP = 0.08;

  document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  }, { passive: true });

  const tick = () => {
    currentX += (targetX - currentX) * LERP;
    currentY += (targetY - currentY) * LERP;
    glow.style.left = `${currentX}px`;
    glow.style.top  = `${currentY}px`;
    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}


/* ============================================================
   5. Scroll-Driven Entrance Animations (IntersectionObserver)
   ============================================================ */
function initScrollAnimations() {
  const els = document.querySelectorAll(
    '.animate-fade-up, .animate-scale-up, .animate-slide-left, .animate-slide-right, .animate-reveal-clip, .animate-blur-in, .animate-heading-reveal, .animate-shutter, .animate-depth-pop'
  );
  if (!els.length) return;

  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  els.forEach(el => observer.observe(el));
}


/* ============================================================
   5b. Approach Step Connector Animation
   ============================================================ */
function initApproachAnimation() {
  const container = document.querySelector('.approach-grid-container');
  if (!container) return;

  if (!('IntersectionObserver' in window)) {
    container.classList.add('active');
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        container.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  observer.observe(container);
}


/* ============================================================
   6. Stats Counter Animation
   ============================================================ */
function initStatsCounter() {
  const counters = document.querySelectorAll('.counter-number');
  if (!counters.length) return;

  // Ease-out expo curve for satisfying deceleration
  const easeOutExpo = (t) => (t === 1) ? 1 : 1 - Math.pow(2, -10 * t);

  const animateCounter = (el) => {
    const raw = (el.dataset.target || el.textContent).trim();

    // Detect special non-numeric formats and leave them as-is
    if (/^\d+\/\d+$/.test(raw) || /^\d+-\d+$/.test(raw)) {
      el.textContent = raw;
      return;
    }

    // Extract leading number and trailing suffix (e.g. '%', '+', 'M', 'K')
    const match = raw.match(/^(\d+(?:\.\d+)?)\s*(.*)$/);
    if (!match) { el.textContent = raw; return; }

    const target   = parseFloat(match[1]);
    const suffix   = match[2] || '';
    const isFloat  = match[1].includes('.');
    const duration = 2000;               // ms
    let   start    = null;

    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const current  = easeOutExpo(progress) * target;

      el.textContent = (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;

      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  if (!('IntersectionObserver' in window)) {
    counters.forEach(animateCounter);
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(el => observer.observe(el));
}


/* ============================================================
   7. Contact Form Handling
   ============================================================ */
function initContactForm() {
  const form     = document.getElementById('axolvContactForm');
  const content  = document.getElementById('formContent');
  const success  = document.getElementById('submitSuccessMsg');
  if (!form || !success) return;

  const showSuccessAnimation = () => {
    if (content) {
      content.style.transition = 'opacity 0.4s ease';
      content.style.opacity = '0';
    }

    setTimeout(() => {
      if (content) content.style.display = 'none';

      success.style.display   = 'block';
      success.style.opacity   = '0';
      success.style.transform = 'translateY(12px)';

      // Trigger reflow then fade in
      requestAnimationFrame(() => {
        success.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        success.style.opacity    = '1';
        success.style.transform  = 'translateY(0)';
      });

      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 400);
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    if (!btn) return;

    btn.disabled = true;
    btn.innerHTML =
      'Sending Request… ' +
      '<span class="spinner" style="display:inline-block;width:12px;height:12px;' +
      'border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;' +
      'animation:spin .6s linear infinite;margin-left:8px;vertical-align:middle"></span>';

    // Retrieve input values safely
    const nameVal    = document.getElementById('frmName') ? document.getElementById('frmName').value.trim() : '';
    const companyVal = document.getElementById('frmCompany') ? document.getElementById('frmCompany').value.trim() : '';
    const emailVal   = document.getElementById('frmEmail') ? document.getElementById('frmEmail').value.trim() : '';
    const phoneVal   = document.getElementById('frmPhone') ? document.getElementById('frmPhone').value.trim() : '';
    const serviceVal = document.getElementById('frmService') ? document.getElementById('frmService').value : '';
    const messageVal = document.getElementById('frmMessage') ? document.getElementById('frmMessage').value.trim() : '';

    // If Google Sheet Script URL is not set, use a simulation fallback
    if (!CONFIG_GOOGLE_SHEETS_URL) {
      console.warn("Google Sheet Script URL is not configured. Simulating transmission...");
      setTimeout(() => {
        showSuccessAnimation();
      }, 1200);
      return;
    }

    // Build the payload
    const payload = {
      name: nameVal,
      company: companyVal,
      email: emailVal,
      phone: phoneVal,
      service: serviceVal,
      message: messageVal
    };

    // Post to Google Sheets Web App (use mode: 'no-cors' to completely prevent CORS problems on public endpoints)
    fetch(CONFIG_GOOGLE_SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: JSON.stringify(payload)
    })
    .then(() => {
      showSuccessAnimation();
    })
    .catch(err => {
      console.error("Google Sheet submission failed:", err);
      // Fail-safe fallback so the user always sees a successful transition even if network blocks it
      showSuccessAnimation();
    });
  });
}


/* ============================================================
   8. Premium Magnetic Hover Attraction (Desktop only)
   ============================================================ */
function initMagneticElements() {
  const selectors = '.btn, .nav-cta-btn, .marquee-badge, .team-card, .social-link';
  const items = document.querySelectorAll(selectors);
  if (!items.length) return;

  items.forEach(item => {
    // Determine pull strength per element type
    let strength = 0.25;
    if (item.classList.contains('marquee-badge') || item.classList.contains('team-card')) {
      strength = 0.15;
    } else if (item.classList.contains('social-link')) {
      strength = 0.35;
    }

    item.addEventListener('mousemove', (e) => {
      const rect   = item.getBoundingClientRect();
      const deltaX = e.clientX - rect.left - rect.width  / 2;
      const deltaY = e.clientY - rect.top  - rect.height / 2;

      // Disable transitions on mousemove for real-time latency-free tracking
      item.style.transition = 'none';
      item.style.transform = `translate3d(${deltaX * strength}px, ${deltaY * strength}px, 0) scale(1.03)`;

      if (item.classList.contains('btn') || item.classList.contains('nav-cta-btn')) {
        item.style.boxShadow = '0 12px 30px rgba(152,254,0,0.15)';
      }
    });

    item.addEventListener('mouseleave', () => {
      // Set spring-back ease transition on leave
      item.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.6s ease';
      item.style.transform  = 'translate3d(0,0,0) scale(1)';
      item.style.boxShadow  = '';
    });
  });
}


/* ============================================================
   9. Card 3D Parallax Tilt (Desktop only)
   ============================================================ */
function initCard3DTilt() {
  const cards = document.querySelectorAll(
    '.contact-form-card, .service-card'
  );
  if (!cards.length) return;

  const MAX_TILT = 5; // Elegant subtle tilt

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const xPct = (e.clientX - rect.left) / rect.width  - 0.5;
      const yPct = (e.clientY - rect.top)  / rect.height - 0.5;

      const tiltX =  (yPct * MAX_TILT).toFixed(2);
      const tiltY = -(xPct * MAX_TILT).toFixed(2);

      const liftY = card.classList.contains('service-card') ? -8 : -4;

      card.style.transition = 'none';
      card.style.transform =
        `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(${liftY}px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.4s ease, box-shadow 0.4s ease, background-color 0.4s ease';
      card.style.transform =
        'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}


/* ============================================================
   10. 3D Centerpiece Logo Parallax (Hero Section)
   ============================================================ */
function initLogo3DCenterpiece() {
  const container = document.getElementById('logoCenterpiece');
  if (!container) return;

  const inner = container.querySelector('.logo-3d-inner');
  const frontPanel = container.querySelector('.panel-front');
  const backPanel = container.querySelector('.panel-back');
  const decorRing = document.querySelector('.hero-visual-decor-ring');
  
  if (!inner) return;

  // Add the interactive class so it smooths cursor transitions
  inner.classList.add('interactive');
  if (frontPanel) frontPanel.classList.add('interactive');
  if (backPanel) backPanel.classList.add('interactive');
  if (decorRing) decorRing.classList.add('interactive');

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  const hero = document.getElementById('hero');
  if (!hero) return;

  // Track mouse coordinates relative to hero center
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    // Normalize coordinates relative to hero center (-1 to 1)
    mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
  }, { passive: true });

  hero.addEventListener('mouseleave', () => {
    mouseX = 0;
    mouseY = 0;
  });

  const tick = () => {
    // Smooth interpolation (lerp)
    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;

    // Centerpiece Rotation
    const rotateX = currentY * -12; // Max 12 degrees
    const rotateY = currentX * 12;

    inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    // Interactive shift for layered panels (opposite translations for deep parallax)
    if (frontPanel) {
      frontPanel.style.transform = `translateZ(60px) translate3d(${currentX * 15}px, ${currentY * 15}px, 0)`;
    }
    if (backPanel) {
      backPanel.style.transform = `translateZ(-20px) translate3d(${currentX * -10}px, ${currentY * -10}px, 0)`;
    }
    if (decorRing) {
      decorRing.style.transform = `rotate(-15deg) translate3d(${currentX * -25}px, ${currentY * -25}px, 0)`;
    }

    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}


/* ============================================================
   11. Smooth Scroll for Anchor Links
   ============================================================ */
function initSmoothScroll() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const id = link.getAttribute('href');
    if (id === '#' || id.length < 2) return;

    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();

    const header       = document.querySelector('.site-header');
    const headerOffset = header ? header.offsetHeight + 16 : 80;
    const top          = target.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({ top, behavior: 'smooth' });
  });
}


/* ============================================================
   12. Active Nav Link Highlighting
   ============================================================ */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${id}`
          );
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -60% 0px',   // fires when section is ~20-40% in view
    threshold: 0
  });

  sections.forEach(sec => observer.observe(sec));
}


/* ============================================================
   13. Parallax Scroll Effect for Background Elements
   ============================================================ */
function initParallaxScroll() {
  const parallaxEls = document.querySelectorAll('.parallax-bg');
  if (!parallaxEls.length) return;

  const FACTOR = 0.3;
  let ticking  = false;

  const update = () => {
    const scrollY = window.scrollY;
    parallaxEls.forEach(el => {
      el.style.transform = `translateY(${scrollY * FACTOR}px)`;
    });
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
}


/* ============================================================
   14. FAQ Auto-Close Accordion (<details> elements)
   ============================================================ */
function initFaqAccordion() {
  const containers = document.querySelectorAll('.faq-list, .faq-container, .faq-section');

  // If no semantic container, treat the whole document
  const targets = containers.length ? containers : [document];

  targets.forEach(container => {
    const detailsEls = container.querySelectorAll('details');
    if (detailsEls.length < 2) return;

    detailsEls.forEach(detail => {
      detail.addEventListener('toggle', () => {
        if (!detail.open) return;
        // Close siblings
        detailsEls.forEach(other => {
          if (other !== detail && other.open) other.open = false;
        });
      });
    });
  });
}


/* ============================================================
   14b. Testimonials / Case Study Right Drawer
   ============================================================ */
function initCaseStudyDrawer() {
  const cards = document.querySelectorAll('.testimonial-grid-card');
  const overlay = document.getElementById('caseDrawerOverlay');
  const drawer = document.getElementById('caseDrawer');
  const closeBtn = document.getElementById('drawerCloseBtn');

  if (!overlay || !drawer) return;

  // Elements inside the drawer to populate
  const drawerTitle = document.getElementById('drawerTitle');
  const drawerTagline = document.getElementById('drawerTagline');
  const drawerRole = document.getElementById('drawerRole');
  const drawerTimeline = document.getElementById('drawerTimeline');
  const drawerClient = document.getElementById('drawerClient');
  const drawerMetaRole = document.getElementById('drawerMetaRole');
  const drawerMetaTimeline = document.getElementById('drawerMetaTimeline');
  const drawerChallenge = document.getElementById('drawerChallenge');
  const drawerSolution = document.getElementById('drawerSolution');
  const drawerQuote = document.getElementById('drawerQuote');
  const drawerVisitLink = document.getElementById('drawerVisitLink');
  const drawerMockupContainer = document.getElementById('drawerMockupContainer');
  const drawerMetricsContainer = document.getElementById('drawerMetricsContainer');
  const drawerTagsContainer = document.getElementById('drawerTagsContainer');

  const openDrawer = (card) => {
    // 1. Read datasets from the card
    const title = card.getAttribute('data-title') || '';
    const tagline = card.getAttribute('data-tagline') || '';
    const url = card.getAttribute('data-url') || '#';
    const timeline = card.getAttribute('data-timeline') || '';
    const role = card.getAttribute('data-role') || '';
    const client = card.getAttribute('data-client') || '';
    const quote = card.getAttribute('data-quote') || '';
    const challenge = card.getAttribute('data-challenge') || '';
    const solution = card.getAttribute('data-solution') || '';
    
    let metrics = [];
    try {
      metrics = JSON.parse(card.getAttribute('data-metrics') || '[]');
    } catch(e) { console.error("Error parsing metrics JSON", e); }

    let tags = [];
    try {
      tags = JSON.parse(card.getAttribute('data-tags') || '[]');
    } catch(e) { console.error("Error parsing tags JSON", e); }

    // 2. Populate text elements
    if (drawerTitle) drawerTitle.textContent = title;
    if (drawerTagline) drawerTagline.textContent = tagline;
    if (drawerRole) drawerRole.textContent = role;
    if (drawerTimeline) drawerTimeline.textContent = timeline;
    if (drawerClient) drawerClient.textContent = client;
    if (drawerMetaRole) drawerMetaRole.textContent = role;
    if (drawerMetaTimeline) drawerMetaTimeline.textContent = timeline;
    if (drawerChallenge) drawerChallenge.textContent = challenge;
    if (drawerSolution) drawerSolution.textContent = solution;
    if (drawerQuote) drawerQuote.innerHTML = quote;
    if (drawerVisitLink) {
      drawerVisitLink.setAttribute('href', url);
    }

    // 3. Inject Iframe in the mockup to prevent background iframe loading when closed
    if (drawerMockupContainer) {
      drawerMockupContainer.innerHTML = `<iframe class="mockup-iframe" src="${url}" style="pointer-events: auto;" scrolling="yes"></iframe>`;
    }

    // 4. Render Metrics
    if (drawerMetricsContainer) {
      drawerMetricsContainer.innerHTML = '';
      metrics.forEach(metric => {
        const chip = document.createElement('div');
        chip.className = 'case-metric-chip';
        chip.innerHTML = `
          <span class="case-metric-val">${metric.value}</span>
          <span class="case-metric-lbl">${metric.label}</span>
        `;
        drawerMetricsContainer.appendChild(chip);
      });
    }

    // 5. Render Tags
    if (drawerTagsContainer) {
      drawerTagsContainer.innerHTML = '';
      tags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'card-tag';
        span.textContent = tag;
        drawerTagsContainer.appendChild(span);
      });
    }

    // 6. Active overlay & classes
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // lock scroll
  };

  const closeDrawer = () => {
    overlay.classList.remove('active');
    document.body.style.overflow = ''; // unlock scroll
    // Clear mockup frame to kill any media, scripts, or loading inside the iframe
    if (drawerMockupContainer) {
      drawerMockupContainer.innerHTML = '';
    }
  };

  // Add click listener to each card
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      // If client clicked direct external link or trigger btn, handle appropriately
      if (e.target.closest('a') && !e.target.closest('.case-study-trigger-btn')) {
        return;
      }
      openDrawer(card);
    });
    
    // Also bind specifically to trigger button for explicit intent
    const triggerBtn = card.querySelector('.case-study-trigger-btn');
    if (triggerBtn) {
      triggerBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent card click double bubble
        openDrawer(card);
      });
    }
  });

  // Close actions
  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeDrawer();
    }
  });

  // ESC key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeDrawer();
    }
  });
}


/* ============================================================
   15. 3D Logo Canvas Chroma Keyer
   ============================================================ */
function initLogoCanvasKeyer() {
  const video = document.getElementById('logoVideo');
  const canvas = document.getElementById('logoCanvas');
  if (!video || !canvas) return;

  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const width = canvas.width;
  const height = canvas.height;

  let isPlaying = false;

  const processFrame = () => {
    if (video.paused || video.ended) {
      requestAnimationFrame(processFrame);
      return;
    }

    // Draw the video frame to our canvas
    ctx.drawImage(video, 0, 0, width, height);

    // Retrieve the frame pixels
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;
    const len = data.length;

    // Remove both black and white backgrounds (defensive programming against browser cache mismatches)
    for (let i = 0; i < len; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      const maxVal = Math.max(r, g, b);
      const minVal = Math.min(r, g, b);

      // 1. Black background keying (for new logo-3d-small.mp4)
      if (maxVal < 50) {
        data[i + 3] = 0; // Make fully transparent to remove background, vignettes, and moving floor shadows completely
      } else if (maxVal < 75) {
        // High-fidelity smooth anti-aliased edge blending for near-blacks
        const alpha = ((maxVal - 50) / 25.0) * 255;
        data[i + 3] = Math.max(0, Math.min(255, alpha));

        // Color boost: Eliminate dark/black halo outlines around logo edges
        // by scaling the BGR color components to match the bright logo body
        const factor = 75 / maxVal;
        data[i] = Math.min(255, r * factor);
        data[i + 1] = Math.min(255, g * factor);
        data[i + 2] = Math.min(255, b * factor);
      }

      // 2. White background keying (fallback in case the browser caches the original white-background video)
      if (minVal > 245) {
        data[i + 3] = 0; // Make fully transparent
      } else if (minVal > 220) {
        // High-fidelity smooth anti-aliased edge blending for near-whites
        const avg = (r + g + b) / 3.0;
        const alpha = ((255 - avg) / 35.0) * 255;
        data[i + 3] = Math.max(0, Math.min(data[i + 3], alpha));
      }
    }

    // Write back the transparent image data
    ctx.putImageData(imgData, 0, 0);

    requestAnimationFrame(processFrame);
  };

  // Explicitly trigger play to bypass any autoplay constraints
  const startPlayback = () => {
    video.play().then(() => {
      if (!isPlaying) {
        isPlaying = true;
        requestAnimationFrame(processFrame);
      }
    }).catch(err => {
      console.warn("Playback failed, retrying on fallback:", err);
    });
  };

  // Listen for video states
  video.addEventListener('play', () => {
    if (!isPlaying) {
      isPlaying = true;
      requestAnimationFrame(processFrame);
    }
  });

  // Fallback triggers
  video.addEventListener('loadeddata', () => {
    startPlayback();
  });

  video.addEventListener('canplay', () => {
    startPlayback();
  });

  // Manual fallback check
  if (!video.paused && !isPlaying) {
    isPlaying = true;
    requestAnimationFrame(processFrame);
  } else {
    // Attempt play immediately in case autoplay is pending
    startPlayback();
  }
}


/* ============================================================
   16. Hero Title Typewriter Sequential Animation
   ============================================================ */
function prepareTypewriter(element) {
  const chars = [];
  
  function traverse(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      
      // Ignore any text node that consists entirely of whitespace (e.g., newlines/indents from formatting)
      if (/^\s+$/.test(text)) {
        return;
      }
      
      const parent = node.parentNode;
      const fragment = document.createDocumentFragment();
      
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const span = document.createElement('span');
        span.className = 'type-char';
        span.style.opacity = '0';
        span.style.transition = 'opacity 0.05s ease';
        span.textContent = char;
        
        // Preserve space layout
        if (char === ' ') {
          span.innerHTML = '&nbsp;';
        }
        
        fragment.appendChild(span);
        chars.push(span);
      }
      
      parent.replaceChild(fragment, node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE') {
        const children = Array.from(node.childNodes);
        children.forEach(traverse);
      }
    }
  }
  
  traverse(element);
  return chars;
}

function initTypewriter() {
  const heading = document.getElementById('typewriterHeading');
  if (!heading) return;

  // Prepare characters and get flat array
  const chars = prepareTypewriter(heading);
  if (!chars.length) return;

  // Create cursor
  const cursor = document.createElement('span');
  cursor.className = 'type-cursor';
  cursor.textContent = '|';
  
  // Append cursor initially to the heading
  heading.appendChild(cursor);

  let idx = 0;
  const speed = 70; // ms per letter (smooth speed)

  const type = () => {
    if (idx < chars.length) {
      const char = chars[idx];
      char.style.opacity = '1';
      
      // Move cursor after the typed character
      char.parentNode.insertBefore(cursor, char.nextSibling);
      
      idx++;
      setTimeout(type, speed);
    } else {
      // Typing finished: fade out and remove cursor
      cursor.style.transition = 'opacity 0.3s ease';
      cursor.style.opacity = '0';
      setTimeout(() => cursor.remove(), 300);
    }
  };

  // Start typing after a short delay (e.g. 500ms after load)
  setTimeout(type, 500);
}

/* ============================================================
   17. Services 3D Stack Carousel Controller
   ============================================================ */
function initServicesCarousel() {
  const container = document.querySelector('.services-carousel-container');
  const wrapper = document.querySelector('.services-carousel-wrapper');
  if (!container || !wrapper) return;

  const cards = Array.from(container.querySelectorAll('.service-card'));
  const prevBtn = wrapper.querySelector('.prev-btn');
  const nextBtn = wrapper.querySelector('.next-btn');
  const dots = Array.from(wrapper.querySelectorAll('.indicator-dot'));
  
  if (cards.length === 0) return;

  let activeIndex = 0;
  let autoScrollTimer = null;
  const autoScrollInterval = 6000; // 6 seconds

  function adjustContainerHeight() {
    let maxHeight = 0;
    cards.forEach(card => {
      const oldHeight = card.style.height;
      const content = card.querySelector('.service-card-content');
      const oldContentHeight = content ? content.style.height : '';
      
      if (content) content.style.height = 'auto';
      card.style.height = 'auto';
      
      const height = card.offsetHeight;
      
      card.style.height = oldHeight;
      if (content) content.style.height = oldContentHeight;
      
      if (height > maxHeight) {
        maxHeight = height;
      }
    });
    container.style.height = `${maxHeight + 40}px`; // safe spacing offset
  }

  // Adjust on start, resize, and load (after images load)
  adjustContainerHeight();
  window.addEventListener('resize', adjustContainerHeight);
  window.addEventListener('load', adjustContainerHeight);

  // Watch for image loads to re-calculate natural heights
  cards.forEach(card => {
    const imgs = card.querySelectorAll('img');
    imgs.forEach(img => {
      if (img.complete) {
        adjustContainerHeight();
      } else {
        img.addEventListener('load', adjustContainerHeight);
      }
    });
  });

  function updateCarousel() {
    cards.forEach((card, idx) => {
      // Clear previous classes
      card.classList.remove('active', 'next-1', 'next-2', 'next-3', 'prev-1');
      
      // Calculate relative index in a circular array
      let relIndex = (idx - activeIndex + cards.length) % cards.length;
      
      if (relIndex === 0) {
        card.classList.add('active');
        card.style.opacity = '1';
        card.style.pointerEvents = 'auto';
        card.style.zIndex = '10';
        card.style.transform = 'translate3d(-50%, 0, 0) scale(1)';
      } else if (relIndex === 1) {
        card.classList.add('next-1');
        card.style.opacity = '0.8';
        card.style.pointerEvents = 'none';
        card.style.zIndex = '9';
        card.style.transform = 'translate3d(calc(-50% + 50px), 0, -60px) scale(0.95) rotateY(-5deg)';
      } else if (relIndex === 2) {
        card.classList.add('next-2');
        card.style.opacity = '0.55';
        card.style.pointerEvents = 'none';
        card.style.zIndex = '8';
        card.style.transform = 'translate3d(calc(-50% + 100px), 0, -120px) scale(0.9) rotateY(-10deg)';
      } else if (relIndex === 3) {
        card.classList.add('next-3');
        card.style.opacity = '0.3';
        card.style.pointerEvents = 'none';
        card.style.zIndex = '7';
        card.style.transform = 'translate3d(calc(-50% + 150px), 0, -180px) scale(0.85) rotateY(-15deg)';
      } else if (idx === (activeIndex - 1 + cards.length) % cards.length) {
        card.classList.add('prev-1');
        card.style.opacity = '0';
        card.style.pointerEvents = 'none';
        card.style.zIndex = '5';
        card.style.transform = 'translate3d(calc(-50% - 150px), 0, 60px) scale(0.9) rotateY(15deg)';
      } else {
        // Hidden cards in background
        card.style.opacity = '0';
        card.style.pointerEvents = 'none';
        card.style.zIndex = '1';
        card.style.transform = 'translate3d(-50%, 0, -200px) scale(0.8)';
      }
    });

    // Update dots
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === activeIndex);
    });
  }

  function nextSlide() {
    activeIndex = (activeIndex + 1) % cards.length;
    updateCarousel();
  }

  function prevSlide() {
    activeIndex = (activeIndex - 1 + cards.length) % cards.length;
    updateCarousel();
  }

  // Button click handlers
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      nextSlide();
      resetAutoScroll();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      prevSlide();
      resetAutoScroll();
    });
  }

  // Dot click handlers
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      activeIndex = idx;
      updateCarousel();
      resetAutoScroll();
    });
  });

  // Support clicking background cards to bring them forward
  cards.forEach((card, idx) => {
    card.addEventListener('click', (e) => {
      // Only process click if the card is not the active card
      if (activeIndex !== idx) {
        // If clicking a direct next card in stack, go next
        let relIndex = (idx - activeIndex + cards.length) % cards.length;
        if (relIndex > 0 && relIndex <= 2) {
          e.preventDefault();
          e.stopPropagation();
          activeIndex = idx;
          updateCarousel();
          resetAutoScroll();
        }
      }
    });
  });

  // Touch swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  wrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  wrapper.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchStartX - touchEndX > swipeThreshold) {
      nextSlide();
      resetAutoScroll();
    } else if (touchEndX - touchStartX > swipeThreshold) {
      prevSlide();
      resetAutoScroll();
    }
  }

  // Auto-scroll logic
  function startAutoScroll() {
    stopAutoScroll();
    autoScrollTimer = setInterval(nextSlide, autoScrollInterval);
  }

  function stopAutoScroll() {
    if (autoScrollTimer) {
      clearInterval(autoScrollTimer);
      autoScrollTimer = null;
    }
  }

  function resetAutoScroll() {
    startAutoScroll();
  }

  // Pause on hover
  wrapper.addEventListener('mouseenter', stopAutoScroll);
  wrapper.addEventListener('mouseleave', startAutoScroll);

  // Initialize
  updateCarousel();
  startAutoScroll();
}

/* ============================================================
   18. Spotlight Cards Mouse Tracker (Linear/Vercel Hover)
   ============================================================ */
function initSpotlightCards() {
  const cards = document.querySelectorAll('.service-card, .approach-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}





/* ============================================================
   20. Top Viewport Scrolling Progress Indicator
   ============================================================ */
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress-bar';
  document.body.appendChild(bar);

  const handleScroll = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    const progress = (window.scrollY / totalHeight) * 100;
    bar.style.width = `${progress}%`;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // initial state
}


function initMarqueeDrag() {
  const container = document.querySelector('.services-marquee-container');
  if (!container) return;

  let isDown = false;
  let startX;
  let scrollLeft;
  let isDragged = false;

  // Prevent native drag of images and links
  container.addEventListener('dragstart', (e) => e.preventDefault());

  container.addEventListener('mousedown', (e) => {
    isDown = true;
    isDragged = false;
    container.style.cursor = 'grabbing';
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });

  container.addEventListener('mouseleave', () => {
    isDown = false;
    container.style.cursor = 'grab';
  });

  container.addEventListener('mouseup', () => {
    isDown = false;
    container.style.cursor = 'grab';
  });

  container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    
    if (Math.abs(walk) > 5) {
      isDragged = true;
    }
    
    container.scrollLeft = scrollLeft - walk;
  });

  // Prevent click if we dragged
  container.addEventListener('click', (e) => {
    if (isDragged) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true); // Use capture phase
}

// About Us Modal Pop-up Logic
document.addEventListener('DOMContentLoaded', () => {
  const aboutBtn = document.querySelector('.btn-about');
  const aboutModal = document.getElementById('aboutModal');
  const closeAboutModal = document.getElementById('closeAboutModal');

  if (aboutBtn && aboutModal && closeAboutModal) {
    aboutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      aboutModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Disable background scrolling
    });

    const hideAboutModal = () => {
      aboutModal.classList.remove('active');
      document.body.style.overflow = ''; // Enable background scrolling
    };

    closeAboutModal.addEventListener('click', hideAboutModal);

    // Close when clicking outside content area
    aboutModal.addEventListener('click', (e) => {
      if (e.target === aboutModal) {
        hideAboutModal();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && aboutModal.classList.contains('active')) {
        hideAboutModal();
      }
    });
  }
});


