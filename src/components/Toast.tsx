import React from 'react';

interface ToastProps {
  message: string;
  visible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, visible }) => {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 pointer-events-none transition-all duration-300 ease-out transform ${
        visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 text-white text-xs sm:text-sm px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
        <span>{message}</span>
      </div>
    </div>
  );
};
