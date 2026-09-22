import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXPERIENCES } from '../data/experienceData';
import { useCursor } from '../context/CursorContext';
import { ChevronRight, Calendar, MapPin, Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);
  const [expandedId, setExpandedId] = useState('suas');
  const { setHoverState, resetCursor } = useCursor();

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { y: 50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power3.out'
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      id="experience"
      ref={containerRef}
      className="section-padding"
      style={{
        position: 'relative',
        backgroundColor: '#0a0a0a',
        borderTop: '1px solid var(--border-subtle)'
      }}
    >
      <div className="editorial-tag">02 // CAREER TIMELINE</div>

      <h2
        className="font-display"
        style={{
          fontSize: 'clamp(2.5rem, 7vw, 6rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          textTransform: 'uppercase',
          marginBottom: '60px'
        }}
      >
        WORK <span style={{ color: 'var(--accent)' }}>EXPERIENCE</span>
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {EXPERIENCES.map((exp, idx) => {
          const isExpanded = expandedId === exp.id;
          return (
            <div
              key={exp.id}
              ref={(el) => (itemsRef.current[idx] = el)}
              onClick={() => toggleExpand(exp.id)}
              onMouseEnter={() => setHoverState(true, isExpanded ? 'COLLAPSE' : 'EXPAND', 'pointer')}
              onMouseLeave={resetCursor}
              style={{
                borderRadius: '20px',
                background: isExpanded ? 'rgba(24, 24, 24, 0.9)' : 'rgba(14, 14, 14, 0.6)',
                border: isExpanded ? '1px solid var(--accent)' : '1px solid var(--border-subtle)',
                padding: '36px 32px',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: isExpanded ? '0 20px 40px rgba(0,0,0,0.4)' : 'none'
              }}
            >
              {/* Top Summary Header */}
              <div
                style={{
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <span 
                      className="font-mono" 
                      style={{ 
                        fontSize: '0.75rem', 
                        padding: '4px 12px', 
                        borderRadius: '100px', 
                        backgroundColor: exp.status === 'CURRENT ROLE' ? 'rgba(255, 59, 0, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                        color: exp.status === 'CURRENT ROLE' ? 'var(--accent)' : 'var(--text-muted)',
                        border: '1px solid var(--border-subtle)'
                      }}
                    >
                      {exp.status}
                    </span>
                    <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {exp.period}
                    </span>
                  </div>

                  <h3 className="font-display" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800 }}>
                    {exp.role}
                  </h3>
                  <div style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginTop: '4px', fontWeight: 500 }}>
                    {exp.company}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div className="font-mono" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {exp.location}
                  </div>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'center',
                      transform: isExpanded ? 'rotate(90deg)' : 'none',
                      transition: 'transform 0.3s ease, border-color 0.3s ease',
                      borderColor: isExpanded ? 'var(--accent)' : 'var(--border-subtle)'
                    }}
                  >
                    <ChevronRight size={20} color={isExpanded ? 'var(--accent)' : 'var(--text-primary)'} />
                  </div>
                </div>
              </div>

              {/* Expandable Content Panel */}
              {isExpanded && (
                <div
                  style={{
                    marginTop: '28px',
                    paddingTop: '28px',
                    borderTop: '1px solid var(--border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                  }}
                >
                  <p style={{ fontSize: '1.05rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                    {exp.description}
                  </p>

                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {exp.highlights.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                        <span style={{ color: 'var(--accent)', marginTop: '2px' }}>—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Badges */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono"
                        style={{
                          fontSize: '0.75rem',
                          padding: '6px 14px',
                          borderRadius: '6px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--text-primary)'
                        }}
                      >
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
