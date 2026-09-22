import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCursor } from '../context/CursorContext';
import { Send, ArrowUpRight, CheckCircle2, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/Icons';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const formRef = useRef(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const { setHoverState, resetCursor } = useCursor();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { y: 60, opacity: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          },
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out'
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="section-padding"
      style={{
        position: 'relative',
        backgroundColor: '#0a0a0a',
        borderTop: '1px solid var(--border-subtle)',
        minHeight: '90vh'
      }}
    >
      <div className="editorial-tag">09 // GET IN TOUCH</div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '80px',
          alignItems: 'start'
        }}
      >
        {/* Left Column: Bold Headline & Direct Links */}
        <div>
          <h2
            ref={headlineRef}
            className="font-display"
            style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              marginBottom: '48px'
            }}
          >
            LET'S <br />
            BUILD <br />
            <span style={{ color: 'var(--accent)' }}>SOMETHING</span> <br />
            GREAT.
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <a
              href="mailto:devenrajput.dev@gmail.com"
              onMouseEnter={() => setHoverState(true, 'EMAIL', 'pointer')}
              onMouseLeave={resetCursor}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '1.2rem',
                fontWeight: 600
              }}
            >
              <Mail size={22} color="var(--accent)" />
              <span>devenrajput.dev@gmail.com</span>
              <ArrowUpRight size={20} opacity={0.6} />
            </a>

            <a
              href="https://github.com/devenrajput"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoverState(true, 'GITHUB', 'pointer')}
              onMouseLeave={resetCursor}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '1.1rem'
              }}
            >
              <GithubIcon size={22} />
              <span>github.com/devenrajput</span>
              <ArrowUpRight size={18} opacity={0.6} />
            </a>

            <a
              href="https://linkedin.com/in/devenrajput"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoverState(true, 'LINKEDIN', 'pointer')}
              onMouseLeave={resetCursor}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '1.1rem'
              }}
            >
              <LinkedinIcon size={22} />
              <span>linkedin.com/in/devenrajput</span>
              <ArrowUpRight size={18} opacity={0.6} />
            </a>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div
          ref={formRef}
          style={{
            padding: '40px',
            borderRadius: '24px',
            backgroundColor: 'rgba(18, 18, 18, 0.7)',
            border: '1px solid var(--border-subtle)'
          }}
        >
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <CheckCircle2 size={56} color="var(--accent-green)" />
              <h3 className="font-display" style={{ fontSize: '2rem', fontWeight: 800 }}>MESSAGE SENT</h3>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '400px' }}>
                Thank you for reaching out! Deven will review your inquiry and get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                  YOUR NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.3s ease'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                  YOUR EMAIL
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. sarah@company.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.3s ease'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                  PROJECT DETAILS / MESSAGE
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell me about your product, timeline, & goals..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'border-color 0.3s ease'
                  }}
                />
              </div>

              <button
                type="submit"
                onMouseEnter={() => setHoverState(true, 'SEND', 'pointer')}
                onMouseLeave={resetCursor}
                className="magnetic-btn accent-btn"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>SEND MESSAGE</span>
                <Send size={18} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
