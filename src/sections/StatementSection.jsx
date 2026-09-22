import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitTextElement } from '../utils/textSplitter';

gsap.registerPlugin(ScrollTrigger);

export default function StatementSection() {
  const containerRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const split1 = splitTextElement(line1Ref.current, { type: 'chars', maskLines: true });
      const split2 = splitTextElement(line2Ref.current, { type: 'chars', maskLines: true });
      const split3 = splitTextElement(line3Ref.current, { type: 'chars', maskLines: true });

      const allChars = [
        ...(split1?.chars || []),
        ...(split2?.chars || []),
        ...(split3?.chars || [])
      ];

      gsap.fromTo(
        allChars,
        { y: '100%', opacity: 0, rotate: 5 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'bottom 40%',
            scrub: 0.6
          },
          y: '0%',
          opacity: 1,
          rotate: 0,
          stagger: 0.02,
          ease: 'power3.out'
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="section-padding"
      style={{
        position: 'relative',
        minHeight: '80vh',
        backgroundColor: '#0a0a0a',
        display: 'flex',
        flexDirection: 'column',
        justify: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderTop: '1px solid var(--border-subtle)',
        overflow: 'hidden'
      }}
    >
      <div className="editorial-tag" style={{ marginBottom: '40px' }}>
        07 // CORE MANIFESTO
      </div>

      <div style={{ maxWidth: '1200px' }}>
        <h2
          className="font-display"
          style={{
            fontSize: 'clamp(2.8rem, 8.5vw, 8rem)',
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            textTransform: 'uppercase'
          }}
        >
          <div ref={line1Ref} style={{ display: 'block', color: 'var(--text-secondary)' }}>
            I DON'T JUST
          </div>
          <div ref={line2Ref} style={{ display: 'block', color: 'var(--text-primary)' }}>
            BUILD WEBSITES.
          </div>
          <div ref={line3Ref} style={{ display: 'block', color: 'var(--accent)', marginTop: '24px' }}>
            I BUILD EXPERIENCES.
          </div>
        </h2>
      </div>
    </section>
  );
}
