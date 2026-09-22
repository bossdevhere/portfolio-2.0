import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MarqueeSection() {
  const trackRef1 = useRef(null);
  const trackRef2 = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Infinite horizontal animation
      const anim1 = gsap.to(trackRef1.current, {
        xPercent: -50,
        repeat: -1,
        duration: 20,
        ease: 'none'
      });

      const anim2 = gsap.to(trackRef2.current, {
        xPercent: 0,
        from: { xPercent: -50 },
        repeat: -1,
        duration: 22,
        ease: 'none'
      });

      // ScrollTrigger velocity acceleration
      ScrollTrigger.create({
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity());
          const timeScale = 1 + velocity / 300;
          gsap.to([anim1, anim2], { timeScale: timeScale, duration: 0.3, overwrite: true });
          gsap.to([anim1, anim2], { timeScale: 1, duration: 1.2, delay: 0.3 });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const TEXT1 = "DESIGN — DEVELOP — ANIMATE — EXPERIMENT — REACT — FLUTTER — NODE.JS — GSAP — ";
  const TEXT2 = "PWA PLATFORMS — CREATIVE CODE — MOBILE ARCHITECTURE — HIGH PERFORMANCE — ";

  return (
    <section
      style={{
        padding: '60px 0',
        backgroundColor: '#0a0a0a',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        overflow: 'hidden',
        userSelect: 'none'
      }}
    >
      {/* Track 1: Leftward infinite marquee */}
      <div style={{ display: 'flex', width: '200%', overflow: 'hidden', marginBottom: '16px' }}>
        <div ref={trackRef1} style={{ display: 'flex', whiteSpace: 'nowrap', willChange: 'transform' }}>
          <span className="font-display" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            {TEXT1}{TEXT1}
          </span>
        </div>
      </div>

      {/* Track 2: Rightward infinite marquee */}
      <div style={{ display: 'flex', width: '200%', overflow: 'hidden' }}>
        <div ref={trackRef2} style={{ display: 'flex', whiteSpace: 'nowrap', willChange: 'transform' }}>
          <span className="font-display" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 800, color: 'var(--accent)', letterSpacing: '-0.02em' }}>
            {TEXT2}{TEXT2}
          </span>
        </div>
      </div>
    </section>
  );
}
