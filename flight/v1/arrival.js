/* The artwork and page entrances also work without this enhancement. */
(() => {
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const hover = window.matchMedia("(hover: hover) and (pointer: fine)");
  const root = document.documentElement;
  let portfolio = null;
  let releaseScene = null;

  function connect() {
    const next = document.querySelector(".portfolio-v2");
    if (next === portfolio) return;
    if (releaseScene) releaseScene();
    portfolio = next;
    releaseScene = null;
    if (!next) return;

    const cover = next.querySelector(".p-editorial-cover");
    const photo = cover?.querySelector(".p-cover-photo");
    if (!photo) return;
    let inView = !("IntersectionObserver" in window);
    let frame = 0;
    let dx = 0;
    let dy = 0;
    const allowed = () => inView && !document.hidden && !motion.matches && root.classList.contains("mo");
    const clearOffset = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      photo.style.removeProperty("--flight-x");
      photo.style.removeProperty("--flight-y");
    };
    const sync = () => {
      photo.toggleAttribute("data-flight-visible", allowed());
      if (!allowed() || !hover.matches) clearOffset();
    };
    const applyOffset = () => {
      frame = 0;
      photo.style.setProperty("--flight-x", dx.toFixed(1) + "px");
      photo.style.setProperty("--flight-y", dy.toFixed(1) + "px");
    };
    const follow = (event) => {
      if (!allowed() || !hover.matches || event.pointerType === "touch") return;
      const bounds = cover.getBoundingClientRect();
      dx = ((event.clientX - bounds.left) / bounds.width - .5) * 16;
      dy = ((event.clientY - bounds.top) / bounds.height - .5) * 11;
      if (!frame) frame = requestAnimationFrame(applyOffset);
    };
    const sectionObserver = "IntersectionObserver" in window
      ? new IntersectionObserver((entries, observer) => {
          for (const entry of entries) {
            if (entry.target === photo) {
              inView = entry.isIntersecting;
              sync();
            } else if (entry.isIntersecting) {
              entry.target.setAttribute("data-flight-entered", "");
              observer.unobserve(entry.target);
            }
          }
        })
      : null;
    if (sectionObserver) {
      sectionObserver.observe(photo);
      next.querySelectorAll(".p-kicker").forEach(label => sectionObserver.observe(label));
    }
    const preferences = new MutationObserver(sync);
    preferences.observe(root, { attributes: true, attributeFilter: ["class"] });
    motion.addEventListener("change", sync);
    hover.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    cover.addEventListener("pointermove", follow, { passive: true });
    cover.addEventListener("pointerleave", clearOffset);
    sync();
    releaseScene = () => {
      clearOffset();
      photo.removeAttribute("data-flight-visible");
      sectionObserver?.disconnect();
      preferences.disconnect();
      motion.removeEventListener("change", sync);
      hover.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      cover.removeEventListener("pointermove", follow);
      cover.removeEventListener("pointerleave", clearOffset);
    };
  }

  // Next mounts each route shell as a direct body child in this static export.
  const routes = new MutationObserver(connect);
  routes.observe(document.body, { childList: true });
  window.addEventListener("pageshow", connect);
  connect();
})();
