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

const tabGroups = document.querySelectorAll('[data-tabs]');
tabGroups.forEach((group) => {
  const buttons = group.querySelectorAll('.tab-btn');
  const panels = group.querySelectorAll('.tab-panel');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab-target');
      buttons.forEach((b) => b.classList.remove('active'));
      panels.forEach((p) => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = group.querySelector(`[data-tab-panel=\"${target}\"]`);
      if (panel) panel.classList.add('active');
    });
  });
});
