import React, { useState } from 'react';

interface NavbarProps {
  onSelectNav: (destination: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectNav }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (destination: string) => {
    setMobileMenuOpen(false);
    onSelectNav(destination);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-10 w-full px-5 sm:px-8 py-4 sm:py-5 flex flex-row justify-between items-center"
      >
        {/* Logo (left) */}
        <div
          className="flex flex-row items-center gap-3 cursor-pointer group"
          onClick={() => handleNavClick('department')}
          title="State University of Medical and Applied Sciences"
        >
          <span
            className="text-[21px] sm:text-[26px] tracking-tight text-white select-none leading-none font-semibold group-hover:opacity-80 transition-opacity"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            SUMAS®
          </span>
          <span
            className="text-[25px] sm:text-[30px] text-white select-none leading-none inline-block"
            style={{ letterSpacing: '-0.02em' }}
            aria-hidden="true"
          >
            ✳︎
          </span>
          <span className="hidden lg:inline-block text-xs uppercase tracking-widest text-white/60 pl-1 border-l border-white/20 select-none">
            Electrical &amp; Electronic Engineering
          </span>
        </div>

        {/* Desktop nav links (center, hidden below md) */}
        <nav
          className="hidden md:flex flex-row items-center text-[21px] lg:text-[23px] text-white"
          aria-label="Department Navigation"
        >
          <a
            href="#department"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('department');
            }}
            className="hover:opacity-60 transition-opacity"
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
            className="hover:opacity-60 transition-opacity"
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
            className="hover:opacity-60 transition-opacity"
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
            className="hover:opacity-60 transition-opacity"
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
          className="hidden md:block text-[21px] lg:text-[23px] text-white underline underline-offset-2 hover:opacity-60 transition-opacity cursor-pointer"
        >
          Contact Department
        </a>

        {/* Mobile hamburger (visible below md) */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 cursor-pointer z-20 focus:outline-none"
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

      {/* Mobile overlay (z-index: 9) */}
      <div
        className={`fixed inset-0 z-[9] bg-black/90 backdrop-blur-md flex flex-col justify-center items-start px-8 gap-8 transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="text-xs uppercase tracking-widest text-white/50 mb-[-12px]">
          SUMAS Department Menu
        </div>
        <a
          href="#department"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('department');
          }}
          className="text-[30px] font-medium text-white hover:opacity-60 transition-opacity"
        >
          Department Overview
        </a>
        <a
          href="#curriculum"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('curriculum');
          }}
          className="text-[30px] font-medium text-white hover:opacity-60 transition-opacity"
        >
          5-Year Academic Path
        </a>
        <a
          href="#skills"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('skills');
          }}
          className="text-[30px] font-medium text-white hover:opacity-60 transition-opacity"
        >
          Required Engineering Skills
        </a>
        <a
          href="#labs"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('labs');
          }}
          className="text-[30px] font-medium text-white hover:opacity-60 transition-opacity"
        >
          Research &amp; Labs
        </a>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('contact');
          }}
          className="text-[30px] font-medium text-white underline underline-offset-4 hover:opacity-60 transition-opacity"
        >
          Contact Department
        </a>
        <div className="pt-4 border-t border-white/10 w-full text-xs text-white/50 space-y-1 font-mono">
          <p>michelleburston19@gmail.com</p>
          <p>+234-9073588658</p>
        </div>
      </div>
    </>
  );
};
