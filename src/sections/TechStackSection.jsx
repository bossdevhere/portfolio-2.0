import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TECH_CATEGORIES } from '../data/techData';
import { useCursor } from '../context/CursorContext';
import { Terminal, Cpu, Sparkles, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function TechStackSection() {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);
  const [activeTech, setActiveTech] = useState(null);
  const { setHoverState, resetCursor } = useCursor();

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: (i % 4) * 0.1,
            ease: 'power3.out'
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="tech"
      ref={containerRef}
      className="section-padding"
      style={{
        position: 'relative',
        backgroundColor: '#0a0a0a',
        borderTop: '1px solid var(--border-subtle)'
      }}
    >
      <div className="editorial-tag">05 // TECHNICAL TOOLBOX</div>

      {/* Headline */}
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
        TOOLS <br />
        I BUILD <br />
        <span style={{ color: 'var(--accent-lime)' }}>WITH</span>
      </h2>

      {/* Tech Categories Breakdown Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
        {TECH_CATEGORIES.map((cat, catIdx) => (
          <div key={cat.category} style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '40px' }}>
            <div
              style={{
                display: 'flex',
                justify: 'space-between',
                alignItems: 'center',
                marginBottom: '24px',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <h3 className="font-mono" style={{ fontSize: '1.1rem', color: 'var(--accent-lime)', letterSpacing: '0.12em' }}>
                [{cat.category}]
              </h3>
              <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {cat.description}
              </span>
            </div>

            {/* Interactive Typography Items Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
              {cat.items.map((item, itemIdx) => {
                const globalIdx = catIdx * 10 + itemIdx;
                const isHovered = activeTech?.name === item.name;
                return (
                  <div
                    key={item.name}
                    ref={(el) => (itemsRef.current[globalIdx] = el)}
                    onMouseEnter={() => {
                      setActiveTech(item);
                      setHoverState(true, item.level, 'pointer');
                    }}
                    onMouseLeave={() => {
                      setActiveTech(null);
                      resetCursor();
                    }}
                    style={{
                      padding: '20px 24px',
                      borderRadius: '12px',
                      backgroundColor: isHovered ? 'rgba(255, 59, 0, 0.08)' : 'rgba(18, 18, 18, 0.6)',
                      border: isHovered ? '1px solid var(--accent)' : '1px solid var(--border-subtle)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      justify: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700, color: isHovered ? 'var(--accent)' : 'var(--text-primary)' }}>
                        {item.name}
                      </div>
                      <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {item.desc}
                      </div>
                    </div>
                    <span
                      className="font-mono"
                      style={{
                        fontSize: '0.7rem',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {item.level}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
