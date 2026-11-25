// Mobile menu
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

// Highlight the nav link for the section in view
const links = [...nav.querySelectorAll('a')];
const sections = links
  .map((a) => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);
const setActive = () => {
  const y = window.scrollY + 120;
  let current = links[0];
  sections.forEach((s, i) => { if (s.offsetTop <= y) current = links[i]; });
  links.forEach((a) => a.classList.toggle('active', a === current));
};
window.addEventListener('scroll', setActive, { passive: true });

// Project filters
document.querySelectorAll('.filter').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach((b) => b.classList.toggle('active', b === btn));
    const f = btn.dataset.filter;
    document.querySelectorAll('.gallery figure').forEach((fig) => {
      fig.hidden = f !== 'all' && fig.dataset.cat !== f;
    });
  });
});

// Enquiry form: opens the visitor's email app with the details filled in.
// Swap for a form service once hosting is decided.
const form = document.getElementById('enquiry');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form));
  const err = form.querySelector('.form-error');
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email || '');
  if (!d.name || !d.phone || !emailOk) { err.hidden = false; return; }
  err.hidden = true;
  const subject = `Website enquiry: ${d.type || 'New project'}`;
  const body = [
    `Name: ${d.name}`,
    `Phone: ${d.phone}`,
    `Email: ${d.email}`,
    `Type of project: ${d.type || 'Not given'}`,
    '',
    d.message || '',
  ].join('\n');
  window.location.href = `mailto:enquiries@oandoconstruction.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

document.getElementById('year').textContent = new Date().getFullYear();
