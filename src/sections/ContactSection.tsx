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
    <div className="space-y-6 text-slate-200">
      <div className="flex items-center space-x-4 border-b border-cyan-500/30 pb-4">
        <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
          <Mail className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold font-orbitron text-white tracking-wide">
            CONTACT & RESUME
          </h2>
          <p className="text-cyan-400 font-rajdhani text-lg font-medium">
            Let's Collaborate or Build Something Amazing
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Info & Socials */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold font-rajdhani text-white">Direct Channels</h3>
          
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-cyan-400" />
              <div>
                <p className="text-xs text-slate-400">Email Address</p>
                <p className="text-sm font-semibold text-white">{PERSONAL_INFO.email}</p>
              </div>
            </div>
            <button
              onClick={handleCopyEmail}
              className="p-2 bg-slate-800 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-400 rounded-lg transition-colors border border-slate-700 text-xs flex items-center space-x-1 cursor-pointer"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 rounded-xl flex items-center space-x-3 group transition-all"
            >
              <GithubIcon className="w-6 h-6 text-slate-400 group-hover:text-cyan-400 transition-colors" />
              <div>
                <p className="text-xs text-slate-400">GitHub</p>
                <p className="text-sm font-semibold text-white">@bossdevhere</p>
              </div>
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 rounded-xl flex items-center space-x-3 group transition-all"
            >
              <LinkedinIcon className="w-6 h-6 text-slate-400 group-hover:text-cyan-400 transition-colors" />
              <div>
                <p className="text-xs text-slate-400">LinkedIn</p>
                <p className="text-sm font-semibold text-white">Deven Rajput</p>
              </div>
            </a>
          </div>

          <div className="p-4 bg-gradient-to-r from-cyan-950/60 to-purple-950/60 border border-cyan-500/30 rounded-xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="w-6 h-6 text-cyan-400" />
              <div>
                <p className="text-sm font-bold text-white font-rajdhani">Official Resume PDF</p>
                <p className="text-xs text-slate-400">Download complete CV & experience history</p>
              </div>
            </div>
            <a
              href={PERSONAL_INFO.resumeUrl}
              download
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg transition-all shadow-lg shadow-cyan-500/20"
            >
              Download
            </a>
          </div>
        </div>

        {/* Interactive Quick Transmission Form */}
        <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl">
          <h3 className="text-lg font-bold font-rajdhani text-white mb-4">Send Message</h3>

          {formSubmitted ? (
            <div className="p-6 text-center space-y-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="text-lg font-bold text-white">Transmission Dispatched!</h4>
              <p className="text-xs text-slate-300">
                Thank you for reaching out. I'll respond to your email as soon as possible.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Jane Doe"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jane@company.com"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Message</label>
                <textarea
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Hi Deven, I would love to talk about..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm rounded-lg transition-all flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Transmit Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
