import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useCursor } from '../context/CursorContext';
import { ArrowUpRight } from 'lucide-react';

export default function MobileMenu({ isOpen, onClose, navLinks, activeSection }) {
  const overlayRef = useRef(null);
  const linksRef = useRef([]);
  const infoRef = useRef(null);
  const { setHoverState, resetCursor } = useCursor();

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.set(overlay, { pointerEvents: 'auto' });

      const tl = gsap.timeline();
      tl.to(overlay, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 0.7,
        ease: 'power4.inOut'
      });

      tl.fromTo(
        linksRef.current,
        { y: 60, opacity: 0, rotateX: -20 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.08
        },
        '-=0.3'
      );

      tl.fromTo(
        infoRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.2'
      );
    } else {
      document.body.style.overflow = '';
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlay, { pointerEvents: 'none' });
        }
      });

      tl.to(linksRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        stagger: 0.04
      });

      tl.to(overlay, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        duration: 0.6,
        ease: 'power4.inOut'
      }, '-=0.1');
    }
  }, [isOpen]);

  const handleLinkClick = (href) => {
    onClose();
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  };

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#0a0a0a',
        zIndex: 9990,
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        display: 'flex',
        flexDirection: 'column',
        justify: 'space-between',
        padding: '120px 8vw 60px 8vw',
        pointerEvents: 'none'
      }}
    >
      {/* Mobile Links */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {navLinks.map((link, idx) => (
          <div key={link.name} style={{ overflow: 'hidden' }}>
            <button
              ref={(el) => (linksRef.current[idx] = el)}
              onClick={() => handleLinkClick(link.href)}
              onMouseEnter={() => setHoverState(true, 'OPEN', 'pointer')}
              onMouseLeave={resetCursor}
              style={{
                background: 'none',
                border: 'none',
                color: activeSection === link.href.substring(1) ? 'var(--accent)' : 'var(--text-primary)',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                fontWeight: 800,
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                width: '100%',
                letterSpacing: '-0.02em',
                padding: '8px 0'
              }}
            >
              <span>{link.name}</span>
              <ArrowUpRight size={36} opacity={0.6} />
            </button>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div 
        ref={infoRef}
        style={{ 
          borderTop: '1px solid var(--border-subtle)', 
          paddingTop: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="pulse-indicator" />
          <span className="font-mono" style={{ fontSize: '0.8rem', letterSpacing: '0.12em', color: 'var(--accent-green)' }}>
            AVAILABLE FOR WORK '26
          </span>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          devenrajput.dev@gmail.com
        </p>
      </div>
    </div>
  );
}
