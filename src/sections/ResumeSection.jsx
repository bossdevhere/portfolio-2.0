import React, { useState } from 'react';
import { useCursor } from '../context/CursorContext';
import ResumeModal from '../components/ResumeModal';
import { Download, Eye, FileText } from 'lucide-react';

export default function ResumeSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setHoverState, resetCursor } = useCursor();

  const handleDirectDownload = () => {
    const resumeText = `DEVEN RAJPUT - FULL STACK DEVELOPER\nEmail: devenrajput.dev@gmail.com\nSkills: React, React Native, Flutter, Node.js, Supabase, GSAP`;
    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Deven_Rajput_Resume.txt';
    a.click();
  };

  return (
    <>
      <section
        className="section-padding"
        style={{
          position: 'relative',
          backgroundColor: '#0a0a0a',
          borderTop: '1px solid var(--border-subtle)',
          textAlign: 'center'
        }}
      >
        <div className="editorial-tag" style={{ justifyContent: 'center', marginBottom: '24px' }}>
          08 // CURRICULUM VITAE
        </div>

        <h2
          className="font-display"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            marginBottom: '40px'
          }}
        >
          WANT THE <span style={{ color: 'var(--accent)' }}>FULL STORY?</span>
        </h2>

        {/* Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setIsModalOpen(true)}
            onMouseEnter={() => setHoverState(true, 'READ', 'pointer')}
            onMouseLeave={resetCursor}
            className="magnetic-btn accent-btn"
          >
            <span>VIEW RESUME</span>
            <Eye size={18} />
          </button>

          <button
            onClick={handleDirectDownload}
            onMouseEnter={() => setHoverState(true, 'SAVE', 'pointer')}
            onMouseLeave={resetCursor}
            className="magnetic-btn"
          >
            <span>DOWNLOAD RESUME</span>
            <Download size={18} />
          </button>
        </div>
      </section>

      {/* Embedded Resume Modal */}
      <ResumeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
