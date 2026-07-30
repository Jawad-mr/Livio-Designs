/* ==========================================================================
   LIVIO DESIGNS — INTERACTIVE JAVASCRIPT
   Venture under JSN CREATIVE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      mobileMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', !isOpen);
      
      const icon = mobileToggle.querySelector('svg');
      if (icon) {
        if (!isOpen) {
          icon.innerHTML = '<path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
        } else {
          icon.innerHTML = '<path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
        }
      }
    });
  }

  // Highlight Current Page in Navigation
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // IntersectionObserver for Scroll Reveal Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.15
  };

  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }

  // Portfolio Filter Functionality (work.html)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (filterBtns.length > 0 && portfolioItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        portfolioItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }

  // Contact Form WhatsApp Submission Handler
  const contactForm = document.getElementById('studio-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('form-name')?.value || '';
      const email = document.getElementById('form-email')?.value || '';
      const service = document.getElementById('form-service')?.value || 'General Inquiry';
      const message = document.getElementById('form-message')?.value || '';

      const fullMessage = `Hi Livio Designs!%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Service Required:* ${encodeURIComponent(service)}%0A*Details:* ${encodeURIComponent(message)}`;
      const whatsappUrl = `https://wa.me/917204351696?text=${fullMessage}`;

      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // Interactive Pricing / Package Estimator
  const estimatorCheckboxes = document.querySelectorAll('.estimator-checkbox input');
  const estimatorBtn = document.getElementById('estimator-submit');

  if (estimatorCheckboxes.length > 0 && estimatorBtn) {
    const updateEstimatorText = () => {
      const selected = Array.from(estimatorCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);

      let textMsg = "Hi Livio Designs, I'd like a custom estimate for the following scope:";
      if (selected.length > 0) {
        textMsg += `%0A- ` + selected.join('%0A- ');
      } else {
        textMsg += " Custom Project Scope";
      }

      estimatorBtn.setAttribute('href', `https://wa.me/917204351696?text=${textMsg}`);
    };

    estimatorCheckboxes.forEach(cb => cb.addEventListener('change', updateEstimatorText));
  }
});
