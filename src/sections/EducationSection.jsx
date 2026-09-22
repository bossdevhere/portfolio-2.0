import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EDUCATION } from '../data/experienceData';
import { GraduationCap, Award, BookOpen, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function EducationSection() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const nodesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate central timeline line height on scroll
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'bottom 50%',
            scrub: 0.5
          },
          scaleY: 1,
          transformOrigin: 'top center',
          ease: 'none'
        }
      );

      // Stagger node reveals
      nodesRef.current.forEach((node, i) => {
        if (!node) return;
        gsap.fromTo(
          node,
          { opacity: 0, y: 40, scale: 0.9 },
          {
            scrollTrigger: {
              trigger: node,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power3.out'
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const STEPS = [
    { year: "2022", title: "ADMISSION & FOUNDATION", desc: "Enrolled in Computer Science Engineering at CMR Engineering College." },
    { year: "2023", title: "SPECIALIZATION: AI & ML", desc: "Core focus on Artificial Intelligence algorithms, Neural Networks, & Machine Learning models." },
    { year: "2024", title: "FULL STACK & CREATIVE CODE", desc: "Expanded domain expertise to modern web engineering, React Native, & high-level motion graphics." },
    { year: "2026", title: "GRADUATION & B.TECH DEGREE", desc: "Graduating with B.Tech CSE (AI & ML) degree with top technical honors." }
  ];

  return (
    <section
      ref={containerRef}
      className="section-padding"
      style={{
        position: 'relative',
        backgroundColor: '#0a0a0a',
        borderTop: '1px solid var(--border-subtle)'
      }}
    >
      <div className="editorial-tag">03 // ACADEMIC JOURNEY</div>

      <h2
        className="font-display"
        style={{
          fontSize: 'clamp(2.5rem, 6.5vw, 5.5rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          textTransform: 'uppercase',
          marginBottom: '20px'
        }}
      >
        EDUCATION & <span style={{ color: 'var(--accent-lime)' }}>HONORS</span>
      </h2>

      {/* Main Degree Callout Banner */}
      <div
        style={{
          padding: '36px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, rgba(24, 24, 24, 0.9) 0%, rgba(18, 18, 18, 0.9) 100%)',
          border: '1px solid var(--border-medium)',
          marginBottom: '80px',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px'
        }}
      >
        <div>
          <div className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--accent-lime)', marginBottom: '8px', letterSpacing: '0.12em' }}>
            CMR ENGINEERING COLLEGE // 2022 — 2026
          </div>
          <h3 className="font-display" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)', fontWeight: 800 }}>
            {EDUCATION.degree}
          </h3>
          <p style={{ fontSize: '1.1rem', color: 'var(--accent)', marginTop: '4px', fontWeight: 600 }}>
            Specialization: {EDUCATION.specialization}
          </p>
        </div>
        <div 
          className="font-mono" 
          style={{ 
            fontSize: '1rem', 
            padding: '12px 24px', 
            borderRadius: '100px', 
            background: 'rgba(209, 244, 64, 0.1)', 
            border: '1px solid var(--accent-lime)',
            color: 'var(--accent-lime)'
          }}
        >
          4-YEAR DEGREE
        </div>
      </div>

      {/* Vertical Interactive Journey Timeline */}
      <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto', padding: '20px 0' }}>
        {/* Animated Central Vertical Line */}
        <div
          ref={lineRef}
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'linear-gradient(to bottom, var(--accent), var(--accent-lime))',
            transform: 'translateX(-50%)',
            zIndex: 1
          }}
        />

        {STEPS.map((step, i) => {
          const isEven = i % 2 === 0;
          return (
            <div
              key={step.year}
              ref={(el) => (nodesRef.current[i] = el)}
              style={{
                display: 'flex',
                justify: isEven ? 'flex-start' : 'flex-end',
                position: 'relative',
                marginBottom: '60px',
                zIndex: 2
              }}
            >
              {/* Timeline Center Node Badge */}
              <div
                className="font-mono"
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '0',
                  transform: 'translateX(-50%)',
                  padding: '6px 16px',
                  borderRadius: '100px',
                  backgroundColor: '#0a0a0a',
                  border: '1px solid var(--accent)',
                  color: 'var(--text-primary)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  boxShadow: '0 0 16px rgba(255, 59, 0, 0.3)'
                }}
              >
                {step.year}
              </div>

              {/* Step Card Content */}
              <div
                style={{
                  width: 'calc(50% - 40px)',
                  padding: '24px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(18, 18, 18, 0.8)',
                  border: '1px solid var(--border-subtle)',
                  marginTop: '20px',
                  textAlign: isEven ? 'right' : 'left'
                }}
              >
                <h4 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>
                  {step.title}
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
