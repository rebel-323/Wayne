import React, { useState, useEffect } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

interface HeroSectionProps {
  onActionClick: (action: string) => void;
  onCopySuccess: (text: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onActionClick,
  onCopySuccess,
}) => {
  const [pillsVisible, setPillsVisible] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const { displayed, done } = useTypewriter(
    'A 5-year rigorous engineering program shaping the future of power systems, robotics, microelectronics, and intelligent hardware.'
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setPillsVisible(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const copyToClipboard = (text: string, type: 'email' | 'phone', e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        if (type === 'email') {
          setCopiedEmail(true);
          setTimeout(() => setCopiedEmail(false), 2000);
        } else {
          setCopiedPhone(true);
          setTimeout(() => setCopiedPhone(false), 2000);
        }
        onCopySuccess(text);
      }).catch(() => {
        fallbackCopy(text, type);
      });
    } else {
      fallbackCopy(text, type);
    }
  };

  const fallbackCopy = (text: string, type: 'email' | 'phone') => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    try {
      document.execCommand('copy');
      if (type === 'email') {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      }
      onCopySuccess(text);
    } catch {
      // Ignore
    }
    document.body.removeChild(el);
  };

  return (
    <section className="min-h-[100dvh] w-full flex flex-col justify-between md:justify-center max-md:landscape:justify-center pt-[68px] sm:pt-24 pb-[max(1rem,env(safe-area-inset-bottom))] md:pt-24 md:pb-10 px-4 sm:px-8 md:px-10 relative z-[1]">
      {/* Desktop: single left-aligned stack | Mobile Portrait: top intro/typewriter + unobstructed center character + bottom action pills */}
      <div className="max-w-2xl w-full relative z-10 flex-1 flex flex-col justify-between max-md:landscape:justify-center md:contents">
        {/* Top Text Block (Mobile: top below navbar | Desktop: upper part of centered left column) */}
        <div className="max-w-2xl w-full md:mb-6">
          {/* 1. Blurred intro label */}
          <div
            className="pointer-events-none select-none mb-1.5 sm:mb-4 text-white text-[12px] sm:text-[20px] md:text-[24px] leading-[1.28] font-normal blur-[2px] sm:blur-[4px]"
          >
            SUMAS Faculty of Engineering &amp; Technology,
            <br />
            Department of Electrical &amp; Electronic Engineering
          </div>

          {/* 2. Typewriter text */}
          <p
            className="text-white md:mb-0 text-[14px] sm:text-[20px] md:text-[24px] leading-[1.35] font-normal min-h-[42px] sm:min-h-[54px]"
          >
            {displayed}
            {!done && (
              <span
                className="inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px] animate-blink"
                aria-hidden="true"
              />
            )}
          </p>
        </div>

        {/* Mobile Center Spacer: leaves the middle of the screen completely open for the centered 2D moving object */}
        <div className="flex-1 min-h-[190px] max-md:landscape:hidden md:hidden pointer-events-none" aria-hidden="true" />

        {/* 3. Bottom Action Pills Block */}
        <div
          className="max-w-2xl w-full flex flex-wrap gap-1.5 sm:gap-2 items-center"
          style={{
            transition: 'opacity 0.4s ease, transform 0.4s ease',
            opacity: pillsVisible ? 1 : 0,
            transform: pillsVisible ? 'translateY(0)' : 'translateY(8px)',
          }}
        >
          <button
            type="button"
            onClick={() => onActionClick('department')}
            className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[12.5px] sm:text-[15px] min-h-[36px] sm:min-h-[40px] px-3.5 sm:px-5 py-1.5 sm:py-2 whitespace-nowrap hover:bg-black hover:text-white active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            Department Overview
          </button>

          <button
            type="button"
            onClick={() => onActionClick('curriculum')}
            className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[12.5px] sm:text-[15px] min-h-[36px] sm:min-h-[40px] px-3.5 sm:px-5 py-1.5 sm:py-2 whitespace-nowrap hover:bg-black hover:text-white active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            5-Year Study Path
          </button>

          <button
            type="button"
            onClick={() => onActionClick('skills')}
            className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[12.5px] sm:text-[15px] min-h-[36px] sm:min-h-[40px] px-3.5 sm:px-5 py-1.5 sm:py-2 whitespace-nowrap hover:bg-black hover:text-white active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            Required Skills
          </button>

          <button
            type="button"
            onClick={() => onActionClick('labs')}
            className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[12.5px] sm:text-[15px] min-h-[36px] sm:min-h-[40px] px-3.5 sm:px-5 py-1.5 sm:py-2 whitespace-nowrap hover:bg-black hover:text-white active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            Laboratories &amp; Workshops
          </button>

          {/* Outline pill button: Copy Email */}
          <button
            type="button"
            onClick={(e) => copyToClipboard('michelleburston19@gmail.com', 'email', e)}
            className="inline-flex items-center justify-center text-white bg-black/45 md:bg-transparent backdrop-blur-xs border border-white rounded-full text-[12px] sm:text-[15px] min-h-[36px] sm:min-h-[40px] max-w-full px-3.5 sm:px-5 py-1.5 sm:py-2 gap-2 hover:bg-white hover:text-black active:scale-[0.98] transition-all duration-200 cursor-pointer group"
            title="Click to copy email address"
          >
            <span className="truncate">
              Mail: <span className="underline underline-offset-1">michelleburston19@gmail.com</span>
            </span>
            {copiedEmail ? (
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 text-emerald-400 group-hover:text-black"
                aria-label="Copied"
              >
                <polyline points="2.5 8.5 6 12 13.5 4.5" />
              </svg>
            ) : (
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
                aria-label="Copy email"
              >
                <rect x="5" y="5" width="9" height="9" rx="1.5" />
                <path d="M11 5V3a1.5 1.5 0 0 0-1.5-1.5H3A1.5 1.5 0 0 0 1.5 3v6.5A1.5 1.5 0 0 0 3 11h2" />
              </svg>
            )}
          </button>

          {/* Outline pill button: Direct Call on mobile / Copy Phone on desktop */}
          <a
            href="tel:+2349073588658"
            onClick={(e) => {
              if (window.innerWidth >= 768) {
                copyToClipboard('+234-9073588658', 'phone', e);
              }
            }}
            className="inline-flex items-center justify-center text-white bg-black/45 md:bg-transparent backdrop-blur-xs border border-white/85 rounded-full text-[12px] sm:text-[15px] min-h-[36px] sm:min-h-[40px] max-w-full px-3.5 sm:px-5 py-1.5 sm:py-2 whitespace-nowrap gap-2 hover:bg-white hover:text-black active:scale-[0.98] transition-all duration-200 cursor-pointer group font-mono"
            title="Tap to call or copy phone number"
          >
            <span>Tel: +234-9073588658</span>
            {copiedPhone ? (
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 text-emerald-400 group-hover:text-black"
                aria-label="Copied"
              >
                <polyline points="2.5 8.5 6 12 13.5 4.5" />
              </svg>
            ) : (
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
                aria-label="Phone"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" transform="scale(0.65) translate(-1, -1)" />
              </svg>
            )}
          </a>
        </div>
      </div>
    </section>
  );
};
