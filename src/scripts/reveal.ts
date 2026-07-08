/**
 * Scroll reveal — spec 002. Adds `.is-visible` to `.reveal` elements once they
 * are ~15% visible, then stops observing them. `data-reveal-delay` (ms) becomes
 * `--reveal-delay` for staggered children.
 */
export function initReveal(): void {
  const elements = document.querySelectorAll<HTMLElement>('.reveal');
  if (elements.length === 0) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.15 },
  );

  elements.forEach((el) => {
    const delay = el.dataset.revealDelay;
    if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`);
    observer.observe(el);
  });
}

initReveal();
