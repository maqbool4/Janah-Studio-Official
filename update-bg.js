import fs from 'fs';

// 1. Update AIParticlesBackground.tsx
const bgCode = `import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulseSpeed: number;
  pulseValue: number;
  pulseDir: number;
}

export default function AIParticlesBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = container.clientWidth;
    let height = container.clientHeight;
    let waveAngle = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const initParticles = (w: number, h: number) => {
      const particleCount = Math.min(Math.floor((w * h) / 13000), 100);
      const temp: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        temp.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1,
          pulseSpeed: Math.random() * 0.03 + 0.01,
          pulseValue: Math.random(),
          pulseDir: Math.random() > 0.5 ? 1 : -1,
        });
      }
      particlesRef.current = temp;
    };

    initParticles(width, height);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle tech grid dots matching reference image
      ctx.fillStyle = "rgba(57, 167, 255, 0.08)";
      const gridSize = 50;
      for (let x = 40; x < width; x += gridSize) {
        for (let y = 40; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw Spherical Matrix Globes (Top-Right and Bottom-Left matching reference image)
      const drawGlobe = (cx: number, cy: number, radius: number, time: number) => {
        ctx.save();
        ctx.strokeStyle = "rgba(32, 224, 220, 0.15)";
        ctx.lineWidth = 1;

        for (let r = radius * 0.3; r <= radius; r += radius * 0.25) {
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.stroke();
        }

        for (let angle = 0; angle < Math.PI; angle += Math.PI / 6) {
          ctx.beginPath();
          ctx.ellipse(cx, cy, radius, radius * Math.sin(angle + time), angle, 0, Math.PI * 2);
          ctx.stroke();
        }

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, "rgba(32, 224, 220, 0.25)");
        grad.addColorStop(0.5, "rgba(57, 167, 255, 0.1)");
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      };

      const time = Date.now() * 0.001;
      drawGlobe(width - 120, 150, 160, time * 0.5);
      drawGlobe(120, height - 120, 180, -time * 0.4);

      // Draw Flowing Luminous Waves (matching reference image wave curves)
      waveAngle += 0.015;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, height * 0.4);
      for (let x = 0; x <= width; x += 50) {
        const y = height * 0.4 + Math.sin(x * 0.003 + waveAngle) * 60 + Math.cos(x * 0.005 - waveAngle * 0.7) * 40;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      const waveGrad = ctx.createLinearGradient(0, height * 0.2, 0, height);
      waveGrad.addColorStop(0, "rgba(57, 167, 255, 0.12)");
      waveGrad.addColorStop(0.5, "rgba(32, 224, 220, 0.06)");
      waveGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = waveGrad;
      ctx.fill();
      ctx.restore();

      ctx.save();
      ctx.beginPath();
      for (let x = 0; x <= width; x += 20) {
        const y = height * 0.55 + Math.sin(x * 0.004 - waveAngle * 1.2) * 50;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(32, 224, 220, 0.35)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      const pts = particlesRef.current;
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        p.pulseValue += p.pulseSpeed * p.pulseDir;
        if (p.pulseValue >= 1) {
          p.pulseValue = 1;
          p.pulseDir = -1;
        } else if (p.pulseValue <= 0.2) {
          p.pulseValue = 0.2;
          p.pulseDir = 1;
        }
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      const maxDistance = 140;
      const mouseMaxDistance = 180;
      for (let i = 0; i < pts.length; i++) {
        const p1 = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const p2 = pts[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.25;
            ctx.strokeStyle = \`rgba(32, 224, 220, \${alpha})\`;
            ctx.lineWidth = (1 - dist / maxDistance) * 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        if (mouseRef.current.active) {
          const mdx = p1.x - mouseRef.current.x;
          const mdy = p1.y - mouseRef.current.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < mouseMaxDistance) {
            const alpha = (1 - mdist / mouseMaxDistance) * 0.4;
            ctx.strokeStyle = \`rgba(57, 167, 255, \${alpha})\`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.stroke();
            p1.x -= mdx * 0.006;
            p1.y -= mdy * 0.006;
          }
        }

        const r = p1.radius * (1 + p1.pulseValue * 0.4);
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, r * 1.8, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(p1.x, p1.y, 0, p1.x, p1.y, r * 3);
        grad.addColorStop(0, "rgba(32, 224, 220, 0.6)");
        grad.addColorStop(1, "rgba(57, 167, 255, 0)");
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, r * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = \`rgba(255, 255, 255, \${0.8 + p1.pulseValue * 0.2})\`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const entry = entries[0];
      const newWidth = Math.floor(entry.contentRect.width);
      const newHeight = Math.floor(entry.contentRect.height);
      if (newWidth === width && newHeight === height) return;
      width = newWidth;
      height = newHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles(width, height);
    });
    resizeObserver.observe(container);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current.x = e.touches[0].clientX - rect.left;
        mouseRef.current.y = e.touches[0].clientY - rect.top;
        mouseRef.current.active = true;
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("touchmove", handleTouchMove);
    container.addEventListener("touchend", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto"
      style={{ zIndex: 0 }}
    >
      <canvas ref={canvasRef} className="block w-full h-full opacity-80" />
    </div>
  );
}
`;

fs.writeFileSync('src/components/AIParticlesBackground.tsx', bgCode);
console.log('AIParticlesBackground updated.');
