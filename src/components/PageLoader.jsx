import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function PageLoader({ onComplete }) {
  const containerRef = useRef(null);
  const counterRef = useRef(null);
  const textRef = useRef(null);
  const barRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        }
      });

      // Animate counter variable from 0 to 100
      const counterObj = { val: 0 };

      tl.to(counterObj, {
        val: 100,
        duration: 2.2,
        ease: 'power3.inOut',
        onUpdate: () => {
          const formatted = Math.floor(counterObj.val).toString().padStart(3, '0');
          setCount(formatted);
          if (barRef.current) {
            barRef.current.style.width = `${counterObj.val}%`;
          }
        }
      });

      // Character & title reveal
      tl.fromTo(textRef.current, 
        { y: 60, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power4.out' },
        0.2
      );

      // Exit transition: clip-path curtain lift + counter fade
      tl.to([counterRef.current, textRef.current, barRef.current], {
        y: -40,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.in',
        stagger: 0.05
      });

      tl.to(containerRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        duration: 1.1,
        ease: 'power4.inOut'
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#0a0a0a',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        justify: 'space-between',
        padding: '5vw',
        color: '#f4f4f0',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        userSelect: 'none'
      }}
    >
      {/* Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="font-mono" style={{ fontSize: '0.8rem', letterSpacing: '0.15em', opacity: 0.6 }}>
          DEVEN RAJPUT // PORTFOLIO '26
        </span>
        <span className="font-mono" style={{ fontSize: '0.8rem', letterSpacing: '0.15em', color: 'var(--accent)' }}>
          ● LOADING SYSTEM
        </span>
      </div>

      {/* Main Center Typography */}
      <div style={{ overflow: 'hidden', margin: 'auto 0' }}>
        <h1 
          ref={textRef}
          className="font-display" 
          style={{ 
            fontSize: 'clamp(2.5rem, 8vw, 7rem)', 
            fontWeight: 800, 
            lineHeight: 0.95,
            letterSpacing: '-0.03em'
          }}
        >
          CREATIVE <br />
          <span style={{ color: 'var(--accent)' }}>TECHNOLOGIST</span>
        </h1>
      </div>

      {/* Bottom Counter & Bar */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.12em', opacity: 0.5 }}>
            INITIALIZING ASSETS
          </span>
          <span 
            ref={counterRef} 
            className="font-mono" 
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1 }}
          >
            {count}
          </span>
        </div>
        <div style={{ width: '100%', height: '2px', backgroundColor: 'rgba(255, 255, 255, 0.1)', position: 'relative' }}>
          <div 
            ref={barRef} 
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              height: '100%', 
              width: '0%', 
              backgroundColor: 'var(--accent)',
              transition: 'width 0.05s linear'
            }} 
          />
        </div>
      </div>
    </div>
  );
}
