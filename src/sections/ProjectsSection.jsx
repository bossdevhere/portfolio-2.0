import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '../data/projectsData';
import { useCursor } from '../context/CursorContext';
import ProjectModal from '../components/ProjectModal';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const containerRef = useRef(null);
  const projectCardsRef = useRef([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const { setHoverState, resetCursor } = useCursor();

  useEffect(() => {
    const ctx = gsap.context(() => {
      projectCardsRef.current.forEach((card, i) => {
        if (!card) return;
        
        const imgContainer = card.querySelector('.project-img-wrapper');
        const textContent = card.querySelector('.project-text-content');

        // Clip path image reveal on scroll
        if (imgContainer) {
          gsap.fromTo(
            imgContainer,
            { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', scale: 1.1 },
            {
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'top 30%',
                scrub: 0.8
              },
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
              scale: 1,
              ease: 'power3.out'
            }
          );
        }

        // Text reveal
        if (textContent) {
          gsap.fromTo(
            textContent,
            { y: 60, opacity: 0 },
            {
              scrollTrigger: {
                trigger: card,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
              },
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out'
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        id="work"
        ref={containerRef}
        className="section-padding"
        style={{
          position: 'relative',
          backgroundColor: '#0a0a0a',
          borderTop: '1px solid var(--border-subtle)'
        }}
      >
        <div className="editorial-tag">04 // SELECTED ARCHITECTURE</div>

        {/* Section Headline */}
        <div
          style={{
            display: 'flex',
            justify: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '24px',
            marginBottom: '80px'
          }}
        >
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(3rem, 9vw, 8rem)',
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase'
            }}
          >
            SELECTED <br />
            <span style={{ color: 'var(--accent)' }}>WORK</span>
          </h2>
          <span className="font-mono" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '300px' }}>
            A HANDPICKED SELECTION OF FULL STACK PLATFORMS & MOBILE PRODUCTS.
          </span>
        </div>

        {/* Projects Full-Width List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '120px' }}>
          {PROJECTS.map((proj, idx) => (
            <div
              key={proj.id}
              ref={(el) => (projectCardsRef.current[idx] = el)}
              onClick={() => setSelectedProject(proj)}
              onMouseEnter={() => setHoverState(true, 'VIEW', 'project')}
              onMouseLeave={resetCursor}
              style={{
                display: 'grid',
                gridTemplateColumns: idx % 2 === 0 ? '1.2fr 1fr' : '1fr 1.2fr',
                gap: '48px',
                alignItems: 'center',
                cursor: 'pointer'
              }}
              className="project-row"
            >
              {/* Image Preview Container */}
              <div
                className="project-img-wrapper"
                style={{
                  height: 'clamp(320px, 45vh, 520px)',
                  borderRadius: '24px',
                  background: proj.gradient,
                  border: `1px solid ${proj.color}22`,
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  order: idx % 2 === 0 ? 1 : 2,
                  transition: 'transform 0.5s var(--ease-out-expo), border-color 0.5s ease'
                }}
              >
                {/* Large Background Typography */}
                <span
                  className="font-display"
                  style={{
                    fontSize: 'clamp(5rem, 14vw, 12rem)',
                    fontWeight: 800,
                    opacity: 0.1,
                    color: '#fff',
                    userSelect: 'none'
                  }}
                >
                  {proj.number}
                </span>

                {/* Center Badge / Title Graphic */}
                <div
                  style={{
                    position: 'absolute',
                    padding: '24px 36px',
                    borderRadius: '16px',
                    background: 'rgba(10, 10, 10, 0.75)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span className="font-display" style={{ fontSize: '2rem', fontWeight: 800 }}>
                    {proj.title}
                  </span>
                  <span className="font-mono" style={{ fontSize: '0.75rem', color: proj.color }}>
                    {proj.subtitle}
                  </span>
                </div>
              </div>

              {/* Text Description Container */}
              <div
                className="project-text-content"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  order: idx % 2 === 0 ? 2 : 1
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="font-mono" style={{ fontSize: '1.25rem', fontWeight: 700, color: proj.color }}>
                    {proj.number} // {proj.year}
                  </span>
                  <ArrowUpRight size={28} color="var(--text-muted)" />
                </div>

                <h3 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, lineHeight: 1 }}>
                  {proj.title}
                </h3>

                <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {proj.description}
                </p>

                {/* Tech Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                  {proj.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono"
                      style={{
                        fontSize: '0.75rem',
                        padding: '6px 14px',
                        borderRadius: '100px',
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
            </div>
          ))}
        </div>
      </section>

      {/* Embedded Project Deep Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <style>{`
        @media (max-width: 850px) {
          .project-row {
            grid-template-columns: 1fr !important;
          }
          .project-img-wrapper {
            order: 1 !important;
          }
          .project-text-content {
            order: 2 !important;
          }
        }
      `}</style>
    </>
  );
}
