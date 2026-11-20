import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onSelectNav: (destination: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectNav }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (destination: string) => {
    setMobileMenuOpen(false);
    onSelectNav(destination);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-20 w-full px-4 sm:px-8 pt-[max(1rem,env(safe-area-inset-top))] pb-3 sm:py-5 flex flex-row justify-between items-center gap-3"
      >
        {/* Logo (left) */}
        <button
          type="button"
          className="flex flex-row items-center cursor-pointer group shrink min-w-0 bg-transparent border-0 p-0 focus-visible:outline-2 focus-visible:outline-white rounded-lg"
          onClick={() => handleNavClick('department')}
          title="State University of Medical and Applied Sciences (SUMAS)"
          aria-label="SUMAS — Department of Electrical and Electronic Engineering"
        >
          <img
            src="/sumas-logo.png?v=2"
            alt="SUMAS — State University of Medical and Applied Sciences"
            className="h-8 sm:h-11 max-w-[215px] sm:max-w-none w-auto object-contain block select-none drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)] group-hover:opacity-85 transition-opacity"
          />
        </button>

        {/* Desktop nav links (center, hidden below md) */}
        <nav
          className="hidden md:flex flex-row items-center text-[16px] lg:text-[21px] text-white whitespace-nowrap"
          aria-label="Department Navigation"
        >
          <a
            href="#department"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('department');
            }}
            className="hover:opacity-60 transition-opacity whitespace-nowrap"
          >
            Department
          </a>
          <span className="select-none">,&nbsp;</span>
          <a
            href="#curriculum"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('curriculum');
            }}
            className="hover:opacity-60 transition-opacity whitespace-nowrap"
          >
            5-Year Path
          </a>
          <span className="select-none">,&nbsp;</span>
          <a
            href="#skills"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('skills');
            }}
            className="hover:opacity-60 transition-opacity whitespace-nowrap"
          >
            Core Skills
          </a>
          <span className="select-none">,&nbsp;</span>
          <a
            href="#labs"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('labs');
            }}
            className="hover:opacity-60 transition-opacity whitespace-nowrap"
          >
            Laboratories
          </a>
        </nav>

        {/* Desktop CTA (right, hidden below md) */}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('contact');
          }}
          className="hidden md:block text-[16px] lg:text-[21px] text-white underline underline-offset-2 hover:opacity-60 transition-opacity cursor-pointer whitespace-nowrap shrink-0"
        >
          Contact Department
        </a>

        {/* Mobile hamburger (visible below md, >= 44x44px touch target) */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="md:hidden flex flex-col justify-center items-center min-w-[44px] min-h-[44px] -mr-2 cursor-pointer z-30 focus-visible:outline-2 focus-visible:outline-white rounded-lg shrink-0"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
        >
          <div className="flex flex-col gap-[5px]">
            <span
              className={`w-6 h-[2px] bg-white block transition-all duration-300 origin-center ${
                mobileMenuOpen ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-white block transition-all duration-300 ${
                mobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-white block transition-all duration-300 origin-center ${
                mobileMenuOpen ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </div>
        </button>
      </header>

      {/* Mobile overlay (z-index: 15, scrollable for small & landscape phones) */}
      <div
        className={`fixed inset-0 z-[15] bg-black/90 backdrop-blur-md flex flex-col justify-between px-6 pt-24 pb-[max(2rem,env(safe-area-inset-bottom))] overflow-y-auto overscroll-contain transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="flex flex-col items-start gap-2 sm:gap-4 my-auto">
          <div className="text-xs uppercase tracking-widest text-white/50 mb-2">
            SUMAS Department Menu
          </div>
          <a
            href="#department"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('department');
            }}
            className="w-full py-2.5 text-2xl sm:text-3xl font-medium text-white hover:opacity-60 transition-opacity"
          >
            Department Overview
          </a>
          <a
            href="#curriculum"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('curriculum');
            }}
            className="w-full py-2.5 text-2xl sm:text-3xl font-medium text-white hover:opacity-60 transition-opacity"
          >
            5-Year Academic Path
          </a>
          <a
            href="#skills"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('skills');
            }}
            className="w-full py-2.5 text-2xl sm:text-3xl font-medium text-white hover:opacity-60 transition-opacity"
          >
            Required Engineering Skills
          </a>
          <a
            href="#labs"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('labs');
            }}
            className="w-full py-2.5 text-2xl sm:text-3xl font-medium text-white hover:opacity-60 transition-opacity"
          >
            Research &amp; Labs
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('contact');
            }}
            className="w-full py-2.5 text-2xl sm:text-3xl font-medium text-white underline underline-offset-4 hover:opacity-60 transition-opacity"
          >
            Contact Department
          </a>
        </div>

        <div className="pt-6 mt-6 border-t border-white/15 w-full flex flex-col gap-1 text-sm text-white/70 font-mono">
          <a
            href="mailto:michelleburston19@gmail.com"
            className="py-1.5 underline underline-offset-2 hover:text-white transition-colors break-all"
          >
            michelleburston19@gmail.com
          </a>
          <a
            href="tel:+2349073588658"
            className="py-1.5 hover:text-white transition-colors"
          >
            +234-9073588658
          </a>
        </div>
      </div>
    </>
  );
};
