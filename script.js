document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navPanel = document.querySelector('[data-nav-panel]');

  if (navToggle && navPanel) {
    const closeNav = () => {
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open menu');
      navPanel.classList.remove('is-open');
      navPanel.inert = true;
    };

    closeNav();
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.classList.toggle('is-open', !isOpen);
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
      navPanel.classList.toggle('is-open', !isOpen);
      navPanel.inert = isOpen;
    });
    navPanel.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeNav();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeNav();
    });
  }

  const filterButtons = document.querySelectorAll('[data-filter]');
  const scoreCards = document.querySelectorAll('[data-status]');

  filterButtons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.classList.contains('is-active')));
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle('is-active', isActive);
        item.setAttribute('aria-pressed', String(isActive));
      });
      scoreCards.forEach((card) => {
        card.hidden = filter !== 'all' && card.dataset.status !== filter;
      });
    });
  });

  document.querySelectorAll('[data-fill]').forEach((bar) => {
    const value = Number(bar.dataset.fill);
    bar.style.width = `${Math.min(100, Math.max(0, value))}%`;
  });
});