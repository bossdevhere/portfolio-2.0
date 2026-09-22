import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useCursor } from '../context/CursorContext';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const textRef = useRef(null);
  const { cursorText, isHovered, cursorType } = useCursor();

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Check if touch device
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    // Set initial position offscreen
    gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 0 });

    // GSAP quickTo setters for 120fps mouse tracking
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.25, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.25, ease: 'power3.out' });

    let isVisible = false;

    const onMouseMove = (e) => {
      if (!isVisible) {
        gsap.to(cursor, { opacity: 1, duration: 0.3 });
        isVisible = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onMouseLeave = () => {
      gsap.to(cursor, { opacity: 0, duration: 0.3 });
      isVisible = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className={`custom-cursor ${isHovered ? 'active-hover' : ''} ${cursorType ? `cursor-${cursorType}` : ''}`}
    >
      <span ref={textRef} className="cursor-text">
        {cursorText}
      </span>
    </div>
  );
}
