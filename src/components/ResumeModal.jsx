import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, Download, ExternalLink, CheckCircle, Mail, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import { useCursor } from '../context/CursorContext';

export default function ResumeModal({ isOpen, onClose }) {
  const modalRef = useRef(null);
  const { setHoverState, resetCursor } = useCursor();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' }
      );
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDownload = () => {
    // Generate a clean text file download for Deven Rajput's Resume
    const resumeText = `
====================================================
DEVEN RAJPUT — FULL STACK DEVELOPER & CREATIVE TECHNOLOGIST
Email: devenrajput.dev@gmail.com | Location: India
GitHub: https://github.com/devenrajput | Portfolio: https://devenrajput.dev
====================================================

PROFILE SUMMARY
----------------------------------------------------
Full Stack Developer & Creative Technologist with extensive expertise in React, React Native, Expo, Flutter, Node.js, and Supabase. Dedicated to building award-winning, high-performance web and mobile applications with fluid GSAP micro-interactions and editorial design aesthetics.

EXPERIENCE
----------------------------------------------------
1. Full Stack Developer — SUAS Enterprise Pvt. Ltd. (2026 — Present)
   - Architected production PWA and React Native mobile platforms using Expo and JavaScript.
   - Built high-speed Node.js microservices and Supabase real-time database workflows.
   - Optimized GSAP motion physics and performance pipelines.

2. Flutter Development Intern — Braincell Infotech Pvt. Ltd. (2025)
   - Engineered cross-platform Flutter applications with complex Dart state management.
   - Integrated RESTful APIs and optimized app load performance.

EDUCATION
----------------------------------------------------
B.Tech — Computer Science Engineering (AI & ML)
CMR Engineering College (2022 — 2026)

SKILLS & TECHNOLOGIES
----------------------------------------------------
Frontend: React, React Native, Flutter, JavaScript, HTML5/CSS3, Vite, PWA
Backend: Node.js, Express, Supabase, PostgreSQL, MongoDB, REST APIs
Motion: GSAP 3 (ScrollTrigger, Flip, Observer), Lenis Smooth Scroll, Canvas
Tools: Git, GitHub, Expo CLI, Figma
====================================================
    `;

    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Deven_Rajput_Resume.txt';
    link.click();
    URL.revokeObjectURL(url);
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
        backgroundColor: 'rgba(10, 10, 10, 0.95)',
        backdropFilter: 'blur(20px)',
        zIndex: 99999,
        display: 'flex',
        justify: 'center',
        alignItems: 'center',
        padding: '5vw'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '850px',
          maxHeight: '90vh',
          backgroundColor: '#121212',
          border: '1px solid var(--border-medium)',
          borderRadius: '24px',
          overflowY: 'auto',
          padding: '40px',
          color: '#f4f4f0',
          position: 'relative',
          boxShadow: '0 40px 100px rgba(0,0,0,0.8)'
        }}
      >
        {/* Header Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '20px' }}>
          <div>
            <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--accent-lime)', letterSpacing: '0.12em' }}>
              DOCUMENT VIEW // RESUME '26
            </span>
            <h2 className="font-display" style={{ fontSize: '2rem', fontWeight: 800 }}>
              DEVEN RAJPUT
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handleDownload}
              onMouseEnter={() => setHoverState(true, 'DOWNLOAD', 'pointer')}
              onMouseLeave={resetCursor}
              className="magnetic-btn accent-btn"
              style={{ padding: '10px 20px', fontSize: '0.75rem' }}
            >
              <span>DOWNLOAD</span>
              <Download size={14} />
            </button>

            <button
              onClick={onClose}
              onMouseEnter={() => setHoverState(true, 'CLOSE', 'pointer')}
              onMouseLeave={resetCursor}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Formatted Resume Body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Contact summary */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: '0.85rem', color: 'var(--text-secondary)' }} className="font-mono">
            <div>📍 HYDERABAD, INDIA</div>
            <div>✉️ DEVENRAJPUT.DEV@GMAIL.COM</div>
            <div>💻 GITHUB.COM/DEVENRAJPUT</div>
          </div>

          {/* Experience summary */}
          <div>
            <h3 className="font-mono" style={{ fontSize: '0.9rem', color: 'var(--accent)', letterSpacing: '0.12em', marginBottom: '16px' }}>
              [01 WORK EXPERIENCE]
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '16px' }}>
                <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Full Stack Developer — SUAS Enterprise Pvt. Ltd.</div>
                <div className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>2026 — PRESENT</div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
                  Developing React Native, Expo, and PWA applications with Supabase real-time backend microservices.
                </p>
              </div>

              <div style={{ borderLeft: '2px solid var(--border-strong)', paddingLeft: '16px' }}>
                <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Flutter Development Intern — Braincell Infotech Pvt. Ltd.</div>
                <div className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>2025</div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
                  Engineered cross-platform Flutter applications with Dart state management and REST API integrations.
                </p>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="font-mono" style={{ fontSize: '0.9rem', color: 'var(--accent-lime)', letterSpacing: '0.12em', marginBottom: '16px' }}>
              [02 EDUCATION]
            </h3>
            <div style={{ borderLeft: '2px solid var(--accent-lime)', paddingLeft: '16px' }}>
              <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>B.Tech — Computer Science Engineering (AI & ML)</div>
              <div className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>CMR Engineering College | 2022 — 2026</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
