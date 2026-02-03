const pages = [
  { key: 'what-is', label: '概念' },
  { key: 'tracking', label: '追蹤' },
  { key: 'tools', label: '埋設' },
  { key: 'gtm', label: 'GTM' },
  { key: 'practice', label: '實務' },
];

const STORAGE_KEY = 'retargeting_progress';

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function markPageComplete() {
  const page = document.body.getAttribute('data-page');
  if (!page) return;
  const progress = loadProgress();
  progress[page] = true;
  saveProgress(progress);
}

function updateProgressUI() {
  const progress = loadProgress();
  const total = pages.length;
  const completed = pages.filter((p) => progress[p.key]).length;
  const percent = Math.round((completed / total) * 100);

  const bar = document.querySelector('[data-progress]');
  if (bar) {
    const span = bar.querySelector('span');
    if (span) {
      requestAnimationFrame(() => {
        span.style.width = percent + '%';
      });
    }
  }

  const list = document.querySelector('[data-progress-list]');
  if (list) {
    list.innerHTML = '';
    pages.forEach((p) => {
      const chip = document.createElement('span');
      chip.className = 'badge';
      chip.textContent = p.label + (progress[p.key] ? ' ✓' : '');
      if (progress[p.key]) {
        chip.style.background = '#bbf7d0';
      }
      list.appendChild(chip);
    });
  }

  const summaries = document.querySelectorAll('[data-progress-summary]');
  summaries.forEach((summary) => {
    summary.textContent = `已完成 ${completed} / ${total} 章節`;
  });

  const miniSummaries = document.querySelectorAll('[data-progress-summary-mini]');
  miniSummaries.forEach((summary) => {
    summary.textContent = `目前進度：${completed} / ${total}`;
  });
}

markPageComplete();
updateProgressUI();

const resetBtn = document.querySelector('[data-progress-reset]');
if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    localStorage.removeItem(STORAGE_KEY);
    updateProgressUI();
  });
}
