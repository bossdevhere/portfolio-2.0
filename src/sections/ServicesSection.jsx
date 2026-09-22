import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES } from '../data/servicesData';
import { useCursor } from '../context/CursorContext';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const containerRef = useRef(null);
  const serviceRowsRef = useRef([]);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const { setHoverState, resetCursor } = useCursor();

  useEffect(() => {
    const ctx = gsap.context(() => {
      serviceRowsRef.current.forEach((row, i) => {
        if (!row) return;
        gsap.fromTo(
          row,
          { opacity: 0, x: -30 },
          {
            scrollTrigger: {
              trigger: row,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            opacity: 1,
            x: 0,
            duration: 0.7,
            delay: i * 0.08,
            ease: 'power3.out'
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="section-padding"
      style={{
        position: 'relative',
        backgroundColor: '#0a0a0a',
        borderTop: '1px solid var(--border-subtle)'
      }}
    >
      <div className="editorial-tag">06 // CORE SERVICES</div>

      {/* Heading */}
      <h2
        className="font-display"
        style={{
          fontSize: 'clamp(3rem, 8vw, 7rem)',
          fontWeight: 800,
          lineHeight: 0.9,
          letterSpacing: '-0.03em',
          textTransform: 'uppercase',
          marginBottom: '60px'
        }}
      >
        WHAT <br />
        <span style={{ color: 'var(--accent)' }}>I BUILD</span>
      </h2>

      {/* Services List Rows */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {SERVICES.map((srv, idx) => {
          const isHovered = hoveredIdx === idx;
          return (
            <div
              key={srv.number}
              ref={(el) => (serviceRowsRef.current[idx] = el)}
              onMouseEnter={() => {
                setHoveredIdx(idx);
                setHoverState(true, 'DETAILS', 'pointer');
              }}
              onMouseLeave={() => {
                setHoveredIdx(null);
                resetCursor();
              }}
              style={{
                padding: '36px 0',
                borderBottom: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: isHovered ? 'var(--accent)' : 'var(--text-muted)',
                      transform: isHovered ? 'translateX(8px)' : 'none',
                      transition: 'transform 0.3s ease, color 0.3s ease'
                    }}
                  >
                    {srv.number}
                  </span>

                  <h3
                    className="font-display"
                    style={{
                      fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
                      fontWeight: 800,
                      color: isHovered ? 'var(--text-primary)' : 'var(--text-secondary)',
                      transition: 'color 0.3s ease'
                    }}
                  >
                    {srv.title}
                  </h3>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span className="font-mono" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: isHovered ? 'inline' : 'none' }}>
                    {srv.subtitle}
                  </span>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'center',
                      backgroundColor: isHovered ? 'var(--accent)' : 'transparent',
                      color: isHovered ? '#000' : 'var(--text-primary)',
                      transform: isHovered ? 'rotate(45deg)' : 'none',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </div>

              {/* Revealed Description on Hover/Active */}
              {isHovered && (
                <div style={{ paddingLeft: '64px', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {srv.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {srv.tags.map((t) => (
                      <span key={t} className="font-mono" style={{ fontSize: '0.75rem', padding: '4px 12px', borderRadius: '4px', background: 'rgba(255,59,0,0.1)', color: 'var(--accent)' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
