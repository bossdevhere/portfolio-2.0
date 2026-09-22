import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useCursor } from '../context/CursorContext';

export default function InteractiveEarth3D() {
  const mountRef = useRef(null);
  const { setHoverState, resetCursor } = useCursor();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 2.2;

    // 2. High-DPI WebGL Renderer with Max Sharpness
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));
    mount.appendChild(renderer.domElement);

    // 3. Ambient Light for Crystal Clear Visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);

    // 4. Deep Space Starfield Particles (3,000 Twinkling Stars)
    const starsCount = 3000;
    const starsGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 800;
      starPositions[i + 1] = (Math.random() - 0.5) * 800;
      starPositions[i + 2] = (Math.random() - 0.5) * 800;
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.2,
      transparent: true,
      opacity: 0.85
    });
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);

    // 5. Ultra-Clear High-Resolution Earth Night Texture
    const textureLoader = new THREE.TextureLoader();
    
    // Load 4K High-Contrast Earth Night Texture (used in three-globe for crystal clear city lights & continents)
    const earthNightTexture = textureLoader.load(
      'https://raw.githubusercontent.com/vasturiano/three-globe/master/example/img/earth-night.jpg',
      (texture) => {
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        texture.needsUpdate = true;
        renderer.render(scene, camera);
      }
    );

    // Earth Sphere Mesh
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const material = new THREE.MeshBasicMaterial({
      map: earthNightTexture
    });

    const earthMesh = new THREE.Mesh(geometry, material);
    scene.add(earthMesh);

    // 6. Drag & Rotate Interaction Mechanics
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      earthMesh.rotation.y += deltaX * 0.004;
      earthMesh.rotation.x += deltaY * 0.004;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support for smartphones/tablets
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      earthMesh.rotation.y += deltaX * 0.004;
      earthMesh.rotation.x += deltaY * 0.004;

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    domEl.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);

    // 7. Animation Loop (Subtle Slow Rotation)
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isDragging) {
        earthMesh.rotation.y += 0.0006;
      }

      starField.rotation.y += 0.0001;

      renderer.render(scene, camera);
    };

    animate();

    // Window Resize handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      domEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domEl.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      onMouseEnter={() => setHoverState(true, 'DRAG EARTH', 'pointer')}
      onMouseLeave={resetCursor}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justify: 'center',
        zIndex: 20
      }}
    >
      {/* Centered Canvas Container */}
      <div 
        ref={mountRef} 
        style={{ 
          width: '100vw', 
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justify: 'center'
        }} 
      />

      {/* Centered Instruction Badge */}
      <div
        className="font-mono"
        style={{
          position: 'absolute',
          bottom: '36px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '12px 28px',
          borderRadius: '100px',
          background: 'rgba(10, 12, 18, 0.9)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--accent-lime)',
          color: 'var(--accent-lime)',
          fontSize: '0.85rem',
          letterSpacing: '0.12em',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          boxShadow: '0 10px 40px rgba(0,0,0,0.8)'
        }}
      >
        <span>🖱️ CLICK & DRAG TO ROTATE 4K NIGHT-LIGHTS 3D EARTH</span>
      </div>
    </div>
  );
}
