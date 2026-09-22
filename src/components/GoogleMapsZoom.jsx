import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Layers, Compass, Plus, Minus, MapPin, Navigation } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function GoogleMapsZoom() {
  const containerRef = useRef(null);
  const mapViewportRef = useRef(null);
  
  // Maps Layer Refs
  const pcRoomRef = useRef(null);
  const streetHouseRef = useRef(null);
  const cityHyderabadRef = useRef(null);
  const countryIndiaRef = useRef(null);
  const earthGlobeRef = useRef(null);

  const [zoomLevel, setZoomLevel] = useState('22z');
  const [scaleText, setScaleText] = useState('2m');

  useEffect(() => {
    const ctx = gsap.context(() => {
      const viewport = mapViewportRef.current;
      if (!viewport) return;

      // Timeline for Google Maps style continuous zoom out
      const mapsTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=350%', // 3.5 screens of scroll distance
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            // Update Google Maps UI controls based on zoom depth
            if (p < 0.2) {
              setZoomLevel('22z (Room)');
              setScaleText('2m');
            } else if (p < 0.45) {
              setZoomLevel('17z (House/Street)');
              setScaleText('50m');
            } else if (p < 0.7) {
              setZoomLevel('11z (Hyderabad City)');
              setScaleText('10km');
            } else if (p < 0.9) {
              setZoomLevel('5z (India)');
              setScaleText('500km');
            } else {
              setZoomLevel('1z (Earth / Global)');
              setScaleText('5000km');
            }
          }
        }
      });

      // -----------------------------------------------------------
      // GOOGLE MAPS CONTINUOUS ZOOM-OUT SEQUENCE
      // -----------------------------------------------------------

      // STAGE 1: Zooming out from PC Workstation -> Street/House Plot
      mapsTl
        .to(pcRoomRef.current, { scale: 0.15, opacity: 0, duration: 1, ease: 'power2.inOut' }, 0)
        .fromTo(streetHouseRef.current, { scale: 4, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'power2.inOut' }, 0)

      // STAGE 2: Zooming out from Street/House -> Hyderabad City Map
        .to(streetHouseRef.current, { scale: 0.1, opacity: 0, duration: 1, ease: 'power2.inOut' }, 1)
        .fromTo(cityHyderabadRef.current, { scale: 3.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'power2.inOut' }, 1)

      // STAGE 3: Zooming out from Hyderabad City -> India Country Map
        .to(cityHyderabadRef.current, { scale: 0.1, opacity: 0, duration: 1, ease: 'power2.inOut' }, 2)
        .fromTo(countryIndiaRef.current, { scale: 3.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'power2.inOut' }, 2)

      // STAGE 4: Zooming out from India -> Planet Earth Globe in Space
        .to(countryIndiaRef.current, { scale: 0.08, opacity: 0, duration: 1, ease: 'power2.inOut' }, 3)
        .fromTo(earthGlobeRef.current, { scale: 3, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'power2.inOut' }, 3);

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
        backgroundColor: '#07090e',
        overflow: 'hidden',
        userSelect: 'none'
      }}
    >
      {/* ==========================================================
          GOOGLE MAPS UI OVERLAY TOP BAR
         ========================================================== */}
      <div
        style={{
          position: 'absolute',
          top: '24px',
          left: '5vw',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          width: 'calc(100% - 10vw)',
          maxWidth: '650px'
        }}
      >
        <div
          style={{
            width: '100%',
            height: '52px',
            borderRadius: '26px',
            backgroundColor: 'rgba(15, 18, 28, 0.9)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px',
            gap: '12px',
            color: '#fff',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}
        >
          <Search size={20} color="var(--accent)" />
          <span className="font-mono" style={{ fontSize: '0.85rem', color: '#fff', letterSpacing: '0.05em' }}>
            Deven Rajput HQ // Hyderabad, India [17.3850° N, 78.4867° E]
          </span>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="pulse-indicator" />
            <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--accent-lime)' }}>MAP SATELLITE</span>
          </div>
        </div>
      </div>

      {/* ==========================================================
          GOOGLE MAPS SIDEBAR CONTROLS & SCALE BAR
         ========================================================== */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          right: '5vw',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '16px'
        }}
      >
        {/* Map Layers & Compass Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(18,22,34,0.9)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <Layers size={20} color="var(--accent)" />
          </div>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(18,22,34,0.9)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <Compass size={20} color="var(--accent-lime)" />
          </div>
        </div>

        {/* Map Zoom Scale Info Box */}
        <div
          className="font-mono"
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            background: 'rgba(12, 15, 24, 0.95)',
            border: '1px solid var(--accent)',
            fontSize: '0.75rem',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <span>ZOOM: {zoomLevel}</span>
          <span style={{ opacity: 0.4 }}>|</span>
          <span>SCALE: {scaleText}</span>
        </div>
      </div>

      {/* ==========================================================
          MAP CANVAS VIEWPORT
         ========================================================== */}
      <div
        ref={mapViewportRef}
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
            MAP LEVEL 1: PC ROOM & DESK SETUP (Maximum Zoom 22z)
           ======================================================== */}
        <div
          ref={pcRoomRef}
          style={{
            position: 'absolute',
            width: '800px',
            height: '550px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justify: 'center',
            transformOrigin: 'center center',
            zIndex: 10
          }}
        >
          {/* Room / Desk Schematic View */}
          <div
            style={{
              width: '650px',
              height: '400px',
              borderRadius: '16px',
              border: '2px dashed var(--accent)',
              backgroundColor: 'rgba(15, 20, 32, 0.95)',
              boxShadow: '0 0 80px rgba(255, 59, 0, 0.3)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              padding: '24px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--accent-lime)' }}>
                📍 LEVEL 22z — DEVEN'S DEVELOPMENT DESK
              </div>
              <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                LAT: 17.3850° N | LONG: 78.4867° E
              </div>
            </div>

            {/* Code Screen inside Desk */}
            <div
              style={{
                flex: 1,
                borderRadius: '10px',
                backgroundColor: '#090b12',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '20px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                color: '#fff',
                lineHeight: 1.7
              }}
            >
              <span style={{ color: '#ff3b00' }}>const</span> <span style={{ color: '#d1f440' }}>devState</span> = &#123;<br />
              &nbsp;&nbsp;<span style={{ color: '#00f0ff' }}>developer</span>: <span style={{ color: '#ffaa00' }}>"Deven Rajput"</span>,<br />
              &nbsp;&nbsp;<span style={{ color: '#00f0ff' }}>task</span>: <span style={{ color: '#ffaa00' }}>"Building Awwwards Portfolio"</span>,<br />
              &nbsp;&nbsp;<span style={{ color: '#00f0ff' }}>action</span>: <span style={{ color: '#00ff66' }}>"SCROLL TO ZOOM OUT TO EARTH"</span><br />
              &#125;;
            </div>
          </div>

          <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={24} color="var(--accent)" />
            <span className="font-display" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>
              HYDERABAD WORKSTATION PIN
            </span>
          </div>
        </div>

        {/* ========================================================
            MAP LEVEL 2: STREET & HOUSE PLOT MAP (Zoom 17z)
           ======================================================== */}
        <div
          ref={streetHouseRef}
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
            zIndex: 9
          }}
        >
          <svg width="700" height="450" viewBox="0 0 700 450">
            {/* Dark satellite style grid roads */}
            <rect width="700" height="450" fill="#0d111a" />
            
            {/* Roads */}
            <rect x="0" y="200" width="700" height="40" fill="#1e2638" />
            <rect x="330" y="0" width="40" height="450" fill="#1e2638" />

            {/* Road Labels */}
            <text x="20" y="225" fill="#8899bb" fontSize="12" fontFamily="Space Mono">CMR COLLEGE ROAD</text>
            <text x="345" y="40" fill="#8899bb" fontSize="12" fontFamily="Space Mono" transform="rotate(90 345,40)">TECH PARK EXPRESSWAY</text>

            {/* House Plot Block */}
            <rect x="390" y="80" width="180" height="100" fill="rgba(255, 59, 0, 0.2)" stroke="var(--accent)" strokeWidth="2" />
            <text x="405" y="130" fill="#fff" fontSize="14" fontWeight="bold" fontFamily="Syne">DEVEN RAJPUT HQ</text>

            {/* Google Pin */}
            <circle cx="480" cy="130" r="30" fill="rgba(255, 59, 0, 0.3)" stroke="var(--accent)" strokeWidth="2" />
            <circle cx="480" cy="130" r="8" fill="var(--accent)" />
          </svg>
          <div className="font-mono" style={{ fontSize: '0.85rem', color: 'var(--accent-lime)', marginTop: '12px' }}>
            📍 STREET VIEW // TECH PARK SECTOR 4, HYDERABAD
          </div>
        </div>

        {/* ========================================================
            MAP LEVEL 3: HYDERABAD CITY MAP (Zoom 11z)
           ======================================================== */}
        <div
          ref={cityHyderabadRef}
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
          <svg width="700" height="500" viewBox="0 0 700 500">
            <rect width="700" height="500" fill="#090c14" />
            
            {/* City Outer Boundary Path */}
            <path d="M 150 100 Q 350 40 550 120 T 620 350 T 350 460 T 80 320 Z" fill="rgba(0, 240, 255, 0.08)" stroke="#00f0ff" strokeWidth="2" strokeDasharray="4 4" />
            
            {/* Hussain Sagar Lake outline */}
            <ellipse cx="350" cy="230" rx="45" ry="30" fill="#004488" stroke="#00f0ff" strokeWidth="1.5" />
            <text x="320" y="235" fill="#00f0ff" fontSize="10" fontFamily="Space Mono">HUSSAIN SAGAR</text>

            {/* City Highway Network Lines */}
            <path d="M 100 250 L 600 250 M 350 80 L 350 420" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
            
            {/* City Pin Marker */}
            <circle cx="380" cy="200" r="16" fill="rgba(255, 59, 0, 0.4)" stroke="var(--accent)" strokeWidth="2" />
            <circle cx="380" cy="200" r="6" fill="var(--accent)" />
            <text x="405" y="205" fill="#fff" fontSize="16" fontWeight="bold" fontFamily="Syne">HYDERABAD METRO</text>
          </svg>
          <div className="font-mono" style={{ fontSize: '0.9rem', color: '#00f0ff', marginTop: '12px' }}>
            🏙️ CITY VIEW // HYDERABAD, TELANGANA STATE
          </div>
        </div>

        {/* ========================================================
            MAP LEVEL 4: INDIA COUNTRY MAP (Zoom 5z)
           ======================================================== */}
        <div
          ref={countryIndiaRef}
          style={{
            position: 'absolute',
            width: '900px',
            height: '700px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justify: 'center',
            opacity: 0,
            transformOrigin: 'center center',
            zIndex: 7
          }}
        >
          <svg width="600" height="600" viewBox="0 0 600 600">
            {/* India Geography Outline */}
            <path
              d="M 280 80 
                 L 350 110 
                 L 400 160 
                 L 460 210 
                 L 420 280 
                 L 350 340 
                 L 300 480 
                 L 260 480 
                 L 210 330 
                 L 160 280 
                 L 140 220 
                 L 200 140 Z"
              fill="rgba(255, 59, 0, 0.12)"
              stroke="var(--accent)"
              strokeWidth="2.5"
            />
            
            {/* Hyderabad Pin inside India */}
            <circle cx="280" cy="330" r="12" fill="rgba(209, 244, 64, 0.4)" stroke="var(--accent-lime)" strokeWidth="2" />
            <circle cx="280" cy="330" r="5" fill="var(--accent-lime)" />
            <text x="300" y="335" fill="#fff" fontSize="14" fontWeight="bold" fontFamily="Syne">HYDERABAD</text>

            <text x="250" y="240" fill="var(--accent)" fontSize="28" fontWeight="800" fontFamily="Syne" letterSpacing="0.1em">
              INDIA
            </text>
          </svg>
          <div className="font-mono" style={{ fontSize: '0.95rem', color: 'var(--accent)', marginTop: '12px' }}>
            🇮🇳 COUNTRY MAP VIEW // REPUBLIC OF INDIA
          </div>
        </div>

        {/* ========================================================
            MAP LEVEL 5: PLANET EARTH GLOBE IN SPACE (Zoom 1z)
           ======================================================== */}
        <div
          ref={earthGlobeRef}
          style={{
            position: 'absolute',
            width: '800px',
            height: '800px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justify: 'center',
            opacity: 0,
            transformOrigin: 'center center',
            zIndex: 6
          }}
        >
          <div
            style={{
              width: '420px',
              height: '420px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #00f0ff 0%, #003366 50%, #020612 100%)',
              boxShadow: '0 0 120px rgba(0, 240, 255, 0.45), inset -20px -20px 60px rgba(0,0,0,0.85)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justify: 'center'
            }}
          >
            {/* Lat/Long Grid overlay */}
            <svg width="420" height="420" viewBox="0 0 420 420" style={{ position: 'absolute', opacity: 0.35 }}>
              <ellipse cx="210" cy="210" rx="200" ry="70" fill="none" stroke="#fff" strokeWidth="1.5" />
              <ellipse cx="210" cy="210" rx="200" ry="140" fill="none" stroke="#fff" strokeWidth="1.5" />
              <line x1="210" y1="0" x2="210" y2="420" stroke="#fff" strokeWidth="1.5" />
              <line x1="0" y1="210" x2="420" y2="420" stroke="#fff" strokeWidth="1.5" />
            </svg>

            <div style={{ textAlign: 'center', zIndex: 2 }}>
              <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--accent-lime)', letterSpacing: '0.2em', marginBottom: '8px' }}>
                GLOBAL CAMERA VIEW // 1z
              </div>
              <div className="font-display" style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff' }}>
                PLANET EARTH
              </div>
            </div>
          </div>
          <div className="font-mono" style={{ fontSize: '0.9rem', color: '#00f0ff', marginTop: '24px', letterSpacing: '0.15em' }}>
            EARTH ORBITAL SATELLITE VIEW // DEVEN RAJPUT GLOBAL PORTFOLIO
          </div>
        </div>

      </div>
    </div>
  );
}
