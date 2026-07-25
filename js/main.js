// ===================== LIVIO DESIGNS — CORE JS =====================
const WA_NUMBER = "917204351696";
function waLink(msg) { return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg || "Hi Livio Designs, I'd like to talk about a project.")}`; }

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-wa-msg]').forEach(el => {
    el.setAttribute('href', waLink(el.getAttribute('data-wa-msg')));
    el.setAttribute('target', '_blank'); el.setAttribute('rel', 'noopener');
  });
  document.querySelectorAll('[data-call]').forEach(el => el.setAttribute('href', 'tel:+917204351696'));

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else revealEls.forEach(el => el.classList.add('is-visible'));

  // Registration-plate snap trigger (CMYK plates snap into place on view)
  const regEls = document.querySelectorAll('.reg-wrap');
  if ('IntersectionObserver' in window && regEls.length) {
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); io2.unobserve(e.target); } });
    }, { threshold: 0.4 });
    regEls.forEach(el => io2.observe(el));
  } else regEls.forEach(el => el.classList.add('in-view'));

  // Active dock item
  const current = (window.location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.dock-item[data-page]').forEach(el => {
    if (el.getAttribute('data-page') === current) el.classList.add('active');
  });
});
