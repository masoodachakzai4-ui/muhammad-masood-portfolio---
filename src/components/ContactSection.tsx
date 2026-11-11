import React, { useState } from 'react';
import {
  Linkedin,
  MessageSquare,
  Send,
  SlidersHorizontal,
  ExternalLink,
  Copy,
  Check,
  AlertCircle,
  Mail,
} from 'lucide-react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { InteractiveTiltCard, PageHeroShowcaseFrame } from './InteractiveTiltCard';

interface ContactSectionProps {
  linkedInUrl: string;
  whatsAppNumber: string;
  emailAddress: string;
  onUpdateContactConfig: (linkedin: string, whatsapp: string, email: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  linkedInUrl,
  whatsAppNumber,
  emailAddress,
  onUpdateContactConfig,
}) => {
  const [showConfigDrawer, setShowConfigDrawer] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Contact Form State
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [deliveryStatus, setDeliveryStatus] = useState<'idle' | 'sending' | 'opened_client'>('idle');

  const isLinkedInConfigured =
    linkedInUrl &&
    !linkedInUrl.includes('[INSERT') &&
    (linkedInUrl.startsWith('http://') || linkedInUrl.startsWith('https://'));

  const cleanWhatsAppDigits = whatsAppNumber.replace(/[^0-9]/g, '');
  const isWhatsAppConfigured =
    !whatsAppNumber.includes('[INSERT') && cleanWhatsAppDigits.length >= 10;

  const isEmailConfigured =
    emailAddress && !emailAddress.includes('[INSERT') && emailAddress.includes('@');

  const handleCopyEmail = () => {
    const targetEmail = isEmailConfigured ? emailAddress : PERSONAL_INFO.defaultEmail;
    navigator.clipboard.writeText(targetEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleWhatsAppDispatch = () => {
    if (!isWhatsAppConfigured) {
      setShowConfigDrawer(true);
      return;
    }
    const text = encodeURIComponent(
      `Assalam-o-Alaikum Masood, I reviewed your software & AI engineering portfolio and would like to connect.`
    );
    window.location.href = `https://wa.me/${cleanWhatsAppDigits}?text=${text}`;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!senderName.trim() || senderName.trim().length < 2) {
      setFormError('Please enter your full name.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(senderEmail.trim())) {
      setFormError('Please enter a valid email address so I can reply to you.');
      return;
    }
    if (!subject.trim() || subject.trim().length < 3) {
      setFormError('Please provide a clear subject line.');
      return;
    }
    if (!message.trim() || message.trim().length < 15) {
      setFormError('Please write a message of at least 15 characters.');
      return;
    }

    setDeliveryStatus('sending');
    const recipient = isEmailConfigured ? emailAddress.trim() : PERSONAL_INFO.defaultEmail;

    const mailtoSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject.trim()}`);
    const mailtoBody = encodeURIComponent(
      `Hello Masood,\n\n${message.trim()}\n\n---\nSender Name: ${senderName.trim()}\nSender Email: ${senderEmail.trim()}\nSent via Masood Achakzai Portfolio`
    );

    window.location.href = `mailto:${recipient}?subject=${mailtoSubject}&body=${mailtoBody}`;
    setDeliveryStatus('opened_client');
  };

  return (
    <section className="relative z-10 py-8 lg:py-12">
      <div className="max-w-[1280px] mx-auto px-6 space-y-16">
        {/* Top Hero Moment: Matches Home Page Layout with Sculpted Orbital Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-2">
              <p className="text-xs font-mono tracking-[0.2em] text-blue-600 dark:text-sky-400 uppercase font-semibold">
                PAGE 08 · DIRECT CONTACT & SOCIAL CHANNELS
              </p>
              <h1
                className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950 dark:text-white leading-[1.1] font-display"
                style={{ textWrap: 'balance' }}
              >
                Initiate a Technical{' '}
                <span className="bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
                  Conversation.
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              Connect via WhatsApp, LinkedIn, GitHub, Instagram, Facebook, or direct email for AI engineering, workflow automation, and software development collaborations.
            </p>

            <button
              type="button"
              onClick={() => setShowConfigDrawer((prev) => !prev)}
              className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white/85 dark:bg-[#070B18]/90 border border-slate-200 dark:border-blue-500/30 rounded-2xl hover:border-blue-500 transition-colors cursor-pointer whitespace-nowrap"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
              <span>
                {showConfigDrawer ? 'Hide Endpoint Settings' : 'Configure LinkedIn / WhatsApp / Email'}
              </span>
            </button>
          </motion.div>

          <div className="lg:col-span-5">
            <PageHeroShowcaseFrame
              badge="VERIFIED DIRECT INBOX"
              title="Masood Achakzai"
              subtitle={isEmailConfigured ? emailAddress : PERSONAL_INFO.defaultEmail}
              statusLeft="Quetta, Pakistan"
              statusRight="Remote Ready"
              icon={Mail}
            >
              <div className="flex items-center justify-between pt-2 border-t border-blue-500/20 text-xs font-mono">
                <a
                  href={`mailto:${isEmailConfigured ? emailAddress : PERSONAL_INFO.defaultEmail}`}
                  className="text-sky-400 hover:underline"
                >
                  Launch Email Client →
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="text-white/80 hover:text-white cursor-pointer"
                >
                  {copiedEmail ? 'Copied!' : 'Copy Address'}
                </button>
              </div>
            </PageHeroShowcaseFrame>
          </div>
        </div>

        {/* Editable Contact Endpoints Panel */}
        {showConfigDrawer && (
          <div className="p-6 rounded-3xl bg-white/95 dark:bg-[#070B18]/95 border border-blue-500/40 space-y-4">
            <p className="text-xs font-mono text-blue-600 dark:text-sky-400">
              CONFIGURE PERSONAL CONTACT PLACEHOLDERS (PERSISTED IN LOCALSTORAGE)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                  Exact LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  value={linkedInUrl}
                  onChange={(e) => onUpdateContactConfig(e.target.value, whatsAppNumber, emailAddress)}
                  placeholder="https://www.linkedin.com/in/..."
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#040711] border border-slate-300 dark:border-blue-500/30 text-slate-900 dark:text-slate-100"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                  WhatsApp Number (with Country Code, e.g. +923...)
                </label>
                <input
                  type="text"
                  value={whatsAppNumber}
                  onChange={(e) => onUpdateContactConfig(linkedInUrl, e.target.value, emailAddress)}
                  placeholder="+923001234567"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#040711] border border-slate-300 dark:border-blue-500/30 text-slate-900 dark:text-slate-100"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                  Professional Email Address
                </label>
                <input
                  type="email"
                  value={emailAddress}
                  onChange={(e) => onUpdateContactConfig(linkedInUrl, whatsAppNumber, e.target.value)}
                  placeholder="masoodachakzai4@gmail.com"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#040711] border border-slate-300 dark:border-blue-500/30 text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>
          </div>
        )}

        {/* 2-Column Split: 6 Interactive 3D-Tilt Social Boxes + Validated Email Dispatch Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. GitHub */}
            <InteractiveTiltCard delay={0.05} className="p-5">
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-full flex flex-col justify-between space-y-4"
              >
                <div className="flex items-center justify-between text-xs font-mono text-blue-600 dark:text-sky-400">
                  <span>01 · GITHUB</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-1">
                  <p className="text-base font-bold text-slate-950 dark:text-white font-display">
                    @masoodachakzai4-ui
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
                    {PERSONAL_INFO.githubUrl}
                  </p>
                </div>
              </a>
            </InteractiveTiltCard>

            {/* 2. Instagram */}
            <InteractiveTiltCard delay={0.1} className="p-5">
              <a
                href={PERSONAL_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-full flex flex-col justify-between space-y-4"
              >
                <div className="flex items-center justify-between text-xs font-mono text-blue-600 dark:text-sky-400">
                  <span>02 · INSTAGRAM</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-1">
                  <p className="text-base font-bold text-slate-950 dark:text-white font-display">
                    @masoodachakzai4
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
                    instagram.com/masoodachakzai4
                  </p>
                </div>
              </a>
            </InteractiveTiltCard>

            {/* 3. Facebook */}
            <InteractiveTiltCard delay={0.15} className="p-5">
              <a
                href={PERSONAL_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-full flex flex-col justify-between space-y-4"
              >
                <div className="flex items-center justify-between text-xs font-mono text-blue-600 dark:text-sky-400">
                  <span>03 · FACEBOOK</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-1">
                  <p className="text-base font-bold text-slate-950 dark:text-white font-display">
                    {PERSONAL_INFO.facebookDisplayName}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
                    facebook.com · Masood Achakzai
                  </p>
                </div>
              </a>
            </InteractiveTiltCard>

            {/* 4. LinkedIn */}
            <InteractiveTiltCard
              delay={0.2}
              onClick={!isLinkedInConfigured ? () => setShowConfigDrawer(true) : undefined}
              className="p-5 cursor-pointer"
            >
              {isLinkedInConfigured ? (
                <a
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-full flex flex-col justify-between space-y-4"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-blue-600 dark:text-sky-400">
                    <span>04 · LINKEDIN</span>
                    <Linkedin className="w-3.5 h-3.5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-base font-bold text-slate-950 dark:text-white font-display">
                      Masood Achakzai
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
                      {linkedInUrl}
                    </p>
                  </div>
                </a>
              ) : (
                <div className="h-full flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-blue-600 dark:text-sky-400">
                    <span>04 · LINKEDIN (SET URL)</span>
                    <Linkedin className="w-3.5 h-3.5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-950 dark:text-white font-display truncate">
                      {linkedInUrl}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Click to configure LinkedIn URL
                    </p>
                  </div>
                </div>
              )}
            </InteractiveTiltCard>

            {/* 5. WhatsApp Direct */}
            <InteractiveTiltCard
              delay={0.25}
              onClick={handleWhatsAppDispatch}
              className="p-5 cursor-pointer"
            >
              <div className="h-full flex flex-col justify-between space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-blue-600 dark:text-sky-400">
                  <span>05 · WHATSAPP DIRECT</span>
                  <MessageSquare className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-950 dark:text-white font-display truncate">
                    {isWhatsAppConfigured ? whatsAppNumber : '[INSERT WHATSAPP NUMBER]'}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isWhatsAppConfigured ? 'Open direct WhatsApp chat' : 'Click to set number'}
                  </p>
                </div>
              </div>
            </InteractiveTiltCard>

            {/* 6. Direct Email */}
            <InteractiveTiltCard delay={0.3} className="p-5">
              <div className="h-full flex flex-col justify-between space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-blue-600 dark:text-sky-400">
                  <span>06 · DIRECT EMAIL</span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1 text-xs hover:underline cursor-pointer"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="space-y-1">
                  <a
                    href={`mailto:${isEmailConfigured ? emailAddress : PERSONAL_INFO.defaultEmail}`}
                    className="block text-sm font-bold text-slate-950 dark:text-white hover:text-blue-600 dark:hover:text-sky-400 font-display truncate"
                  >
                    {emailAddress}
                  </a>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Verified Inbox
                  </p>
                </div>
              </div>
            </InteractiveTiltCard>
          </div>

          {/* Right Column: Validated Direct Email Dispatch Form */}
          <form
            onSubmit={handleFormSubmit}
            noValidate
            className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-[#070B18]/90 backdrop-blur-xl border border-slate-200 dark:border-blue-500/25 space-y-5 shadow-[0_12px_40px_rgba(0,0,0,0.18)]"
          >
            <div className="space-y-1">
              <p className="text-xs font-mono text-blue-600 dark:text-sky-400">
                DIRECT MESSAGE DISPATCH
              </p>
              <h2 className="text-xl font-bold text-slate-950 dark:text-white font-display">
                Send an Email Inquiry
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Opens your email client pre-addressed to{' '}
                <span className="font-mono text-slate-900 dark:text-white">
                  {isEmailConfigured ? emailAddress : PERSONAL_INFO.defaultEmail}
                </span>.
              </p>
            </div>

            {formError && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2.5 text-xs text-rose-600 dark:text-rose-400">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="contact-name" className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                  Your Full Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g., Bilal Ahmed"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-[#040711] border border-slate-300 dark:border-blue-500/25 text-slate-900 dark:text-slate-100 focus:outline-2 focus:outline-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-email" className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                  Your Email Address *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-[#040711] border border-slate-300 dark:border-blue-500/25 text-slate-900 dark:text-slate-100 focus:outline-2 focus:outline-blue-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="contact-subject" className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                Subject / Project Topic *
              </label>
              <input
                id="contact-subject"
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="AI Agent Architecture / Flutter App / Software Engineering Role"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-[#040711] border border-slate-300 dark:border-blue-500/25 text-slate-900 dark:text-slate-100 focus:outline-2 focus:outline-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="contact-message" className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                Message Details *
              </label>
              <textarea
                id="contact-message"
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your project, timeline, or collaboration inquiry..."
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-[#040711] border border-slate-300 dark:border-blue-500/25 text-slate-900 dark:text-slate-100 focus:outline-2 focus:outline-blue-500"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-[0_0_25px_rgba(37,99,235,0.4)]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Compose & Send via Email Client</span>
              </button>

              {deliveryStatus === 'opened_client' && (
                <p className="text-xs font-mono text-blue-600 dark:text-sky-400">
                  Mail client launched with your pre-filled message.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
