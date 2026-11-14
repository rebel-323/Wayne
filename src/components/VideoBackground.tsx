import React, { useEffect, useRef, useCallback } from 'react';

const SENSITIVITY = 0.8;
const VIDEO_SRC = 'https://res.cloudinary.com/colwaydg/video/upload/v1794359936/Animate_neck_left_and_right_840cca27_1.mp4';

export const VideoBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);

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
    // Ensure initial frame renders
    if (video.currentTime === 0) {
      video.currentTime = 0.01;
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;

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
      handlePointerMove(e.clientX);
    };

    const onMouseLeave = () => {
      prevXRef.current = null;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        prevXRef.current = e.touches[0].clientX;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
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
    <video
      ref={videoRef}
      src={VIDEO_SRC}
      muted
      playsInline
      preload="auto"
      onSeeked={handleSeeked}
      onLoadedMetadata={handleLoadedMetadata}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        width: '100vw',
        height: '100vh',
        objectFit: 'cover',
        objectPosition: '70% center',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
};
