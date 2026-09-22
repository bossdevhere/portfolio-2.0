import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, ExternalLink, CheckCircle2, ArrowRight } from 'lucide-react';
import { GithubIcon } from './Icons';
import { useCursor } from '../context/CursorContext';

export default function ProjectModal({ project, onClose }) {
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  const { resetCursor, setHoverState } = useCursor();

  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        modalRef.current,
        { opacity: 0, clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
        { opacity: 1, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 0.7, ease: 'power4.inOut' }
      );

      tl.fromTo(
        contentRef.current?.children || [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.08 },
        '-=0.3'
      );
    }, modalRef);

    return () => {
      document.body.style.overflow = '';
      ctx.revert();
    };
  }, [project]);

  if (!project) return null;

  const handleClose = () => {
    resetCursor();
    gsap.to(modalRef.current, {
      opacity: 0,
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
      duration: 0.5,
      ease: 'power4.in',
      onComplete: onClose
    });
  };

  return (
    <div
      ref={modalRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#0a0a0a',
        zIndex: 99999,
        overflowY: 'auto',
        color: '#f4f4f0',
        padding: '80px 6vw'
      }}
    >
      {/* Top Controls Bar */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          paddingBottom: '24px',
          marginBottom: '40px',
          borderBottom: '1px solid var(--border-subtle)',
          backgroundColor: 'rgba(10, 10, 10, 0.9)',
          backdropFilter: 'blur(12px)',
          zIndex: 10
        }}
      >
        <div className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--accent)', letterSpacing: '0.15em' }}>
          PROJECT DEEP DIVE // {project.number}
        </div>
        <button
          onClick={handleClose}
          onMouseEnter={() => setHoverState(true, 'CLOSE', 'pointer')}
          onMouseLeave={resetCursor}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            cursor: 'pointer',
            transition: 'border-color 0.3s ease, background 0.3s ease'
          }}
        >
          <X size={24} />
        </button>
      </div>

      {/* Modal Content */}
      <div ref={contentRef} style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '60px' }}>
        {/* Title Header */}
        <div>
          <span className="font-mono" style={{ fontSize: '1rem', color: project.color, marginBottom: '8px', display: 'block' }}>
            {project.category} — {project.year}
          </span>
          <h1 className="font-display" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.03em' }}>
            {project.title}
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginTop: '16px', maxWidth: '700px' }}>
            {project.subtitle}
          </p>
        </div>

        {/* Hero Visual Mock Graphic */}
        <div
          style={{
            width: '100%',
            height: 'clamp(280px, 45vh, 550px)',
            borderRadius: '24px',
            background: project.gradient,
            border: `1px solid ${project.color}33`,
            display: 'flex',
            flexDirection: 'column',
            justify: 'center',
            alignItems: 'center',
            padding: '40px',
            position: 'relative',
            boxShadow: `0 30px 90px ${project.color}15`
          }}
        >
          <div className="font-display" style={{ fontSize: 'clamp(4rem, 12vw, 10rem)', fontWeight: 800, opacity: 0.15, textTransform: 'uppercase' }}>
            {project.title}
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '30px',
              left: '30px',
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap'
            }}
          >
            {project.tags.map((t) => (
              <span key={t} className="font-mono" style={{ fontSize: '0.75rem', padding: '6px 14px', borderRadius: '100px', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.2)' }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {project.stats.map((s) => (
            <div key={s.label} style={{ padding: '24px', borderRadius: '16px', background: 'rgba(18, 18, 18, 0.8)', border: '1px solid var(--border-subtle)' }}>
              <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                {s.label.toUpperCase()}
              </div>
              <div className="font-display" style={{ fontSize: '1.8rem', fontWeight: 800, color: project.color }}>
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Breakdown Text */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px' }}>
          <div>
            <h3 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px' }}>
              OVERVIEW & ARCHITECTURE
            </h3>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              {project.fullDescription}
            </p>
          </div>

          <div>
            <h3 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px' }}>
              KEY DELIVERABLES
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {["Modular Component Design System", "High-concurrency API integrations", "Sub-60fps smooth animation pipeline", "Comprehensive automated unit tests"].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={18} color={project.color} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA Action Links */}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', paddingTop: '24px', borderTop: '1px solid var(--border-subtle)' }}>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoverState(true, 'LAUNCH', 'pointer')}
            onMouseLeave={resetCursor}
            className="magnetic-btn accent-btn"
          >
            <span>VISIT LIVE DEMO</span>
            <ExternalLink size={18} />
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoverState(true, 'GITHUB', 'pointer')}
            onMouseLeave={resetCursor}
            className="magnetic-btn"
          >
            <span>VIEW SOURCE CODE</span>
            <GithubIcon size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}
