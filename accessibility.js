/* accessibility.js — color picker + keyboard card nav */
(function () {
  /* ── 1. COLOR PICKER ── */
  const DEFAULT_BG = '#F5F033';
  const DEFAULT_TEXT = '#4b4700';

  const toggle = document.getElementById('a11y-toggle');
  const panel  = document.getElementById('a11y-panel');
  const bgPick = document.getElementById('a11y-bg');
  const txPick = document.getElementById('a11y-tx');
  const reset  = document.getElementById('a11y-reset');

  if (toggle && panel) {
    /* restore saved prefs */
    const savedBg = localStorage.getItem('a11y-bg');
    const savedTx = localStorage.getItem('a11y-tx');
    if (savedBg) { document.documentElement.style.setProperty('--yellow', savedBg); if(bgPick) bgPick.value = savedBg; }
    if (savedTx) { document.documentElement.style.setProperty('--olive',  savedTx); if(txPick) txPick.value = savedTx; }

    toggle.addEventListener('click', () => {
      const open = panel.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
      toggle.setAttribute('aria-label', open ? 'Tancar opcions d\'accessibilitat' : 'Obrir opcions d\'accessibilitat');
    });

    toggle.addEventListener('keydown', e => {
      if (e.key === 'Escape') { panel.classList.remove('open'); toggle.setAttribute('aria-expanded', false); }
    });

    if (bgPick) bgPick.addEventListener('input', e => {
      document.documentElement.style.setProperty('--yellow', e.target.value);
      localStorage.setItem('a11y-bg', e.target.value);
    });

    if (txPick) txPick.addEventListener('input', e => {
      document.documentElement.style.setProperty('--olive', e.target.value);
      localStorage.setItem('a11y-tx', e.target.value);
    });

    if (reset) reset.addEventListener('click', () => {
      document.documentElement.style.setProperty('--yellow', DEFAULT_BG);
      document.documentElement.style.setProperty('--olive',  DEFAULT_TEXT);
      if(bgPick) bgPick.value = DEFAULT_BG;
      if(txPick) txPick.value = DEFAULT_TEXT;
      localStorage.removeItem('a11y-bg');
      localStorage.removeItem('a11y-tx');
    });
  }

  /* ── 2. KEYBOARD NAVIGATION FOR ROLE=BUTTON CARDS ── */
  document.querySelectorAll('[role="button"]').forEach(el => {
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        el.click();
      }
    });
  });

  /* ── 3. TRANSCRIPT TOGGLES ── */
  document.querySelectorAll('.transcript-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const body = btn.nextElementSibling;
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !expanded);
      body.classList.toggle('open', !expanded);
    });
  });
})();
