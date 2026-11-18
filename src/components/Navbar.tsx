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
        <button
          type="button"
          className="flex flex-row items-center gap-3 cursor-pointer group shrink-0 bg-transparent border-0 p-0 focus-visible:outline-2 focus-visible:outline-white rounded-lg"
          onClick={() => handleNavClick('department')}
          title="State University of Medical and Applied Sciences (SUMAS)"
          aria-label="SUMAS — Department of Electrical and Electronic Engineering"
        >
          <img
            src="/sumas-logo.png?v=2"
            alt="SUMAS — State University of Medical and Applied Sciences"
            className="h-9 sm:h-11 w-auto object-contain block select-none drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)] group-hover:opacity-85 transition-opacity"
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
