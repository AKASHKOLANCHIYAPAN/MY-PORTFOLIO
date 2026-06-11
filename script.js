/* ============================================
   Portfolio JavaScript — GOD LEVEL Animations
   Divine Motion System — Zero Dependencies
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // Mark body as loading
  document.body.classList.add('loading');

  // ============================================
  // 1. PAGE LOADER — CINEMATIC ENTRANCE
  // ============================================
  const pageLoader = document.getElementById('pageLoader');

  function dismissLoader() {
    pageLoader.classList.add('done');
    document.body.classList.remove('loading');

    setTimeout(() => {
      pageLoader.classList.add('hidden');
    }, 1200);
  }

  // Start dismiss after load bar completes
  setTimeout(dismissLoader, 2400);

  // ============================================
  // 2. CUSTOM CURSOR — MAGNETIC TRAIL SYSTEM
  // ============================================
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  if (window.matchMedia('(hover: hover) and (min-width: 769px)').matches && cursorDot && cursorRing) {
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;

    // Trail dots
    const trailCount = 8;
    const trailDots = [];
    const trailPositions = [];

    for (let i = 0; i < trailCount; i++) {
      const dot = document.createElement('div');
      dot.style.cssText = `
        position: fixed;
        width: ${4 - (i * 0.3)}px;
        height: ${4 - (i * 0.3)}px;
        background: rgba(59, 130, 246, ${0.3 - (i * 0.03)});
        border-radius: 50%;
        pointer-events: none;
        z-index: 99996;
        transform: translate(-50%, -50%);
        transition: width 0.3s ease, height 0.3s ease;
        will-change: transform;
      `;
      document.body.appendChild(dot);
      trailDots.push(dot);
      trailPositions.push({ x: 0, y: 0 });
    }

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    document.addEventListener('mousedown', () => {
      cursorDot.classList.add('clicking');
      cursorRing.classList.add('clicking');
    });

    document.addEventListener('mouseup', () => {
      cursorDot.classList.remove('clicking');
      cursorRing.classList.remove('clicking');
    });

    // Hover states for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-magnetic], .project-card, .skill-category, .contact-card, .stack-tag, .skill-tag, .cert-item');

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorDot.classList.add('hovering');
        cursorRing.classList.add('hovering');
      });
      el.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('hovering');
        cursorRing.classList.remove('hovering');
      });
    });

    function animateCursor() {
      // Smooth follow for dot
      dotX += (mouseX - dotX) * 0.15;
      dotY += (mouseY - dotY) * 0.15;
      cursorDot.style.left = dotX + 'px';
      cursorDot.style.top = dotY + 'px';

      // Even smoother follow for ring
      ringX += (mouseX - ringX) * 0.08;
      ringY += (mouseY - ringY) * 0.08;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';

      // Trail animation
      for (let i = trailDots.length - 1; i > 0; i--) {
        trailPositions[i].x = trailPositions[i - 1].x;
        trailPositions[i].y = trailPositions[i - 1].y;
      }
      trailPositions[0].x = dotX;
      trailPositions[0].y = dotY;

      trailDots.forEach((dot, i) => {
        dot.style.left = trailPositions[i].x + 'px';
        dot.style.top = trailPositions[i].y + 'px';
      });

      requestAnimationFrame(animateCursor);
    }
    animateCursor();
  }

  // ============================================
  // 3. PARTICLE CONSTELLATION — CANVAS SYSTEM
  // ============================================
  const canvas = document.getElementById('heroParticles');

  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    let canvasMouseX = 0, canvasMouseY = 0;

    function resizeCanvas() {
      const hero = canvas.parentElement;
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.pulseSpeed = Math.random() * 0.02 + 0.005;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulsePhase += this.pulseSpeed;

        // Mouse repulsion
        const dx = this.x - canvasMouseX;
        const dy = this.y - canvasMouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const force = (120 - dist) / 120;
          this.vx += (dx / dist) * force * 0.02;
          this.vy += (dy / dist) * force * 0.02;
        }

        // Damping
        this.vx *= 0.99;
        this.vy *= 0.99;

        // Wrap around
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        const pulse = Math.sin(this.pulsePhase) * 0.15 + 0.85;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity * pulse})`;
        ctx.fill();
      }
    }

    // Create particles
    const particleCount = Math.min(60, Math.floor((canvas.width * canvas.height) / 15000));
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      canvasMouseX = e.clientX - rect.left;
      canvasMouseY = e.clientY - rect.top;
    });

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.08;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      drawConnections();
      animationId = requestAnimationFrame(animateParticles);
    }

    // Start particles after loader
    setTimeout(() => {
      animateParticles();
    }, 2500);
  }

  // ============================================
  // 4. SCROLL PROGRESS BAR
  // ============================================
  const scrollProgress = document.getElementById('scrollProgress');

  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    if (scrollProgress) {
      scrollProgress.style.width = scrollPercent + '%';
    }

    // Also update back-to-top progress ring
    const progressCircle = document.querySelector('.back-to-top-progress circle');
    if (progressCircle) {
      const circumference = 125.6;
      const offset = circumference - (scrollPercent / 100) * circumference;
      progressCircle.style.strokeDashoffset = offset;
    }
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  // ============================================
  // 5. NAVBAR — HIDE/SHOW ON SCROLL + EFFECTS
  // ============================================
  const navbar = document.querySelector('.navbar');
  let lastScrollY = 0;
  let ticking = false;

  function updateNavbar() {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Hide/show on scroll direction
    if (scrollY > 300) {
      if (scrollY > lastScrollY + 5) {
        navbar.classList.add('navbar-hidden');
      } else if (scrollY < lastScrollY - 5) {
        navbar.classList.remove('navbar-hidden');
      }
    } else {
      navbar.classList.remove('navbar-hidden');
    }

    lastScrollY = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }, { passive: true });

  // ============================================
  // 6. UNIVERSAL REVEAL OBSERVER
  // ============================================
  const revealElements = document.querySelectorAll('.reveal, .reveal-clip, .reveal-blur, .reveal-slide-right, .reveal-scale');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ============================================
  // 7. SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  const mobileNav = document.querySelector('.mobile-nav');
  const hamburger = document.querySelector('.hamburger');

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        if (mobileNav && mobileNav.classList.contains('open')) {
          closeMobileNav();
        }
      }
    });
  });

  // ============================================
  // 8. MOBILE NAVIGATION
  // ============================================
  function closeMobileNav() {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  }

  function openMobileNav() {
    hamburger.classList.add('active');
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      if (mobileNav.classList.contains('open')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });
  }

  // ============================================
  // 9. BACK TO TOP BUTTON
  // ============================================
  const backToTop = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ============================================
  // 10. STAGGERED CARD ENTRANCES — WAVE PATTERN
  // ============================================
  const cards = document.querySelectorAll('.project-card, .skill-category, .contact-card, .freelance-cta-card');

  const cardObserver = new IntersectionObserver((entries) => {
    const visibleEntries = entries.filter(e => e.isIntersecting);
    visibleEntries.forEach((entry, index) => {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0) rotate(0)';
        entry.target.style.filter = 'blur(0)';
      }, index * 120);
      cardObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -20px 0px'
  });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px) rotate(1deg)';
    card.style.filter = 'blur(6px)';
    card.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s ease';
    cardObserver.observe(card);
  });

  // ============================================
  // 11. COUNT-UP ANIMATION — SMOOTH EASING
  // ============================================
  const statValues = document.querySelectorAll('.hero-stat-value');

  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count') || '0');
        const suffix = '+';
        const duration = 2000;
        const startTime = performance.now();

        function updateCount(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easedProgress = easeOutExpo(progress);
          const current = Math.round(easedProgress * target);

          el.textContent = current + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          }
        }

        requestAnimationFrame(updateCount);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statValues.forEach(stat => countObserver.observe(stat));

  // ============================================
  // 12. TYPED EFFECT — HERO BADGE
  // ============================================
  const badge = document.querySelector('.hero-badge-text');
  if (badge) {
    const text = 'Available for Freelance Work';
    badge.textContent = '';
    let i = 0;

    function typeChar() {
      if (i < text.length) {
        badge.textContent += text.charAt(i);
        i++;
        setTimeout(typeChar, 35 + Math.random() * 25);
      }
    }

    // Start typing after page load
    setTimeout(typeChar, 3200);
  }

  // ============================================
  // 13. MAGNETIC HOVER EFFECT
  // ============================================
  const magneticElements = document.querySelectorAll('[data-magnetic]');

  if (window.matchMedia('(hover: hover)').matches) {
    magneticElements.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const strength = 0.3;

        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
        el.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        setTimeout(() => {
          el.style.transition = '';
        }, 500);
      });
    });
  }

  // ============================================
  // 14. 3D TILT EFFECT — PROJECT & SKILL CARDS
  // ============================================
  const tiltCards = document.querySelectorAll('[data-tilt]');

  if (window.matchMedia('(hover: hover)').matches) {
    tiltCards.forEach(card => {
      const glowEl = card.querySelector('.project-card-glow');

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;

        // Move glow to cursor
        if (glowEl) {
          glowEl.style.left = x + 'px';
          glowEl.style.top = y + 'px';
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        setTimeout(() => {
          card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        }, 600);
      });
    });
  }

  // ============================================
  // 15. MAGNETIC CONTACT CARDS
  // ============================================
  const contactCards = document.querySelectorAll('.contact-card');

  contactCards.forEach(card => {
    const spotlight = document.createElement('div');
    spotlight.classList.add('card-spotlight');
    card.appendChild(spotlight);

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;

      spotlight.style.left = x + 'px';
      spotlight.style.top = y + 'px';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // ============================================
  // 16. MAGNETIC FREELANCE CTA CARD
  // ============================================
  const freelanceCard = document.querySelector('.freelance-cta-card');
  if (freelanceCard) {
    freelanceCard.addEventListener('mousemove', (e) => {
      const rect = freelanceCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;

      freelanceCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    freelanceCard.addEventListener('mouseleave', () => {
      freelanceCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  }

  // ============================================
  // 17. CONTACT TITLE ANIMATION
  // ============================================
  const contactTitle = document.querySelector('.contact-title-highlight');
  if (contactTitle) {
    const titleObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate');
          }, 400);
          titleObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    titleObserver.observe(contactTitle);
  }

  // ============================================
  // 18. TIMELINE PROGRESS ANIMATION
  // ============================================
  const timelineProgress = document.querySelector('.timeline-progress');
  if (timelineProgress) {
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate');
          }, 300);
          timelineObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    timelineObserver.observe(timelineProgress);
  }

  // ============================================
  // 19. PARALLAX EFFECT — MULTI-LAYER
  // ============================================
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');
  const heroImage = document.querySelector('.hero-image-wrapper');
  const scrollIndicator = document.querySelector('.scroll-indicator');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroHeight = hero ? hero.offsetHeight : 0;

    if (scrolled < heroHeight) {
      const factor = scrolled / heroHeight;

      if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
        heroContent.style.opacity = 1 - factor * 0.7;
      }
      if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.08}px) scale(${1 - factor * 0.05})`;
      }
      if (scrollIndicator) {
        scrollIndicator.style.opacity = 1 - factor * 3;
      }
    }
  }, { passive: true });

  // ============================================
  // 20. RIPPLE CLICK EFFECT
  // ============================================
  const rippleElements = document.querySelectorAll('[data-ripple]');

  rippleElements.forEach(el => {
    el.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.classList.add('ripple-effect');
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';

      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';

      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ============================================
  // 21. SKILL TAG WAVE ANIMATION
  // ============================================
  const skillCategories = document.querySelectorAll('.skill-category');

  skillCategories.forEach(category => {
    const tags = category.querySelectorAll('.skill-tag');

    category.addEventListener('mouseenter', () => {
      tags.forEach((tag, i) => {
        setTimeout(() => {
          tag.style.transform = 'translateY(-4px) scale(1.03)';
          tag.style.borderColor = 'rgba(59, 130, 246, 0.3)';
        }, i * 50);
      });
    });

    category.addEventListener('mouseleave', () => {
      tags.forEach((tag, i) => {
        setTimeout(() => {
          tag.style.transform = '';
          tag.style.borderColor = '';
        }, i * 30);
      });
    });
  });

  // ============================================
  // 22. CONTACT SECTION FLOATING PARTICLES
  // ============================================
  const contactParticlesContainer = document.querySelector('.contact-particles');

  if (contactParticlesContainer) {
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 3 + 1;
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, ${Math.random() * 0.08 + 0.02});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: contactFloat ${Math.random() * 10 + 10}s ease-in-out infinite;
        animation-delay: ${Math.random() * -10}s;
      `;
      contactParticlesContainer.appendChild(particle);
    }

    // Inject the keyframes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes contactFloat {
        0%, 100% { transform: translate(0, 0); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        50% { transform: translate(${Math.random() > 0.5 ? '' : '-'}${Math.random() * 100 + 50}px, -${Math.random() * 100 + 50}px); }
      }
    `;
    document.head.appendChild(style);
  }

  // ============================================
  // 23. SMOOTH SECTION TRANSITIONS
  // ============================================
  const sections = document.querySelectorAll('section');

  sections.forEach(section => {
    section.style.transition = 'opacity 0.6s ease';
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
        }
      });
    }, { threshold: 0.02 });

    sectionObserver.observe(section);
  });

  // ============================================
  // 24. TIMELINE HIGHLIGHT STAGGER
  // ============================================
  const timelineItems = document.querySelectorAll('.timeline-item');

  timelineItems.forEach(item => {
    const highlights = item.querySelectorAll('.timeline-highlight');

    const highlightObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          highlights.forEach((hl, i) => {
            hl.style.opacity = '0';
            hl.style.transform = 'translateX(-20px)';
            hl.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';

            setTimeout(() => {
              hl.style.opacity = '1';
              hl.style.transform = 'translateX(0)';
            }, 300 + i * 150);
          });
          highlightObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    if (highlights.length > 0) {
      highlightObserver.observe(item);
    }
  });

  // ============================================
  // 25. STACK TAG STAGGER ON SCROLL
  // ============================================
  const timelineStacks = document.querySelectorAll('.timeline-stack');

  timelineStacks.forEach(stack => {
    const tags = stack.querySelectorAll('.stack-tag');

    const stackObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          tags.forEach((tag, i) => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(10px) scale(0.9)';
            tag.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';

            setTimeout(() => {
              tag.style.opacity = '1';
              tag.style.transform = 'translateY(0) scale(1)';
            }, 100 + i * 60);
          });
          stackObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    stackObserver.observe(stack);
  });

  // ============================================
  // 26. HERO IMAGE TILT ON MOUSE MOVE
  // ============================================
  const heroImageContainer = document.querySelector('.hero-image-container');

  if (heroImageContainer && window.matchMedia('(hover: hover)').matches) {
    heroImageContainer.addEventListener('mousemove', (e) => {
      const rect = heroImageContainer.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const rotateX = (0.5 - y) * 15;
      const rotateY = (x - 0.5) * 15;

      heroImageContainer.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    heroImageContainer.addEventListener('mouseleave', () => {
      heroImageContainer.style.transform = '';
      heroImageContainer.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
      setTimeout(() => {
        heroImageContainer.style.transition = '';
      }, 600);
    });
  }

  // ============================================
  // 27. EDUCATION CERTIFICATION STAGGER
  // ============================================
  const certItems = document.querySelectorAll('.cert-item');

  const certObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter(e => e.isIntersecting);
    visible.forEach((entry, i) => {
      const el = entry.target;
      el.style.opacity = '0';
      el.style.transform = 'translateX(-20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';

      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateX(0)';
      }, i * 100);

      certObserver.unobserve(el);
    });
  }, { threshold: 0.3 });

  certItems.forEach(item => certObserver.observe(item));

  // ============================================
  // 28. SMOOTH SCROLLBAR WIDTH FIX
  // ============================================
  document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.clientWidth) + 'px');

  // ============================================
  // 29. EASTER EGG — KONAMI CODE
  // ============================================
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        // Trigger celebration effect
        for (let i = 0; i < 50; i++) {
          const confetti = document.createElement('div');
          confetti.style.cssText = `
            position: fixed;
            width: ${Math.random() * 8 + 4}px;
            height: ${Math.random() * 8 + 4}px;
            background: hsl(${Math.random() * 360}, 80%, 60%);
            left: ${Math.random() * 100}vw;
            top: -10px;
            z-index: 100000;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            pointer-events: none;
            animation: confettiFall ${Math.random() * 2 + 1.5}s ease-in forwards;
          `;
          document.body.appendChild(confetti);
          setTimeout(() => confetti.remove(), 3500);
        }

        const confettiStyle = document.createElement('style');
        confettiStyle.textContent = `
          @keyframes confettiFall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(${Math.random() * 720}deg); opacity: 0; }
          }
        `;
        document.head.appendChild(confettiStyle);

        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  // ============================================
  // 30. PERFORMANCE — REDUCED MOTION SUPPORT
  // ============================================
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(el => {
      el.style.animationDuration = '0.01ms';
      el.style.animationIterationCount = '1';
      el.style.transitionDuration = '0.01ms';
    });
  }

});
