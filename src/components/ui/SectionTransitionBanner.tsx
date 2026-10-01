import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SectionWaypoint } from '../../types';

interface SectionTransitionBannerProps {
  waypoint: SectionWaypoint;
  sectionIndex: number;
  totalSections: number;
  onComplete?: () => void;
}

export const SectionTransitionBanner: React.FC<SectionTransitionBannerProps> = ({
  waypoint,
  sectionIndex,
  totalSections,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const formattedIndex = String(sectionIndex + 1).padStart(2, '0');

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Number appears
      tl.fromTo(
        numberRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
      )
        // 2. Line expands
        .fromTo(
          lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.4, ease: 'power3.inOut' },
          '-=0.1'
        )
        // 3. Title slides in
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
          '-=0.2'
        )
        // 4. Subtitle slides in
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
          '-=0.2'
        )
        // 5. Holds for 1.8s then fades out
        .to(containerRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.5,
          delay: 1.8,
          ease: 'power2.in',
        });
    }, containerRef);

    return () => ctx.revert();
  }, [waypoint, sectionIndex]);

  const numStr = String(sectionIndex + 1).padStart(2, '0');

  return (
    <div
      ref={containerRef}
      className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none text-center select-none"
    >
      <div ref={numberRef} className="font-orbitron font-black text-5xl md:text-7xl text-[#00ff66] tracking-widest opacity-90">
        {numStr}
      </div>

      <div
        ref={lineRef}
        className="w-48 md:w-64 h-0.5 bg-gradient-to-r from-transparent via-[#00ff66] to-transparent mx-auto my-3 origin-center"
      />

      <h2
        ref={titleRef}
        className="font-orbitron font-black text-2xl md:text-4xl text-[#F5F5F5] tracking-widest uppercase"
      >
        {waypoint.title}
      </h2>

      <p
        ref={subtitleRef}
        className="font-mono text-xs text-[#8A8A8A] tracking-[0.25em] uppercase mt-1"
      >
        {waypoint.subtitle}
      </p>
    </div>
  );
};
