/* ============================================
   Portfolio JavaScript — Masterclass Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Universal Intersection Observer for all Reveal Types ---
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-blur');
  
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

  // --- Navbar Scroll Effect ---
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        if (mobileNav.classList.contains('open')) {
          closeMobileNav();
        }
      }
    });
  });

  // --- Mobile Navigation ---
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

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

  hamburger.addEventListener('click', () => {
    if (mobileNav.classList.contains('open')) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // --- Back to Top Button ---
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

  // --- Staggered Card Entrance Animations ---
  const cards = document.querySelectorAll('.project-card, .skill-category, .contact-card, .freelance-cta-card');
  
  const cardObserver = new IntersectionObserver((entries) => {
    let delay = 0;
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, delay);
        delay += 100;
        cardObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -20px 0px'
  });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
    cardObserver.observe(card);
  });

  // --- Count-up Animation for Stats ---
  const statValues = document.querySelectorAll('.hero-stat-value');
  
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const finalText = el.textContent;
        const match = finalText.match(/(\d+)/);
        
        if (match) {
          const target = parseInt(match[0]);
          const suffix = finalText.replace(match[0], '');
          const prefix = finalText.substring(0, finalText.indexOf(match[0]));
          let current = 0;
          const increment = Math.max(1, Math.floor(target / 40));
          const stepTime = 30;
          
          const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(counter);
            }
            el.textContent = prefix + current + suffix;
          }, stepTime);
        }
        
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statValues.forEach(stat => countObserver.observe(stat));

  // --- Typed Effect for Hero Badge ---
  const badge = document.querySelector('.hero-badge-text');
  if (badge) {
    const text = badge.textContent;
    badge.textContent = '';
    let i = 0;
    function typeChar() {
      if (i < text.length) {
        badge.textContent += text.charAt(i);
        i++;
        setTimeout(typeChar, 40);
      }
    }
    setTimeout(typeChar, 600);
  }

  // ============================================
  // MASTERCLASS ANIMATIONS
  // ============================================

  // --- Cursor Glow (Desktop Only) ---
  if (window.matchMedia('(hover: hover)').matches) {
    const cursorGlow = document.createElement('div');
    cursorGlow.classList.add('cursor-glow');
    document.body.appendChild(cursorGlow);

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateGlow() {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top = glowY + 'px';
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  }

  // --- Magnetic Contact Cards ---
  const contactCards = document.querySelectorAll('.contact-card');
  
  contactCards.forEach(card => {
    // Add spotlight element
    const spotlight = document.createElement('div');
    spotlight.classList.add('card-spotlight');
    card.appendChild(spotlight);

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Magnetic tilt
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      
      // Spotlight follow
      spotlight.style.left = x + 'px';
      spotlight.style.top = y + 'px';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // --- Magnetic Freelance CTA Card ---
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

  // --- Contact Section Title Animation ---
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

  // --- Timeline Progress Animation ---
  const timelineProgress = document.querySelector('.timeline-progress');
  if (timelineProgress) {
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate');
          }, 200);
          timelineObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    timelineObserver.observe(timelineProgress);
  }

  // --- Parallax Effect on Hero Section ---
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');
  const heroImage = document.querySelector('.hero-image-wrapper');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroHeight = hero ? hero.offsetHeight : 0;
    
    if (scrolled < heroHeight) {
      const parallaxValue = scrolled * 0.3;
      if (heroContent) {
        heroContent.style.transform = `translateY(${parallaxValue * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / heroHeight) * 0.6;
      }
      if (heroImage) {
        heroImage.style.transform = `translateY(${parallaxValue * 0.2}px)`;
      }
    }
  }, { passive: true });

  // --- Tilt Effect on Project Cards ---
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // --- Skill Tag Stagger on Hover ---
  const skillCategories = document.querySelectorAll('.skill-category');
  
  skillCategories.forEach(category => {
    const tags = category.querySelectorAll('.skill-tag');
    
    category.addEventListener('mouseenter', () => {
      tags.forEach((tag, i) => {
        setTimeout(() => {
          tag.style.transform = 'translateY(-3px)';
        }, i * 40);
      });
    });

    category.addEventListener('mouseleave', () => {
      tags.forEach(tag => {
        tag.style.transform = '';
      });
    });
  });

  // --- Section Divider Line Animations ---
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
        }
      });
    }, { threshold: 0.05 });
    
    sectionObserver.observe(section);
  });

});
