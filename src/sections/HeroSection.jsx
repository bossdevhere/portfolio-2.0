import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCursor } from '../context/CursorContext';
import { splitTextElement } from '../utils/textSplitter';
import { ArrowDownRight, Code, Smartphone, Cpu, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({ isLoaded }) {
  const pinSectionRef = useRef(null);
  const roomBgRef = useRef(null);
  const heroWrapperRef = useRef(null);
  const heroInnerScalerRef = useRef(null);
  const marqueeTrackRef = useRef(null);
  const aboutOverlayRef = useRef(null);
  const aboutCardsRef = useRef([]);

  const titleLine1Ref = useRef(null);
  const titleLine2Ref = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const { setHoverState, resetCursor } = useCursor();

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      // 1. Initial Hero Text entrance animation
      const split1 = splitTextElement(titleLine1Ref.current, { type: 'chars', maskLines: true });
      const split2 = splitTextElement(titleLine2Ref.current, { type: 'chars', maskLines: true });

      const heroTl = gsap.timeline();

      if (split1?.chars && split2?.chars) {
        heroTl.fromTo(
          [...split1.chars, ...split2.chars],
          { y: '110%', rotate: 6, opacity: 0 },
          { y: '0%', rotate: 0, opacity: 1, duration: 1.1, ease: 'power4.out', stagger: 0.035 }
        );
      }

      heroTl.fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.7');
      heroTl.fromTo(descRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.6');
      heroTl.fromTo(ctaRef.current?.children || [], { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.15 }, '-=0.5');

      // Infinite Marquee Ticker at bottom of hero screen
      gsap.to(marqueeTrackRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 22,
        ease: 'none'
      });

      // Set scale origin for inner scaler to top left
      gsap.set(heroInnerScalerRef.current, {
        transformOrigin: 'top left'
      });

      // 2. Master Scroll Timeline: Position Shifted 10px Right + Zero Black Clipping
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: pinSectionRef.current,
          start: 'top top',
          end: '+=320%',
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });

      // Phase 1: Room background 3D parallax zoom out
      masterTl.fromTo(
        roomBgRef.current,
        { scale: 1.05 },
        { scale: 1.0, duration: 2, ease: 'power2.inOut' },
        0
      );

      // Morph outer wrapper to exact laptop screen box (shifted ~10px right)
      masterTl.to(
        heroWrapperRef.current,
        {
          left: '61.8%',
          top: '34.6%',
          width: '13.8%',
          height: '14.6%',
          borderRadius: '4px',
          boxShadow: '0 0 30px rgba(0,0,0,0.98), inset 0 0 10px rgba(0,0,0,0.9)',
          duration: 2,
          ease: 'power2.inOut'
        },
        0
      );

      // Scale inner hero UI smoothly synchronized with wrapper bounds
      masterTl.to(
        heroInnerScalerRef.current,
        {
          scale: 0.138,
          duration: 2,
          ease: 'power2.inOut'
        },
        0
      );

      // Phase 2: Fade in & slide up Philosophy & Capabilities content over room wall space
      masterTl.fromTo(
        aboutOverlayRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' },
        '-=0.5'
      );

      // Animate capability cards
      if (aboutCardsRef.current.length > 0) {
        masterTl.fromTo(
          aboutCardsRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: 'power3.out' },
          '-=0.8'
        );
      }

      return () => {
        if (split1?.revert) split1.revert();
        if (split2?.revert) split2.revert();
      };
    }, pinSectionRef);

    return () => ctx.revert();
  }, [isLoaded]);

  const scrollToWork = () => {
    const target = document.querySelector('#work');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const target = document.querySelector('#contact');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  const MARQUEE_TEXT = 'A DEVELOPER WHO CARES ABOUT HOW THINGS FEEL. — ';

  const SPECIALTIES = [
    {
      icon: <Code size={20} color="var(--accent)" />,
      title: "Frontend Engineering",
      desc: "Responsive React & web platforms with modular component systems & Vite builds."
    },
    {
      icon: <Smartphone size={20} color="var(--accent-lime)" />,
      title: "Mobile Architecture",
      desc: "Cross-platform iOS/Android apps with React Native & Flutter. 60fps animations."
    },
    {
      icon: <Cpu size={20} color="var(--accent-green)" />,
      title: "Full-Stack & APIs",
      desc: "Node.js backends, Supabase real-time databases & scalable Cloud integrations."
    },
    {
      icon: <Sparkles size={20} color="var(--accent)" />,
      title: "Motion & Creative Tech",
      desc: "High-end GSAP timelines, ScrollTrigger pinning, FLIP morphs & WebGL UI."
    }
  ];

  return (
    <div ref={pinSectionRef} style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative', backgroundColor: '#050505' }}>
      {/* Room Setup Background Image (Always ready behind Hero) */}
      <div
        ref={roomBgRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundImage: 'url(/desk_setup.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 1,
          willChange: 'transform'
        }}
      />

      {/* Hero Page Outer Wrapper Container (Morphs to exact Red Box coordinates + 10px right) */}
      <div
        ref={heroWrapperRef}
        style={{
          position: 'absolute',
          top: '0%',
          left: '0%',
          width: '100%',
          height: '100%',
          backgroundColor: '#0a0a0a',
          borderRadius: '0px',
          overflow: 'hidden',
          zIndex: 5,
          willChange: 'left, top, width, height, borderRadius',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Proportional Inner Scaler (Unclipped, perfect text visibility) */}
        <div
          ref={heroInnerScalerRef}
          style={{
            width: '100vw',
            height: '100vh',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justify: 'space-between',
            padding: '36px 5vw 0 5vw',
            background: 'radial-gradient(circle at 80% 20%, #1c0d08 0%, #0a0a0a 70%)',
            willChange: 'transform'
          }}
        >
          {/* Top Metadata */}
          <div 
            ref={subtitleRef} 
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}
          >
            <div className="editorial-tag">
              FULL STACK DEVELOPER // CREATIVE TECHNOLOGIST
            </div>
            <div 
              className="font-mono"
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                color: 'var(--text-muted)',
                textAlign: 'right'
              }}
            >
              HYDERABAD, IN [17.3850° N, 78.4867° E]
            </div>
          </div>

          {/* Massive Editorial Typography */}
          <div style={{ margin: 'auto 0', position: 'relative', zIndex: 2 }}>
            <h1 
              className="font-display"
              style={{
                fontSize: 'clamp(3.8rem, 13.5vw, 12.5rem)',
                fontWeight: 800,
                lineHeight: 0.88,
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
                wordBreak: 'break-word'
              }}
            >
              <div ref={titleLine1Ref} style={{ display: 'block' }}>
                DEVEN
              </div>
              <div ref={titleLine2Ref} style={{ display: 'block', color: 'var(--accent)' }}>
                RAJPUT
              </div>
            </h1>
          </div>

          {/* Intro Description & CTAs */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '32px',
              alignItems: 'flex-end',
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '24px',
              paddingBottom: '24px'
            }}
          >
            <p
              ref={descRef}
              style={{
                fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
                color: 'var(--text-secondary)',
                maxWidth: '520px',
                lineHeight: 1.6,
                fontWeight: 400
              }}
            >
              I build interactive digital experiences, modern applications and scalable products that seamlessly blend robust technology with editorial design.
            </p>

            <div ref={ctaRef} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button
                onClick={scrollToWork}
                onMouseEnter={() => setHoverState(true, 'VIEW', 'pointer')}
                onMouseLeave={resetCursor}
                className="magnetic-btn accent-btn"
              >
                <span>VIEW SELECTED WORK</span>
                <ArrowDownRight size={18} />
              </button>
              
              <button
                onClick={scrollToContact}
                onMouseEnter={() => setHoverState(true, 'TALK', 'pointer')}
                onMouseLeave={resetCursor}
                className="magnetic-btn"
              >
                <span>CONTACT ME</span>
              </button>
            </div>
          </div>

          {/* Infinite Rotating Marquee Ticker at the Bottom of Hero Screen */}
          <div
            style={{
              width: '200%',
              overflow: 'hidden',
              borderTop: '1px solid var(--border-subtle)',
              padding: '16px 0',
              marginLeft: '-5vw',
              marginRight: '-5vw',
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
              <div
                className="font-display"
                style={{
                  fontSize: 'clamp(1.5rem, 3.5vw, 3.2rem)',
                  fontWeight: 800,
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                  display: 'inline-block'
                }}
              >
                <span style={{ color: 'var(--text-primary)' }}>{MARQUEE_TEXT}</span>
                <span style={{ color: 'var(--accent)' }}>{MARQUEE_TEXT}</span>
                <span style={{ color: 'var(--text-primary)' }}>{MARQUEE_TEXT}</span>
                <span style={{ color: 'var(--accent)' }}>{MARQUEE_TEXT}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Screen Gloss Reflection Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 60%)'
          }}
        />
      </div>

      {/* Phase 2: About / Philosophy & Capabilities Content Overlay */}
      <div
        ref={aboutOverlayRef}
        style={{
          position: 'absolute',
          top: '8%',
          left: '6vw',
          width: '46vw',
          maxWidth: '580px',
          zIndex: 10,
          opacity: 0,
          pointerEvents: 'auto',
          background: 'rgba(10, 12, 18, 0.82)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '24px',
          padding: '32px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.6)'
        }}
      >
        <div className="editorial-tag" style={{ color: 'var(--accent-lime)', marginBottom: '16px' }}>
          01 // PHILOSOPHY & CAPABILITIES
        </div>

        <h2
          className="font-display"
          style={{
            fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '16px',
            color: 'var(--text-primary)'
          }}
        >
          A DEVELOPER WHO CARES ABOUT HOW THINGS FEEL.
        </h2>

        <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '24px' }}>
          I bridge the gap between creative visual design and robust software engineering, building high-performance web & mobile platforms that evoke emotion.
        </p>

        {/* 4 Specialty Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          {SPECIALTIES.map((spec, i) => (
            <div
              key={spec.title}
              ref={(el) => (aboutCardsRef.current[i] = el)}
              onMouseEnter={() => setHoverState(true, 'DETAILS', 'pointer')}
              onMouseLeave={resetCursor}
              style={{
                padding: '16px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div>{spec.icon}</div>
              <div className="font-display" style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>
                {spec.title}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                {spec.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
