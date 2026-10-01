import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolio';
import { Mail, Send, FileText, CheckCircle2, Copy } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/ui/Icons';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="space-y-6 text-[#F5F5F5]">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <span className="font-mono text-xs text-[#00ff66] tracking-[0.2em] uppercase">
            SECTION 06 / 07 — COMMUNICATIONS
          </span>
          <h2 className="text-2xl font-bold font-orbitron text-[#F5F5F5] uppercase tracking-wider mt-1">
            CONTACT
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
        {/* Contact Info & Socials */}
        <div className="space-y-4">
          <span className="text-[#00ff66] font-bold block uppercase">// DIRECT CHANNELS</span>

          <div className="hud-panel p-4 rounded-xl border border-white/10 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#8A8A8A]">EMAIL ADDRESS</p>
              <p className="text-sm font-bold text-[#F5F5F5] mt-0.5">{PERSONAL_INFO.email}</p>
            </div>
            <button
              onClick={handleCopyEmail}
              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-[#00ff66] rounded border border-white/10 transition-colors flex items-center space-x-1 cursor-pointer"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff66]" />
                  <span>COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>COPY</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hud-panel p-4 rounded-xl border border-white/10 hover:border-[#00ff66]/40 flex items-center space-x-3 group transition-all"
            >
              <GithubIcon className="w-5 h-5 text-[#8A8A8A] group-hover:text-[#00ff66] transition-colors" />
              <div>
                <p className="text-[10px] text-[#8A8A8A]">GITHUB</p>
                <p className="text-xs font-bold text-[#F5F5F5]">@bossdevhere</p>
              </div>
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hud-panel p-4 rounded-xl border border-white/10 hover:border-[#00ff66]/40 flex items-center space-x-3 group transition-all"
            >
              <LinkedinIcon className="w-5 h-5 text-[#8A8A8A] group-hover:text-[#00ff66] transition-colors" />
              <div>
                <p className="text-[10px] text-[#8A8A8A]">LINKEDIN</p>
                <p className="text-xs font-bold text-[#F5F5F5]">Deven Rajput</p>
              </div>
            </a>
          </div>

          <div className="hud-panel p-4 rounded-xl border border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5 text-[#00ff66]" />
              <div>
                <p className="text-xs font-bold text-[#F5F5F5]">OFFICIAL RESUME PDF</p>
                <p className="text-[10px] text-[#8A8A8A]">Download full CV</p>
              </div>
            </div>
            <a
              href={PERSONAL_INFO.resumeUrl}
              download
              className="px-4 py-2 bg-[#00ff66] text-[#050505] font-bold rounded text-xs hover:bg-[#00ff66]/90 transition-all"
            >
              DOWNLOAD
            </a>
          </div>
        </div>

        {/* Transmission Form */}
        <div className="hud-panel p-5 rounded-xl border border-white/10">
          <span className="text-[#00ff66] font-bold block uppercase mb-4">// TRANSMIT MESSAGE</span>

          {formSubmitted ? (
            <div className="p-6 text-center space-y-2 bg-[#00ff66]/10 border border-[#00ff66]/30 rounded-lg">
              <CheckCircle2 className="w-8 h-8 text-[#00ff66] mx-auto" />
              <h4 className="text-sm font-bold text-[#F5F5F5]">TRANSMISSION DISPATCHED</h4>
              <p className="text-[11px] text-[#8A8A8A]">
                Thank you for reaching out. I'll respond as soon as possible.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[10px] text-[#8A8A8A] mb-1">NAME</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Jane Doe"
                  className="w-full px-3 py-2 bg-[#050505] border border-white/10 rounded text-xs text-[#F5F5F5] focus:outline-none focus:border-[#00ff66]"
                />
              </div>

              <div>
                <label className="block text-[10px] text-[#8A8A8A] mb-1">EMAIL</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jane@company.com"
                  className="w-full px-3 py-2 bg-[#050505] border border-white/10 rounded text-xs text-[#F5F5F5] focus:outline-none focus:border-[#00ff66]"
                />
              </div>

              <div>
                <label className="block text-[10px] text-[#8A8A8A] mb-1">MESSAGE</label>
                <textarea
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Hi Deven..."
                  className="w-full px-3 py-2 bg-[#050505] border border-white/10 rounded text-xs text-[#F5F5F5] focus:outline-none focus:border-[#00ff66]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#00ff66] text-[#050505] font-bold text-xs rounded hover:bg-[#00ff66]/90 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>SEND TRANSMISSION</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
