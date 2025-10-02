"use client";
import React, { useLayoutEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import './GallerySection.css';

const imageModules = import.meta.glob("../assets/gallery/**/*.{png,jpg,jpeg,webp,avif,gif}", {
  eager: true,
  as: "url"
});

export default function GallerySection() {
  const images = useMemo(() => Object.values(imageModules), []);
  const componentRoot = useRef(null);
  const ring = useRef(null);
  const xPos = useRef(0);

  useLayoutEffect(() => {
    if (images.length === 0) return;

    const ctx = gsap.context(() => {
      const imageElements = gsap.utils.toArray('.img');

      const getBgPos = (i) => {
        return (100 - gsap.utils.wrap(0, 360, gsap.getProperty(ring.current, 'rotationY') - 180 - i * -36) / 360 * 500) + 'px 0px';
      };

      gsap.timeline()
        .set(ring.current, { rotationY: 180, cursor: 'grab' })
        .set(imageElements, {
          rotateY: (i) => i * -36,
          transformOrigin: '50% 50% 500px',
          z: -500,
          backgroundImage: (i) => `url(${images[i % images.length]})`,
          backgroundPosition: (i) => getBgPos(i),
          backfaceVisibility: 'hidden'
        })
        .from(imageElements, {
          duration: 1.5,
          y: 200,
          opacity: 0,
          stagger: 0.1,
          ease: 'expo'
        })
        .add(() => {
          imageElements.forEach(img => {
            img.addEventListener('mouseenter', () => {
              gsap.to(imageElements, { opacity: (i, t) => (t === img) ? 1 : 0.5, ease: 'power3' });
            });
            img.addEventListener('mouseleave', () => {
              gsap.to(imageElements, { opacity: 1, ease: 'power2.inOut' });
            });
          });
        }, '-=0.5');

      const dragStart = (e) => {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        xPos.current = Math.round(clientX);
        gsap.set(ring.current, { cursor: 'grabbing' });
        window.addEventListener('mousemove', drag);
        window.addEventListener('touchmove', drag);
      };

      const drag = (e) => {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const newX = Math.round(clientX);
        gsap.to(ring.current, {
          rotationY: '-=' + ((newX - xPos.current) % 360),
          onUpdate: () => {
            gsap.set(imageElements, { backgroundPosition: (i) => getBgPos(i) });
          }
        });
        xPos.current = newX;
      };

      const dragEnd = () => {
        window.removeEventListener('mousemove', drag);
        window.removeEventListener('touchmove', drag);
        gsap.set(ring.current, { cursor: 'grab' });
      };

      const stage = componentRoot.current;
      stage.addEventListener('mousedown', dragStart);
      stage.addEventListener('touchstart', dragStart, { passive: true });
      window.addEventListener('mouseup', dragEnd);
      window.addEventListener('touchend', dragEnd);

      return () => {
        stage.removeEventListener('mousedown', dragStart);
        stage.removeEventListener('touchstart', dragStart);
        window.removeEventListener('mouseup', dragEnd);
        window.removeEventListener('touchend', dragEnd);
        window.removeEventListener('mousemove', drag);
        window.removeEventListener('touchmove', drag);
      };

    }, componentRoot);

    return () => ctx.revert();
  }, [images]);

  if (images.length === 0) {
    return (
      <div className="gallery-shell-empty">
        <p>No gallery images found in src/assets/gallery</p>
      </div>
    );
  }

  const displayImages = Array.from({ length: 10 });

  return (
    <section className="gallery-wrapper">
      <div className="gallery-heading">
        <h2 className="gallery-subtitle">From last year's Flagship</h2>
        
      </div>
      <div className="stage" ref={componentRoot}>
        <div className="container">
          <div className="ring" ref={ring}>
            {displayImages.map((_, i) => (
              <div key={i} className="img"></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}