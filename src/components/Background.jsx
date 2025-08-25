import React, { useEffect, useRef } from 'react';

export default function Background({
  color1 = 0x2636cf,
  color2 = 0x151f56,
  size = 0.20,
  speed = 2.0,
  mobileBreakpoint = 720 // px - treat <= this as "mobile"
}) {
  const vantaRef = useRef(null);
  const mountElRef = useRef(null);
  const currentModeRef = useRef(null); // 'desktop' | 'mobile'

  useEffect(() => {
    let cancelled = false;

    const loadScript = (src) =>
      new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve();
        const s = document.createElement('script');
        s.src = src;
        s.async = true;
        s.onload = resolve;
        s.onerror = reject;
        document.body.appendChild(s);
      });

    const createMount = () => {
      // ensure only one mount exists
      let mount = document.getElementById('vanta-bg');
      if (!mount) {
        mount = document.createElement('div');
        mount.id = 'vanta-bg';
        mount.style.position = 'fixed';
        mount.style.inset = '0';
        mount.style.zIndex = '0';
        mount.style.pointerEvents = 'none';
        document.body.prepend(mount);
      }
      mountElRef.current = mount;
      return mount;
    };

    const initVanta = async () => {
      try {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js');
        await loadScript('https://cdn.jsdelivr.net/npm/vanta@0.5.21/dist/vanta.cells.min.js');
      } catch (err) { return; }
      if (cancelled || !window.VANTA) return;

      const isMobile = window.innerWidth <= mobileBreakpoint || window.matchMedia('(pointer: coarse)').matches;
      const mount = createMount();

      // pick a DPI-aware scale so canvas stays crisp
      const dpi = Math.max(1, window.devicePixelRatio || 1);
      const desktopScale = Math.min(1.5, dpi);       // allow >1 on high-DPI desktops
      const mobileScale = Math.min(1, dpi);          // keep <=1 on mobile (crisp without overshoot)

      // destroy previous if mode changed
      const mode = isMobile ? 'mobile' : 'desktop';
      if (currentModeRef.current && currentModeRef.current !== mode && vantaRef.current) {
        try { vantaRef.current.destroy(); } catch (e) {}
        vantaRef.current = null;
      }
      currentModeRef.current = mode;
      if (vantaRef.current) return;

      const opts = isMobile
        ? {
            el: mount,
            mouseControls: false,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: mobileScale,
            scaleMobile: mobileScale,
            size: Math.max(0.08, size * 0.6),
            speed: Math.max(0.6, speed * 0.5),
            color1,
            color2
          }
        : {
            el: mount,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: desktopScale,
            scaleMobile: mobileScale,
            size,
            speed,
            color1,
            color2
          };

      try {
        vantaRef.current = window.VANTA.CELLS(opts);
        const canvas = mount.querySelector('canvas');
        if (canvas) {
          canvas.style.willChange = 'transform, opacity';
          canvas.style.transform = 'translateZ(0)';
          // explicit pixel-ratio handling: set CSS size to 100% and let Vanta handle backing resolution
          canvas.style.imageRendering = 'auto';
          canvas.style.filter = 'none';
          canvas.style.backfaceVisibility = 'hidden';
        }
      } catch (e) { vantaRef.current = null; }
    };

    initVanta();

    // recreate/destroy when crossing breakpoint or on orientation change
    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        // if mode needs to change, destroy & re-init
        const isMobileNow = window.innerWidth <= mobileBreakpoint || window.matchMedia('(pointer: coarse)').matches;
        const newMode = isMobileNow ? 'mobile' : 'desktop';
        if (newMode !== currentModeRef.current) {
          try { vantaRef.current && vantaRef.current.destroy(); } catch (e) {}
          vantaRef.current = null;
          currentModeRef.current = null;
          initVanta();
        }
      }, 220);
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);

    // pause/destroy when page hidden to save battery
    const onVisibility = () => {
      if (document.hidden) {
        try { vantaRef.current && vantaRef.current.destroy(); } catch (e) {}
        vantaRef.current = null;
        currentModeRef.current = null;
      } else {
        initVanta();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelled = true;
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      try { vantaRef.current && vantaRef.current.destroy(); } catch (e) {}
      vantaRef.current = null;
      if (mountElRef.current && mountElRef.current.parentNode) {
        try { mountElRef.current.parentNode.removeChild(mountElRef.current); } catch (e) {}
        mountElRef.current = null;
      }
    };
  }, [color1, color2, size, speed, mobileBreakpoint]);

  return null;
}