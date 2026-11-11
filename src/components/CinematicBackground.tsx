import React, { useEffect, useRef } from 'react';

interface CinematicBackgroundProps {
  theme: 'dark' | 'light';
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
}

export const CinematicBackground: React.FC<CinematicBackgroundProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.35 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / Math.max(1, width),
        y: e.clientY / Math.max(1, height),
      };
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const particleCount = width < 768 ? 22 : 42;
    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      radius: Math.random() * 1.7 + 0.6,
      alpha: Math.random() * 0.55 + 0.15,
    }));

    let time = 0;

    const render = () => {
      time += 0.006;
      ctx.clearRect(0, 0, width, height);

      const isDark = theme === 'dark';
      const focalX = width * (0.5 + (mouseRef.current.x - 0.5) * 0.12);
      const focalY = height * (0.38 + (mouseRef.current.y - 0.38) * 0.12);

      // 1. Deep radial atmospheric energy core (#029D97)
      const coreGradient = ctx.createRadialGradient(
        focalX,
        focalY,
        10,
        focalX,
        focalY,
        Math.max(width, height) * 0.62
      );
      if (isDark) {
        coreGradient.addColorStop(0, 'rgba(2, 157, 151, 0.22)');
        coreGradient.addColorStop(0.45, 'rgba(30, 201, 194, 0.08)');
        coreGradient.addColorStop(1, 'rgba(3, 5, 12, 0)');
      } else {
        coreGradient.addColorStop(0, 'rgba(2, 157, 151, 0.10)');
        coreGradient.addColorStop(0.5, 'rgba(30, 201, 194, 0.04)');
        coreGradient.addColorStop(1, 'rgba(248, 250, 252, 0)');
      }
      ctx.fillStyle = coreGradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Flowing Light Ribbons (#029D97)
      const ribbonCount = 3;
      for (let r = 0; r < ribbonCount; r++) {
        ctx.beginPath();
        const baseY = height * (0.28 + r * 0.18);
        const amplitude = 48 + r * 22;
        const frequency = 0.0018 + r * 0.0004;
        const phase = time * (1.1 + r * 0.3) + r * 2.1;

        for (let x = 0; x <= width; x += 24) {
          const y =
            baseY +
            Math.sin(x * frequency + phase) * amplitude +
            Math.cos(x * frequency * 0.6 - phase) * (amplitude * 0.4);
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.strokeStyle = isDark
          ? `rgba(2, 157, 151, ${0.14 - r * 0.03})`
          : `rgba(2, 157, 151, ${0.09 - r * 0.02})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // 3. Concentric Circular Energy Rings around Hero Center (#029D97)
      const ringRadii = [190, 310, 450];
      ringRadii.forEach((radius, idx) => {
        ctx.save();
        ctx.translate(focalX, focalY);
        ctx.rotate(time * (idx % 2 === 0 ? 0.35 : -0.25) + idx);
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 1.35);
        ctx.strokeStyle = isDark
          ? `rgba(2, 157, 151, ${0.16 - idx * 0.035})`
          : `rgba(2, 157, 151, ${0.10 - idx * 0.02})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      });

      // 4. Soft Floating Light Particles (#029D97)
      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(30, 201, 194, ${p.alpha})`
          : `rgba(2, 157, 151, ${p.alpha * 0.6})`;
        ctx.fill();
      });

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [theme]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Subtle architectural perspective grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#029d970d_1px,transparent_1px),linear-gradient(to_bottom,#029d970d_1px,transparent_1px)] bg-[size:48px_48px]" />
    </div>
  );
};
