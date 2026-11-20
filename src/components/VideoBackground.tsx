import React, { useEffect, useRef, useCallback } from 'react';

const SENSITIVITY = 0.8;
const VIDEO_SRC = 'https://res.cloudinary.com/colwaydg/video/upload/v1794359936/Animate_neck_left_and_right_840cca27_1.mp4';

export const VideoBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);
  const unlockedRef = useRef<boolean>(false);

  const handleSeeked = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Math.abs(video.currentTime - targetTimeRef.current) > 0.01) {
      video.currentTime = targetTimeRef.current;
    } else {
      isSeekingRef.current = false;
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    targetTimeRef.current = video.currentTime;
    if (video.currentTime === 0) {
      video.currentTime = 0.01;
    }
  }, []);

  useEffect(() => {
    const isInteractiveOverlay = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false;
      return Boolean(target.closest('[role="dialog"], input, textarea, select'));
    };

    const unlockMobileVideo = () => {
      if (unlockedRef.current) return;
      const vid = videoRef.current;
      if (!vid) return;
      unlockedRef.current = true;
      const playPromise = vid.play();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise
          .then(() => {
            vid.pause();
            vid.currentTime = targetTimeRef.current || 0.01;
          })
          .catch(() => {
            // Ignore autoplay restriction errors
          });
      }
    };

    const handlePointerMove = (clientX: number) => {
      const vid = videoRef.current;
      if (!vid || !vid.duration || isNaN(vid.duration)) return;

      if (prevXRef.current === null) {
        prevXRef.current = clientX;
        return;
      }

      const delta = clientX - prevXRef.current;
      prevXRef.current = clientX;

      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * vid.duration;
      targetTimeRef.current = Math.min(Math.max(targetTimeRef.current + timeOffset, 0), vid.duration);

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        vid.currentTime = targetTimeRef.current;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isInteractiveOverlay(e.target)) return;
      handlePointerMove(e.clientX);
    };

    const onMouseLeave = () => {
      prevXRef.current = null;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (isInteractiveOverlay(e.target)) return;
      unlockMobileVideo();
      if (e.touches.length > 0) {
        prevXRef.current = e.touches[0].clientX;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isInteractiveOverlay(e.target)) return;
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX);
      }
    };

    const onTouchEnd = () => {
      prevXRef.current = null;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <>
      {/* Seamless studio radial backdrop matching the video aura on mobile portrait */}
      <div
        className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,#06278a_0%,#020e38_45%,#000000_85%)] max-md:landscape:bg-black md:bg-black"
        aria-hidden="true"
      />

      {/* Centered mobile stage: keeps the 2D moving character dead-center (50%, 50%) on portrait phones */}
      <div
        className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center md:block max-md:landscape:block"
        aria-hidden="true"
      >
        <div
          className="relative w-full h-[48dvh] min-h-[280px] max-h-[460px] overflow-hidden [mask-image:radial-gradient(ellipse_90%_88%_at_50%_50%,black_55%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_90%_88%_at_50%_50%,black_55%,transparent_100%)] max-md:landscape:h-full max-md:landscape:min-h-0 max-md:landscape:max-h-none max-md:landscape:[mask-image:none] max-md:landscape:[-webkit-mask-image:none] md:w-full md:h-full md:min-h-0 md:max-h-none md:[mask-image:none] md:[-webkit-mask-image:none]"
        >
          <video
            ref={videoRef}
            src={`${VIDEO_SRC}#t=0.01`}
            muted
            playsInline
            preload="auto"
            onSeeked={handleSeeked}
            onLoadedMetadata={handleLoadedMetadata}
            className="w-full h-full object-cover object-center max-md:landscape:object-[70%_center] md:object-[70%_center] pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Subtle top & bottom gradient scrims for crisp text legibility without obscuring the center character */}
      <div
        className="fixed inset-0 z-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(0,0,0,0.55)_0%,transparent_24%,transparent_66%,rgba(0,0,0,0.78)_100%)] max-md:landscape:bg-gradient-to-r max-md:landscape:from-black/70 max-md:landscape:via-black/20 max-md:landscape:to-transparent md:bg-gradient-to-t md:from-black/45 md:via-transparent md:to-black/25"
        aria-hidden="true"
      />
    </>
  );
};
