// script.js - Enhanced Interactive Features
(function() {
  'use strict';

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mainNav = document.getElementById('mainNav');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      this.classList.toggle('active');
      mainNav.classList.toggle('active');
    });

    // Close menu on outside click
    document.addEventListener('click', function(e) {
      if (!mainNav.contains(e.target) && !mobileToggle.contains(e.target)) {
        mainNav.classList.remove('active');
        mobileToggle.classList.remove('active');
      }
    });

    // Close menu on link click
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        mobileToggle.classList.remove('active');
      });
    });
  }

  // Counter Animation
  const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'));
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target + '+';
        }
      };

      updateCounter();
    });
  };

  // Intersection Observer for counters
  if (window.IntersectionObserver) {
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      observer.observe(statsSection);
    }
  } else {
    // Fallback
    setTimeout(animateCounters, 500);
  }

  // Hero Image Carousel
  const heroImages = document.querySelectorAll('.hero-image');
  if (heroImages.length > 1) {
    let currentIndex = 0;
    
    setInterval(() => {
      heroImages[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % heroImages.length;
      heroImages[currentIndex].classList.add('active');
    }, 5000);
  }

  // Smooth Scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Navbar scroll effect
  let lastScroll = 0;
  const header = document.querySelector('.site-header');
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
    } else {
      header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
  });

  // Form validation demo
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const requiredFields = this.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = 'var(--deep-red)';
        } else {
          field.style.borderColor = 'var(--border-color)';
        }
      });
      
      if (!isValid) {
        e.preventDefault();
        alert('Please fill in all required fields marked with *');
      }
    });
  });

  // Lazy load images
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.src = img.dataset.src || img.src;
    });
  }

  console.log('M. SIDIK & SONS COMPANY LIMITED - Website initialized');
  console.log('Contact via WhatsApp: +233 20 127 6381');
})();