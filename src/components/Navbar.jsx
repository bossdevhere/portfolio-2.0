import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useCursor } from '../context/CursorContext';
import MobileMenu from './MobileMenu';

const NAV_LINKS = [
  { name: 'WORK', href: '#work' },
  { name: 'ABOUT', href: '#about' },
  { name: 'EXPERIENCE', href: '#experience' },
  { name: 'TECH', href: '#tech' },
  { name: 'CONTACT', href: '#contact' },
];

export default function Navbar({ activeSection }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const { setHoverState, resetCursor } = useCursor();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 9995,
          padding: scrolled ? '16px 5vw' : '28px 5vw',
          transition: 'padding 0.4s ease, background-color 0.4s ease, backdrop-filter 0.4s ease',
          backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between'
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => scrollToSection(e, '#hero')}
          onMouseEnter={() => setHoverState(true, 'HOME', 'pointer')}
          onMouseLeave={resetCursor}
          className="font-display"
          style={{
            fontSize: '1.25rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
            textDecoration: 'none',
            letterSpacing: '-0.02em',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>DEVEN</span>
          <span style={{ color: 'var(--accent)', fontSize: '1.5rem', lineHeight: 0 }}>.</span>
        </a>

        {/* Desktop Status Indicator */}
        <div 
          className="desktop-only"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '6px 14px',
            borderRadius: '100px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <span className="pulse-indicator" />
          <span className="font-mono" style={{ fontSize: '0.7rem', letterSpacing: '0.12em', color: 'var(--accent-green)', textTransform: 'uppercase' }}>
            AVAILABLE FOR WORK
          </span>
        </div>

        {/* Desktop Links */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                onMouseEnter={() => setHoverState(true, 'GO', 'pointer')}
                onMouseLeave={resetCursor}
                className="font-mono"
                style={{
                  position: 'relative',
                  fontSize: '0.8rem',
                  letterSpacing: '0.12em',
                  color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  padding: '4px 0',
                  transition: 'color 0.3s ease'
                }}
              >
                {link.name}
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: isActive ? '100%' : '0%',
                    height: '1px',
                    backgroundColor: 'var(--accent)',
                    transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
              </a>
            );
          })}
        </nav>

        {/* Mobile Toggle Button */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          onMouseEnter={() => setHoverState(true, mobileOpen ? 'CLOSE' : 'MENU', 'pointer')}
          onMouseLeave={resetCursor}
          aria-label="Toggle Navigation Menu"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}
        >
          <span
            style={{
              width: '26px',
              height: '2px',
              backgroundColor: 'var(--text-primary)',
              display: 'block',
              transition: 'transform 0.3s ease, background-color 0.3s ease',
              transform: mobileOpen ? 'translateY(4px) rotate(45deg)' : 'none'
            }}
          />
          <span
            style={{
              width: '26px',
              height: '2px',
              backgroundColor: 'var(--text-primary)',
              display: 'block',
              transition: 'transform 0.3s ease, background-color 0.3s ease',
              transform: mobileOpen ? 'translateY(-4px) rotate(-45deg)' : 'none'
            }}
          />
        </button>
      </header>

      {/* Embedded Mobile Menu Component */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={NAV_LINKS}
        activeSection={activeSection}
      />

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav, .desktop-only {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
        }
        @media (min-width: 901px) {
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
