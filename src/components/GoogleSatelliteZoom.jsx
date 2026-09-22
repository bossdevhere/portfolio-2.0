import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Layers, Compass, MapPin } from 'lucide-react';
import InteractiveEarth3D from './InteractiveEarth3D';

gsap.registerPlugin(ScrollTrigger);

// High-resolution photo satellite layers
const SATELLITE_LAYERS = [
  {
    id: 'pc',
    title: 'DEVELOPER WORKSTATION',
    subtitle: 'PC Screen & Code Editor',
    zoom: '22z',
    scaleText: '1m',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80',
    coords: '17.3850° N, 78.4867° E'
  },
  {
    id: 'house',
    title: 'BUILDING & STREET OVERHEAD',
    subtitle: 'High-Res Satellite Roof View',
    zoom: '18z',
    scaleText: '20m',
    image: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=1600&q=80',
    coords: 'Hyderabad Urban Zone'
  },
  {
    id: 'city',
    title: 'HYDERABAD METROPOLIS',
    subtitle: 'Night City Satellite Grid',
    zoom: '12z',
    scaleText: '5km',
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1600&q=80',
    coords: 'Telangana, India'
  },
  {
    id: 'country',
    title: 'REGIONAL CONTINENTAL VIEW',
    subtitle: 'Space Satellite Regional View',
    zoom: '6z',
    scaleText: '200km',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
    coords: 'South Asia Region'
  },
  {
    id: 'earth',
    title: 'INTERACTIVE 3D PLANET EARTH',
    subtitle: 'Drag to Rotate Realtime Globe',
    zoom: '1z',
    scaleText: '5000km',
    coords: 'Deep Orbital Space',
    is3DEarth: true
  }
];

export default function GoogleSatelliteZoom() {
  const containerRef = useRef(null);
  const layerRefs = useRef([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const layers = layerRefs.current;
      if (!layers.length) return;

      const mapsTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(
              SATELLITE_LAYERS.length - 1,
              Math.floor(self.progress * SATELLITE_LAYERS.length)
            );
            setCurrentIdx(idx);
          }
        }
      });

      // Continuous photo zoom & cross-fade between satellite image layers
      for (let i = 0; i < layers.length - 1; i++) {
        const currentLayer = layers[i];
        const nextLayer = layers[i + 1];

        mapsTl
          .to(currentLayer, {
            scale: 0.15,
            opacity: 0,
            duration: 1,
            ease: 'power2.inOut'
          }, i)
          .fromTo(
            nextLayer,
            { scale: 3.5, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1, ease: 'power2.inOut' },
            i
          );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const activeMeta = SATELLITE_LAYERS[currentIdx];

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000',
        overflow: 'hidden',
        userSelect: 'none'
      }}
    >
      {/* ==========================================================
          REAL GOOGLE SATELLITE SEARCH BAR OVERLAY
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
          maxWidth: '680px'
        }}
      >
        <div
          style={{
            width: '100%',
            height: '54px',
            borderRadius: '27px',
            backgroundColor: 'rgba(10, 12, 18, 0.85)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 24px',
            gap: '14px',
            color: '#fff',
            boxShadow: '0 12px 40px rgba(0,0,0,0.6)'
          }}
        >
          <Search size={22} color="var(--accent)" />
          <span className="font-mono" style={{ fontSize: '0.85rem', color: '#fff', letterSpacing: '0.05em' }}>
            {activeMeta.title} // {activeMeta.coords}
          </span>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="pulse-indicator" />
            <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--accent-lime)' }}>
              {activeMeta.is3DEarth ? 'INTERACTIVE 3D' : 'LIVE SATELLITE'}
            </span>
          </div>
        </div>
      </div>

      {/* ==========================================================
          GOOGLE SATELLITE UI SIDEBAR CONTROLS
         ========================================================== */}
      <div
        style={{
          position: 'absolute',
          bottom: '36px',
          right: '5vw',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(10,12,18,0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <Layers size={20} color="var(--accent)" />
          </div>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(10,12,18,0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <Compass size={20} color="var(--accent-lime)" />
          </div>
        </div>

        {/* Zoom & Scale Info Indicator */}
        <div
          className="font-mono"
          style={{
            padding: '10px 18px',
            borderRadius: '10px',
            background: 'rgba(10, 12, 18, 0.9)',
            border: '1px solid var(--accent)',
            fontSize: '0.8rem',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
          }}
        >
          <span>ZOOM: {activeMeta.zoom}</span>
          <span style={{ opacity: 0.4 }}>|</span>
          <span>SCALE: {activeMeta.scaleText}</span>
        </div>
      </div>

      {/* Google Satellite Watermark logo bottom-left */}
      <div
        className="font-display"
        style={{
          position: 'absolute',
          bottom: '36px',
          left: '5vw',
          zIndex: 100,
          color: '#ffffff',
          opacity: 0.7,
          fontSize: '1.2rem',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <span>Google Satellite</span>
        <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--accent-lime)' }}>Imagery © 2026</span>
      </div>

      {/* ==========================================================
          SATELLITE PHOTO IMAGE & 3D EARTH VIEWPORT
         ========================================================== */}
      <div
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
        {SATELLITE_LAYERS.map((layer, idx) => (
          <div
            key={layer.id}
            ref={(el) => (layerRefs.current[idx] = el)}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              opacity: idx === 0 ? 1 : 0,
              transformOrigin: 'center center',
              zIndex: SATELLITE_LAYERS.length - idx
            }}
          >
            {layer.is3DEarth ? (
              /* Interactive 3D Rotating Earth Globe */
              <InteractiveEarth3D isActive={currentIdx === idx} />
            ) : (
              /* Real Satellite Photo Background */
              <>
                <img
                  src={layer.image}
                  alt={layer.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(0.7) contrast(1.1)'
                  }}
                />

                {/* Dark Gradient Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.85) 100%)'
                  }}
                />

                {/* Satellite Map Pin Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    zIndex: 10
                  }}
                >
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 59, 0, 0.25)',
                      border: '2px solid var(--accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'center',
                      boxShadow: '0 0 40px var(--accent)',
                      animation: 'pulse-glow 2s infinite ease-in-out'
                    }}
                  >
                    <MapPin size={32} color="var(--accent)" fill="var(--accent)" />
                  </div>

                  <div
                    style={{
                      padding: '12px 24px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(10, 12, 18, 0.9)',
                      backdropFilter: 'blur(16px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      textAlign: 'center',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.6)'
                    }}
                  >
                    <div className="font-display" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
                      {layer.title}
                    </div>
                    <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--accent-lime)', marginTop: '2px' }}>
                      {layer.subtitle}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
