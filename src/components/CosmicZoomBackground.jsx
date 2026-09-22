import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CosmicZoomBackground() {
  const containerRef = useRef(null);
  const zoomStageRef = useRef(null);
  
  // Layer refs
  const layerCodeRef = useRef(null);
  const layerPCRef = useRef(null);
  const layerHouseRef = useRef(null);
  const layerEarthRef = useRef(null);
  const layerSolarRef = useRef(null);
  const layerUniverseRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stage = zoomStageRef.current;
      if (!stage) return;

      // Master scroll timeline pinned over the zoom sequence
      const zoomTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%', // 4 screens worth of scroll distance for deep zoom out
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });

      // -------------------------------------------------------------
      // STAGE ZOOM & LAYER TRANSITIONS
      // -------------------------------------------------------------

      // PHASE 1: Code -> PC Workstation
      zoomTl
        .to(layerCodeRef.current, { scale: 0.2, opacity: 0, duration: 1, ease: 'power2.inOut' }, 0)
        .fromTo(layerPCRef.current, { scale: 3, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'power2.inOut' }, 0)

      // PHASE 2: PC -> House / City Map Location
        .to(layerPCRef.current, { scale: 0.15, opacity: 0, duration: 1, ease: 'power2.inOut' }, 1)
        .fromTo(layerHouseRef.current, { scale: 3, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'power2.inOut' }, 1)

      // PHASE 3: House -> Planet Earth
        .to(layerHouseRef.current, { scale: 0.1, opacity: 0, duration: 1, ease: 'power2.inOut' }, 2)
        .fromTo(layerEarthRef.current, { scale: 3.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'power2.inOut' }, 2)

      // PHASE 4: Planet Earth -> Solar System
        .to(layerEarthRef.current, { scale: 0.08, opacity: 0, duration: 1, ease: 'power2.inOut' }, 3)
        .fromTo(layerSolarRef.current, { scale: 3, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'power2.inOut' }, 3)

      // PHASE 5: Solar System -> Deep Universe / Galaxy
        .to(layerSolarRef.current, { scale: 0.05, opacity: 0, duration: 1, ease: 'power2.inOut' }, 4)
        .fromTo(layerUniverseRef.current, { scale: 2.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'power2.inOut' }, 4);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#050508',
        overflow: 'hidden'
      }}
    >
      {/* Zoom Container Viewport */}
      <div
        ref={zoomStageRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justify: 'center'
        }}
      >

        {/* ========================================================
            LAYER 1: CODE EDITOR SCREEN (Initial view)
           ======================================================== */}
        <div
          ref={layerCodeRef}
          style={{
            position: 'absolute',
            width: '90%',
            maxWidth: '750px',
            borderRadius: '16px',
            backgroundColor: '#0c0d14',
            border: '1px solid var(--accent)',
            boxShadow: '0 0 60px rgba(255, 59, 0, 0.25)',
            padding: '24px',
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)',
            color: '#f4f4f0',
            zIndex: 10,
            transformOrigin: 'center center'
          }}
        >
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
            <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#666' }}>deven_portfolio.config.js</span>
          </div>

          <div style={{ lineHeight: 1.8 }}>
            <span style={{ color: '#ff3b00' }}>const</span> <span style={{ color: '#d1f440' }}>developer</span> = &#123;<br />
            &nbsp;&nbsp;<span style={{ color: '#00f0ff' }}>name</span>: <span style={{ color: '#ffaa00' }}>"Deven Rajput"</span>,<br />
            &nbsp;&nbsp;<span style={{ color: '#00f0ff' }}>role</span>: <span style={{ color: '#ffaa00' }}>"Full Stack Developer & Creative Technologist"</span>,<br />
            &nbsp;&nbsp;<span style={{ color: '#00f0ff' }}>location</span>: <span style={{ color: '#ffaa00' }}>"Hyderabad, IN [17.3850° N, 78.4867° E]"</span>,<br />
            &nbsp;&nbsp;<span style={{ color: '#00f0ff' }}>stack</span>: [<span style={{ color: '#ffaa00' }}>"React"</span>, <span style={{ color: '#ffaa00' }}>"GSAP"</span>, <span style={{ color: '#ffaa00' }}>"Flutter"</span>, <span style={{ color: '#ffaa00' }}>"Node.js"</span>],<br />
            &nbsp;&nbsp;<span style={{ color: '#00f0ff' }}>vision</span>: <span style={{ color: '#00ff66' }}>async () =&gt;</span> &#123;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#ff3b00' }}>await</span> <span style={{ color: '#d1f440' }}>zoomOutToUniverse</span>();<br />
            &nbsp;&nbsp;&#125;<br />
            &#125;;
          </div>
        </div>

        {/* ========================================================
            LAYER 2: DESKTOP PC / WORKSTATION
           ======================================================== */}
        <div
          ref={layerPCRef}
          style={{
            position: 'absolute',
            width: '800px',
            height: '550px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justify: 'center',
            opacity: 0,
            transformOrigin: 'center center',
            zIndex: 9
          }}
        >
          {/* Monitor Frame */}
          <div
            style={{
              width: '680px',
              height: '420px',
              borderRadius: '20px',
              border: '12px solid #1a1a24',
              backgroundColor: '#0a0b10',
              position: 'relative',
              boxShadow: '0 0 80px rgba(0,240,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              overflow: 'hidden'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--accent-lime)', letterSpacing: '0.2em', marginBottom: '8px' }}>
                WORKSTATION MATRIX // DEVEN RAJPUT
              </div>
              <div className="font-display" style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff' }}>
                CREATIVE STUDIO
              </div>
            </div>
          </div>
          {/* Stand */}
          <div style={{ width: '120px', height: '40px', backgroundColor: '#14141e', borderRadius: '4px' }} />
          <div style={{ width: '260px', height: '14px', backgroundColor: '#1a1a28', borderRadius: '8px' }} />
        </div>

        {/* ========================================================
            LAYER 3: HOUSE / CITY LOCATION GRID
           ======================================================== */}
        <div
          ref={layerHouseRef}
          style={{
            position: 'absolute',
            width: '900px',
            height: '600px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justify: 'center',
            opacity: 0,
            transformOrigin: 'center center',
            zIndex: 8
          }}
        >
          <svg width="600" height="400" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Grid overlay */}
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 59, 0, 0.15)" strokeWidth="1"/>
            </pattern>
            <rect width="600" height="400" fill="url(#grid)" />
            
            {/* House Silhouette */}
            <polygon points="300,100 180,220 420,220" fill="none" stroke="var(--accent)" strokeWidth="3" />
            <rect x="200" y="220" width="200" height="130" fill="none" stroke="var(--accent)" strokeWidth="3" />
            <rect x="270" y="280" width="60" height="70" fill="none" stroke="var(--accent-lime)" strokeWidth="2" />
            
            {/* Radar Pulse Circle */}
            <circle cx="300" cy="220" r="140" stroke="rgba(255, 59, 0, 0.4)" strokeWidth="1" strokeDasharray="6 6" />
            <circle cx="300" cy="220" r="8" fill="var(--accent)" />
          </svg>
          <div className="font-mono" style={{ fontSize: '0.9rem', color: 'var(--accent)', letterSpacing: '0.15em', marginTop: '16px' }}>
            LOCATION PIN: HYDERABAD CITY [17.3850° N, 78.4867° E]
          </div>
        </div>

        {/* ========================================================
            LAYER 4: PLANET EARTH
           ======================================================== */}
        <div
          ref={layerEarthRef}
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            opacity: 0,
            transformOrigin: 'center center',
            zIndex: 7
          }}
        >
          <div
            style={{
              width: '380px',
              height: '380px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, #00f0ff 0%, #003366 50%, #030814 100%)',
              boxShadow: '0 0 100px rgba(0, 240, 255, 0.4), inset -20px -20px 50px rgba(0,0,0,0.8)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justify: 'center'
            }}
          >
            {/* Lat/Long Grid overlay lines */}
            <svg width="380" height="380" viewBox="0 0 380 380" style={{ position: 'absolute', opacity: 0.4 }}>
              <ellipse cx="190" cy="190" rx="180" ry="60" fill="none" stroke="#ffffff" strokeWidth="1.5" />
              <ellipse cx="190" cy="190" rx="180" ry="120" fill="none" stroke="#ffffff" strokeWidth="1.5" />
              <line x1="190" y1="0" x2="190" y2="380" stroke="#ffffff" strokeWidth="1.5" />
              <line x1="0" y1="190" x2="380" y2="190" stroke="#ffffff" strokeWidth="1.5" />
            </svg>
            <span className="font-mono" style={{ fontSize: '0.8rem', color: '#fff', letterSpacing: '0.2em', textShadow: '0 0 10px #00f0ff' }}>
              PLANET EARTH
            </span>
          </div>
        </div>

        {/* ========================================================
            LAYER 5: SOLAR SYSTEM
           ======================================================== */}
        <div
          ref={layerSolarRef}
          style={{
            position: 'absolute',
            width: '800px',
            height: '800px',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            opacity: 0,
            transformOrigin: 'center center',
            zIndex: 6
          }}
        >
          <svg width="700" height="700" viewBox="0 0 700 700">
            {/* Sun in center */}
            <circle cx="350" cy="350" r="35" fill="var(--accent)" filter="drop-shadow(0 0 30px #ff3b00)" />

            {/* Orbit Lines & Planets */}
            <circle cx="350" cy="350" r="90" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <circle cx="440" cy="350" r="6" fill="#aaa" />

            <circle cx="350" cy="350" r="160" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <circle cx="350" cy="510" r="10" fill="#00f0ff" />

            <circle cx="350" cy="350" r="230" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <circle cx="180" cy="200" r="14" fill="#ffaa00" />

            <circle cx="350" cy="350" r="310" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <circle cx="660" cy="350" r="18" fill="#d1f440" />
          </svg>
          <div className="font-mono" style={{ position: 'absolute', bottom: '60px', fontSize: '0.85rem', color: 'var(--accent-lime)', letterSpacing: '0.2em' }}>
            ORBITAL SYSTEM // MILKY WAY SECTOR 004
          </div>
        </div>

        {/* ========================================================
            LAYER 6: UNIVERSE & COSMIC STARFIELD (Final Zoom Out)
           ======================================================== */}
        <div
          ref={layerUniverseRef}
          style={{
            position: 'absolute',
            width: '1000px',
            height: '1000px',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            opacity: 0,
            transformOrigin: 'center center',
            zIndex: 5
          }}
        >
          <div
            style={{
              width: '800px',
              height: '800px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,59,0,0.15) 0%, rgba(0,240,255,0.1) 40%, transparent 70%)',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              position: 'relative'
            }}
          >
            {/* Galaxy Spiral Arms Graphic */}
            <svg width="800" height="800" viewBox="0 0 800 800" style={{ position: 'absolute' }}>
              <path d="M 400 400 Q 550 200 700 400 T 400 700 T 100 400 T 400 100" fill="none" stroke="rgba(255, 59, 0, 0.4)" strokeWidth="2" />
              <path d="M 400 400 Q 250 600 100 400 T 400 100 T 700 400 T 400 700" fill="none" stroke="rgba(0, 240, 255, 0.4)" strokeWidth="2" />
            </svg>
            <div style={{ textAlign: 'center', zIndex: 2 }}>
              <div className="font-mono" style={{ fontSize: '0.9rem', color: 'var(--accent)', letterSpacing: '0.3em', marginBottom: '12px' }}>
                OBSERVABLE UNIVERSE
              </div>
              <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
                INFINITE HORIZON
              </h2>
            </div>
          </div>
        </div>

      </div>

      {/* Floating Prompt Indicator overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          pointerEvents: 'none'
        }}
      >
        <span className="font-mono" style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--accent-lime)' }}>
          SCROLL TO ZOOM OUT (CODE ➔ PC ➔ HOUSE ➔ EARTH ➔ SOLAR SYSTEM ➔ UNIVERSE)
        </span>
        <div style={{ width: '2px', height: '24px', background: 'linear-gradient(to bottom, var(--accent), transparent)' }} />
      </div>
    </div>
  );
}
