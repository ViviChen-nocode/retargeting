const accordions = document.querySelectorAll('.accordion-item');
accordions.forEach((item) => {
  const header = item.querySelector('.accordion-header');
  if (!header) return;
  header.addEventListener('click', () => {
    item.classList.toggle('open');
  });
});

const progressBars = document.querySelectorAll('[data-progress]');
progressBars.forEach((bar) => {
  const value = bar.getAttribute('data-progress');
  const span = bar.querySelector('span');
  if (span && value) {
    requestAnimationFrame(() => {
      span.style.width = value + '%';
    });
  }
});

const revealItems = document.querySelectorAll('[data-reveal]');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  },
  { threshold: 0.2 }
);
revealItems.forEach((item) => observer.observe(item));
