'use client';

import { useEffect, useMemo, useRef } from 'react';

type MatrixTextLogoProps = {
  text: string;
};

export function MatrixTextLogo({ text }: MatrixTextLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const lines = useMemo(() => {
    // allow manual line breaks via \n, otherwise split into 2 words max for nicer layout
    if (text.includes('\n')) return text.split('\n');
    const parts = text.trim().split(/\s+/);
    if (parts.length <= 2) return [text];
    const mid = Math.ceil(parts.length / 2);
    return [parts.slice(0, mid).join(' '), parts.slice(mid).join(' ')];
  }, [text]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const maskCanvas = document.createElement('canvas');
    const maskCtx = maskCanvas.getContext('2d');
    if (!maskCtx) return;

    let rafId = 0;

    let columns: number[] = [];
    let columnCount = 0;
    let charSize = 16;

    const backgroundFade = 'rgba(0, 0, 0, 0.10)';
    const matrixColor = '#00ff66';

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      const width = Math.max(320, Math.floor(rect.width));
      const height = Math.max(180, Math.floor(rect.height));

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      maskCanvas.width = canvas.width;
      maskCanvas.height = canvas.height;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Matrix tuning based on available width
      charSize = Math.max(12, Math.min(18, Math.floor(width / 40)));
      columnCount = Math.floor(width / charSize);
      columns = Array.from({ length: columnCount }, () => Math.random() * (height / charSize));
    };

    const drawMask = (width: number, height: number) => {
      // Draw the text mask onto maskCanvas at device pixels
      maskCtx.clearRect(0, 0, maskCanvas.width, maskCanvas.height);

      const dpr = window.devicePixelRatio || 1;
      maskCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      maskCtx.fillStyle = '#ffffff';
      maskCtx.textAlign = 'center';
      maskCtx.textBaseline = 'middle';

      const baseSize = Math.max(38, Math.min(120, Math.floor(width / 8)));
      const lineHeight = Math.floor(baseSize * 0.95);

      // Use a bold, clean font stack (no custom font families)
      const font = `800 ${baseSize}px Helvetica, Arial, sans-serif`;
      maskCtx.font = font;

      const centerX = Math.floor(width / 2);
      const centerY = Math.floor(height / 2);

      if (lines.length === 1) {
        maskCtx.fillText(lines[0], centerX, centerY);
      } else {
        const startY = centerY - Math.floor(lineHeight / 2);
        maskCtx.fillText(lines[0], centerX, startY);
        maskCtx.fillText(lines[1], centerX, startY + lineHeight);
      }
    };

    const tick = () => {
      const width = Math.floor(canvas.style.width ? parseInt(canvas.style.width, 10) : container.clientWidth);
      const height = Math.floor(canvas.style.height ? parseInt(canvas.style.height, 10) : container.clientHeight);

      // Trail fade
      ctx.fillStyle = backgroundFade;
      ctx.fillRect(0, 0, width, height);

      // Matrix characters
      ctx.fillStyle = matrixColor;
      ctx.font = `${charSize}px monospace`;

      for (let i = 0; i < columnCount; i++) {
        const x = i * charSize;
        const y = columns[i] * charSize;
        const ch = String.fromCharCode(33 + Math.floor(Math.random() * 92));
        ctx.fillText(ch, x, y);

        columns[i] += 0.75;
        if (y > height && Math.random() > 0.975) columns[i] = 0;
      }

      // Clip to text
      drawMask(width, height);
      ctx.save();
      ctx.globalCompositeOperation = 'destination-in';
      ctx.drawImage(maskCanvas, 0, 0, width, height);
      ctx.restore();

      rafId = requestAnimationFrame(tick);
    };

    const ro = new ResizeObserver(() => {
      resize();
    });

    resize();
    ro.observe(container);

    // Clear first frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rafId = requestAnimationFrame(tick);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [lines]);

  return (
    <div ref={containerRef} className="relative w-full h-[220px] sm:h-[280px] md:h-[360px] select-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-label={text}
      />

      {/* Subtle outline to make the logo read on any background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1
          className="text-center tracking-tight"
          style={{
            WebkitTextStroke: '1px rgba(255,255,255,0.35)',
            color: 'transparent',
            fontWeight: 800,
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontSize: 'clamp(38px, 7vw, 120px)',
            lineHeight: 0.95,
          }}
        >
          {lines.map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        </h1>
      </div>
    </div>
  );
}
