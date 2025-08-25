import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FinalSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        scale: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 40%',
          scrub: 1,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="h-screen w-full flex justify-center items-center text-white text-center final-panel-bg relative z-20">
      <div className="max-w-2xl">
        <h2 className="text-5xl md:text-7xl font-extrabold">Ready for What's Next?</h2>
        <p className="mt-4 text-xl md:text-2xl text-blue-200">The future is built by those who dare to innovate. Join us for the next chapter.</p>
        <button className="mt-8 px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-lg text-xl font-bold transition-colors duration-300">
          Stay Updated
        </button>
      </div>
    </section>
  );
}
