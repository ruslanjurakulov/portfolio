/**
 * Marks elements `.in` as they scroll into view (CSS does the transition).
 * Elements already on screen at load are shown immediately, so there is no hidden first frame.
 * Always runs, even with motion off: `.in` is harmless when nothing is hidden.
 */
export function observeReveals(selector = '.reveal'): () => void {
  const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
  if (typeof IntersectionObserver === 'undefined') {
    els.forEach((el) => el.classList.add('in'));
    return () => {};
  }
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      }),
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  const vh = window.innerHeight;
  els.forEach((el) => {
    if (el.classList.contains('in')) return;
    if (el.getBoundingClientRect().top < vh * 0.92) el.classList.add('in');
    else io.observe(el);
  });
  return () => io.disconnect();
}
