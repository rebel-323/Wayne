/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { VideoBackground } from './components/VideoBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { Modal, ModalType } from './components/Modal';
import { Toast } from './components/Toast';

export default function App() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2500);
  };

  const handleActionClick = (action: string) => {
    switch (action) {
      case 'department':
        setActiveModal('department');
        break;
      case 'curriculum':
        setActiveModal('curriculum');
        break;
      case 'skills':
        setActiveModal('skills');
        break;
      case 'labs':
        setActiveModal('labs');
        break;
      case 'contact':
        setActiveModal('contact');
        break;
      default:
        break;
    }
  };

  const handleNavSelect = (navItem: string) => {
    switch (navItem) {
      case 'department':
        setActiveModal('department');
        break;
      case 'curriculum':
        setActiveModal('curriculum');
        break;
      case 'skills':
        setActiveModal('skills');
        break;
      case 'labs':
        setActiveModal('labs');
        break;
      case 'contact':
        setActiveModal('contact');
        break;
      default:
        break;
    }
  };

  return (
    <div className="relative min-h-[100dvh] w-full bg-black text-white select-none overflow-x-hidden">
      {/* Background Video (mouse-scrub controlled) */}
      <VideoBackground />

      {/* Top Navbar with SUMAS Logo & Department Links */}
      <Navbar onSelectNav={handleNavSelect} />

      {/* Hero Section */}
      <main>
        <HeroSection
          onActionClick={handleActionClick}
          onCopySuccess={(copiedText) => showToast(`Copied ${copiedText} to clipboard`)}
        />
      </main>

      {/* Interactive Modals for Department, 5-Year Curriculum, Skills, Labs, and Contact */}
      <Modal type={activeModal} onClose={() => setActiveModal(null)} />

      {/* Clipboard Toast */}
      <Toast message={toastMessage} visible={toastVisible} />
    </div>
  );
}
