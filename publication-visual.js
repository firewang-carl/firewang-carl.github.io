document.querySelectorAll('.project-media').forEach((media) => {
  const video = media.querySelector('video');
  if (!video) return;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false;
  video.controls = false;
  video.muted = true;
  const syncPlayback = () => {
    if (visible && !document.hidden && !motion.matches) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };
  motion.addEventListener('change', syncPlayback);
  document.addEventListener('visibilitychange', syncPlayback);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    }, { threshold: 0.1 });
    observer.observe(video);
  } else {
    visible = true;
    syncPlayback();
  }
});
