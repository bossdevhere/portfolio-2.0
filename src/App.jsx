import React, { useState } from 'react';
import { CursorProvider } from './context/CursorContext';
import CustomCursor from './components/CustomCursor';
import PageLoader from './components/PageLoader';
import HeroSection from './sections/HeroSection';
import ExperienceSection from './sections/ExperienceSection';
import EducationSection from './sections/EducationSection';
import ProjectsSection from './sections/ProjectsSection';
import TechStackSection from './sections/TechStackSection';
import ServicesSection from './sections/ServicesSection';
import MarqueeSection from './sections/MarqueeSection';
import StatementSection from './sections/StatementSection';
import ResumeSection from './sections/ResumeSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';
import { useLenis } from './hooks/useLenis';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize Lenis smooth scroll
  useLenis();

  return (
    <CursorProvider>
      <div className="portfolio-root" style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#0a0a0a' }}>
        {/* Subtle SVG Grain Noise Overlay */}
        <div className="grain-overlay" />

        {/* Custom Follower Cursor */}
        <CustomCursor />

        {/* Cinematic Initial Splash Screen Loader */}
        {!isLoaded && (
          <PageLoader onComplete={() => setIsLoaded(true)} />
        )}

        {/* Main Pinned Laptop Zoom + About Experience */}
        <main>
          {/* Phase 1: Zoom out from Laptop Screen Hero -> Phase 2: Reveal Philosophy & Capabilities */}
          <HeroSection isLoaded={isLoaded} />

          <ExperienceSection />
          <EducationSection />
          <ProjectsSection />
          <TechStackSection />
          <ServicesSection />
          <MarqueeSection />
          <StatementSection />
          <ResumeSection />
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </CursorProvider>
  );
}
