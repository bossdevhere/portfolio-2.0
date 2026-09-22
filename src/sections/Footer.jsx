import React from 'react';
import { useCursor } from '../context/CursorContext';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const { setHoverState, resetCursor } = useCursor();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: '#0a0a0a',
        borderTop: '1px solid var(--border-subtle)',
        padding: '60px 5vw 40px 5vw',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px'
      }}
    >
      <div
        style={{
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px'
        }}
      >
        <div>
          <h3 className="font-display" style={{ fontSize: '2rem', fontWeight: 800 }}>
            DEVEN RAJPUT
          </h3>
          <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
            FULL STACK DEVELOPER // CREATIVE TECHNOLOGIST
          </span>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          onMouseEnter={() => setHoverState(true, 'TOP', 'pointer')}
          onMouseLeave={resetCursor}
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '100px',
            padding: '12px 24px',
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            letterSpacing: '0.12em',
            transition: 'border-color 0.3s ease, color 0.3s ease'
          }}
        >
          <span>BACK TO TOP</span>
          <ArrowUp size={16} color="var(--accent)" />
        </button>
      </div>

      <div
        style={{
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '28px',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}
        className="font-mono"
      >
        <div>© 2026 DEVEN RAJPUT. ALL RIGHTS RESERVED.</div>

        <div style={{ display: 'flex', gap: '24px' }}>
          <a href="https://github.com/devenrajput" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
            GITHUB
          </a>
          <a href="https://linkedin.com/in/devenrajput" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
            LINKEDIN
          </a>
          <a href="mailto:devenrajput.dev@gmail.com" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
            EMAIL
          </a>
        </div>
      </div>
    </footer>
  );
}
