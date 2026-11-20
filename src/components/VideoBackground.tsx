import React, { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 72;
const COLS = 3;
const ROWS = 6;
const FRAMES_PER_SHEET = COLS * ROWS; // 18 frames per sheet
const FRAME_WIDTH = 960;
const FRAME_HEIGHT = 540;
const SHEET_URLS = [
  '/frames/sheet_1.webp',
  '/frames/sheet_2.webp',
  '/frames/sheet_3.webp',
  '/frames/sheet_4.webp',
];
const POSTER_URL = '/frames/poster.webp';

const DESKTOP_SENSITIVITY = 0.85;
const MOBILE_TOUCH_SENSITIVITY = 1.65;

type FrameSource = ImageBitmap | HTMLImageElement;

export const VideoBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [posterHidden, setPosterHidden] = useState(false);

  const sheetsRef = useRef<(FrameSource | null)[]>([null, null, null, null]);
  const posterSourceRef = useRef<FrameSource | null>(null);

  const prevXRef = useRef<number | null>(null);
  const prevTimeRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const velocityRef = useRef<number>(0); // frames per second for smooth touch flick inertia
  const lastDrawnFrameRef = useRef<number>(-1);
  const needsDrawRef = useRef<boolean>(true);
  const canvasReadyRef = useRef<boolean>(false);

  useEffect(() => {
    let cancelled = false;
    let rafId = 0;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const syncCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      const targetW = Math.max(1, Math.round(width * dpr));
      const targetH = Math.max(1, Math.round(height * dpr));

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
        needsDrawRef.current = true;
      }
    };

    syncCanvasSize();

    const drawSourceCover = (
      source: FrameSource,
      sx: number,
      sy: number,
      sw: number,
      sh: number
    ) => {
      const cw = canvas.width;
      const ch = canvas.height;
      const srcAspect = sw / sh;
      const dstAspect = cw / ch;

      let drawW: number;
      let drawH: number;
      if (dstAspect > srcAspect) {
        drawW = cw;
        drawH = cw / srcAspect;
      } else {
        drawH = ch;
        drawW = ch * srcAspect;
      }

      const isMobilePortrait = window.innerWidth < 768 && window.innerHeight >= window.innerWidth;
      const alignX = isMobilePortrait ? 0.5 : 0.7;
      const alignY = 0.5;

      const dx = (cw - drawW) * alignX;
      const dy = (ch - drawH) * alignY;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(source, sx, sy, sw, sh, dx, dy, drawW, drawH);

      if (!canvasReadyRef.current) {
        canvasReadyRef.current = true;
        setPosterHidden(true);
      }
    };

    const drawFrameIndex = (frameIdx: number): boolean => {
      const clamped = Math.min(Math.max(frameIdx, 0), TOTAL_FRAMES - 1);
      const sheetIndex = Math.floor(clamped / FRAMES_PER_SHEET);
      const sheet = sheetsRef.current[sheetIndex];

      if (sheet) {
        const localIdx = clamped % FRAMES_PER_SHEET;
        const col = localIdx % COLS;
        const row = Math.floor(localIdx / COLS);
        drawSourceCover(
          sheet,
          col * FRAME_WIDTH,
          row * FRAME_HEIGHT,
          FRAME_WIDTH,
          FRAME_HEIGHT
        );
        return true;
      }

      // Fallback to poster while the target sheet is still decoding
      if (posterSourceRef.current && lastDrawnFrameRef.current === -1) {
        drawSourceCover(posterSourceRef.current, 0, 0, FRAME_WIDTH, FRAME_HEIGHT);
        return true;
      }

      return false;
    };

    const loadImageSource = async (url: string): Promise<FrameSource | null> => {
      try {
        const img = new Image();
        img.decoding = 'async';
        img.src = url;
        if (typeof img.decode === 'function') {
          await img.decode();
        } else {
          await new Promise<void>((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = () => reject(new Error(`Failed to load ${url}`));
          });
        }
        if (cancelled) return null;

        if (typeof createImageBitmap === 'function') {
          try {
            const bitmap = await createImageBitmap(img);
            if (cancelled) {
              bitmap.close();
              return null;
            }
            return bitmap;
          } catch {
            return img;
          }
        }
        return img;
      } catch {
        return null;
      }
    };

    // Load poster first for instant initial paint, then decode all 4 sprite sheets in parallel
    loadImageSource(POSTER_URL).then((src) => {
      if (cancelled || !src) return;
      posterSourceRef.current = src;
      needsDrawRef.current = true;
    });

    SHEET_URLS.forEach((url, index) => {
      loadImageSource(url).then((src) => {
        if (cancelled || !src) return;
        sheetsRef.current[index] = src;
        needsDrawRef.current = true;
      });
    });

    const isInteractiveOverlay = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false;
      return Boolean(target.closest('[role="dialog"], input, textarea, select'));
    };

    const applyDelta = (clientX: number, sensitivity: number, trackVelocity: boolean) => {
      const now = performance.now();

      if (prevXRef.current === null) {
        prevXRef.current = clientX;
        prevTimeRef.current = now;
        return;
      }

      const deltaX = clientX - prevXRef.current;
      const dt = Math.max((now - prevTimeRef.current) / 1000, 0.004);
      prevXRef.current = clientX;
      prevTimeRef.current = now;

      const viewportW = Math.max(window.innerWidth, 320);
      const frameDelta = (deltaX / viewportW) * sensitivity * (TOTAL_FRAMES - 1);
      const nextTarget = Math.min(
        Math.max(targetFrameRef.current + frameDelta, 0),
        TOTAL_FRAMES - 1
      );

      targetFrameRef.current = nextTarget;

      if (trackVelocity) {
        const instantVel = frameDelta / dt;
        // Blend velocity to prevent touchscreen jitter spikes
        velocityRef.current = Math.min(
          Math.max(velocityRef.current * 0.4 + instantVel * 0.6, -90),
          90
        );
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isInteractiveOverlay(e.target)) return;
      velocityRef.current = 0;
      applyDelta(e.clientX, DESKTOP_SENSITIVITY, false);
    };

    const onMouseLeave = () => {
      prevXRef.current = null;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (isInteractiveOverlay(e.target)) return;
      velocityRef.current = 0;
      if (e.touches.length > 0) {
        prevXRef.current = e.touches[0].clientX;
        prevTimeRef.current = performance.now();
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isInteractiveOverlay(e.target)) return;
      if (e.touches.length > 0) {
        applyDelta(e.touches[0].clientX, MOBILE_TOUCH_SENSITIVITY, true);
      }
    };

    const onTouchEnd = () => {
      prevXRef.current = null;
      // Decay stale velocity if finger paused before lifting
      if (performance.now() - prevTimeRef.current > 80) {
        velocityRef.current = 0;
      }
    };

    let lastTick = performance.now();
    const tick = (now: number) => {
      if (cancelled) return;
      const dt = Math.min((now - lastTick) / 1000, 0.05);
      lastTick = now;

      // Apply smooth momentum coasting when finger is released
      if (prevXRef.current === null && Math.abs(velocityRef.current) > 0.25) {
        const nextTarget = targetFrameRef.current + velocityRef.current * dt;
        if (nextTarget <= 0 || nextTarget >= TOTAL_FRAMES - 1) {
          targetFrameRef.current = Math.min(Math.max(nextTarget, 0), TOTAL_FRAMES - 1);
          velocityRef.current = 0;
        } else {
          targetFrameRef.current = nextTarget;
          velocityRef.current *= Math.exp(-7.5 * dt);
        }
      } else if (prevXRef.current === null) {
        velocityRef.current = 0;
      }

      // Exponential damping keeps frame motion silky-smooth across 60Hz/120Hz displays
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current += diff * (1 - Math.exp(-20 * dt));
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      const targetRounded = Math.round(currentFrameRef.current);
      if (needsDrawRef.current || targetRounded !== lastDrawnFrameRef.current) {
        if (drawFrameIndex(targetRounded)) {
          lastDrawnFrameRef.current = targetRounded;
          needsDrawRef.current = false;
        }
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    window.addEventListener('resize', syncCanvasSize);
    window.addEventListener('orientationchange', syncCanvasSize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('touchcancel', onTouchEnd, { passive: true });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', syncCanvasSize);
      window.removeEventListener('orientationchange', syncCanvasSize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);

      sheetsRef.current.forEach((src) => {
        if (src && 'close' in src && typeof src.close === 'function') {
          src.close();
        }
      });
      if (
        posterSourceRef.current &&
        'close' in posterSourceRef.current &&
        typeof posterSourceRef.current.close === 'function'
      ) {
        posterSourceRef.current.close();
      }
    };
  }, []);

  return (
    <>
      {!posterHidden && (
        <img
          src={POSTER_URL}
          alt=""
          aria-hidden="true"
          className="fixed inset-0 w-full h-full object-cover object-center max-md:landscape:object-[70%_center] md:object-[70%_center] z-0 pointer-events-none"
        />
      )}

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      />

      {/* Subtle top & bottom gradient scrims so text blends seamlessly over the full-height animation */}
      <div
        className="fixed inset-0 z-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(0,0,0,0.48)_0%,transparent_28%,transparent_66%,rgba(0,0,0,0.68)_100%)] max-md:landscape:bg-gradient-to-r max-md:landscape:from-black/65 max-md:landscape:via-black/20 max-md:landscape:to-transparent md:bg-gradient-to-t md:from-black/45 md:via-transparent md:to-black/25"
        aria-hidden="true"
      />
    </>
  );
};
