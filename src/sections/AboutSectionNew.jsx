import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCursor } from '../context/CursorContext';
import { Code, Smartphone, Cpu, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const containerRef = useRef(null);
  const marqueeTrackRef = useRef(null);
  const bodyRef = useRef(null);
  const cardsRef = useRef([]);
  const { setHoverState, resetCursor } = useCursor();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Infinite single-line marquee ticker scrolling right to left slowly
      gsap.to(marqueeTrackRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 24,
        ease: 'none'
      });

      // Body text reveal
      gsap.fromTo(
        bodyRef.current,
        { y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: bodyRef.current,
            start: 'top 80%',
            end: 'top 60%',
            scrub: 0.5
          },
          y: 0,
          opacity: 1,
          ease: 'power2.out'
        }
      );

      // Staggered Cards Reveal
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 80 + i * 20, opacity: 0, scale: 0.95 },
          {
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            },
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out'
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const SPECIALTIES = [
    {
      icon: <Code size={24} color="var(--accent)" />,
      title: "Frontend Engineering",
      desc: "Architecting responsive React & web platforms with modular component architectures, CSS design systems, & ultra-speed Vite builds."
    },
    {
      icon: <Smartphone size={24} color="var(--accent-lime)" />,
      title: "Mobile Architecture",
      desc: "Crafting cross-platform iOS/Android apps with React Native & Flutter. Native feel, offline sync, & smooth 60fps gesture animations."
    },
    {
      icon: <Cpu size={24} color="var(--accent-green)" />,
      title: "Full-Stack & APIs",
      desc: "Designing secure Node.js backends, Supabase real-time databases, RESTful endpoints, & scalable Cloud integrations."
    },
    {
      icon: <Sparkles size={24} color="var(--accent)" />,
      title: "Motion & Creative Tech",
      desc: "Engineering high-end GSAP timelines, ScrollTrigger pinning, FLIP layout morphs, & WebGL canvas micro-interactions."
    }
  ];

  const MARQUEE_TEXT = "A DEVELOPER WHO CARES ABOUT HOW THINGS FEEL. — ";

  return (
    <section
      id="about"
      ref={containerRef}
      className="section-padding"
      style={{
        position: 'relative',
        backgroundColor: '#0a0a0a',
        borderTop: '1px solid var(--border-subtle)',
        overflow: 'hidden'
      }}
    >
      <div className="editorial-tag">01 // PHILOSOPHY & CAPABILITIES</div>

      {/* Infinite Single Line Rotating Marquee Headline (Right to Left Slowly) */}
      <div
        style={{
          width: '200%',
          overflow: 'hidden',
          marginBottom: '60px',
          padding: '20px 0',
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
          userSelect: 'none'
        }}
      >
        <div
          ref={marqueeTrackRef}
          style={{
            display: 'flex',
            whiteSpace: 'nowrap',
            willChange: 'transform'
          }}
        >
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2.5rem, 6.5vw, 6rem)',
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              display: 'inline-block'
            }}
          >
            <span style={{ color: 'var(--text-primary)' }}>{MARQUEE_TEXT}</span>
            <span style={{ color: 'var(--accent)' }}>{MARQUEE_TEXT}</span>
            <span style={{ color: 'var(--text-primary)' }}>{MARQUEE_TEXT}</span>
            <span style={{ color: 'var(--accent)' }}>{MARQUEE_TEXT}</span>
          </h2>
        </div>
      </div>

      {/* Grid Layout: Bio Text & Capabilities */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '60px',
          alignItems: 'start'
        }}
      >
        {/* Bio Text Column */}
        <div ref={bodyRef} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <p style={{ fontSize: '1.2rem', lineHeight: 1.7, color: 'var(--text-primary)', fontWeight: 400 }}>
            Hi, I’m <strong>Deven Rajput</strong> — a Full Stack Developer and Creative Technologist based in India. I bridge the gap between creative visual design and robust software engineering.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
            I don’t just write code that works; I craft digital experiences that resonate. From complex multi-platform React Native and Flutter applications to award-grade GSAP animated web interfaces, every line of code is structured for performance, scale, and emotional impact.
          </p>

          <div
            style={{
              padding: '24px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-subtle)',
              marginTop: '12px'
            }}
          >
            <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--accent-lime)', marginBottom: '8px' }}>
              CURRENT FOCUS
            </div>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
              Full Stack Development at SUAS Enterprise, building PWA platforms, real-time Supabase services, & experimental motion UI.
            </p>
          </div>
        </div>

        {/* 4 Specialty Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          {SPECIALTIES.map((spec, i) => (
            <div
              key={spec.title}
              ref={(el) => (cardsRef.current[i] = el)}
              onMouseEnter={() => setHoverState(true, 'DETAILS', 'pointer')}
              onMouseLeave={resetCursor}
              style={{
                padding: '28px 24px',
                borderRadius: '16px',
                background: 'rgba(18, 18, 18, 0.7)',
                border: '1px solid var(--border-subtle)',
                transition: 'border-color 0.4s ease, transform 0.4s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
            >
              <div>{spec.icon}</div>
              <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                {spec.title}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {spec.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
