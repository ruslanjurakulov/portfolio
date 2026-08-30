'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';

interface JarvisOrbProps {
  className?: string;
  interactive?: boolean;
  pulseTrigger?: number;
  size?: number;
}

export const JarvisOrbCanvas: React.FC<JarvisOrbProps> = ({
  className = '',
  interactive = true,
  pulseTrigger = 0,
  size,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Rotation and interaction state
  const rotRef = useRef({ x: 0.25, y: 0.15, speedX: 0.003, speedY: 0.006, zoom: 1.0 });
  const mouseRef = useRef({ isDown: false, lastX: 0, lastY: 0 });
  const pulseRef = useRef<Array<{ radius: number; maxRadius: number; opacity: number; speed: number }>>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [pulseCount, setPulseCount] = useState(0);

  const triggerPulse = useCallback(() => {
    setPulseCount(prev => prev + 1);
    pulseRef.current.push({
      radius: 40,
      maxRadius: 280,
      opacity: 1.0,
      speed: 4.5,
    });
  }, []);

  // React to external pulseTrigger prop
  useEffect(() => {
    if (pulseTrigger > 0) {
      triggerPulse();
    }
  }, [pulseTrigger, triggerPulse]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || 600;
      height = canvas.height = canvas.parentElement.clientHeight || 600;
    };

    window.addEventListener('resize', handleResize);

    // Generate 3D spherical particle points
    const particleCount = 280;
    const particles: Array<{
      x: number;
      y: number;
      z: number;
      origRadius: number;
      color: string;
      size: number;
      phase: number;
    }> = [];

    const baseRadius = Math.min(width, height) * 0.32;

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = Math.sqrt(Math.PI * particleCount) * theta;
      const r = baseRadius * (0.92 + Math.random() * 0.16);

      const x = r * Math.sin(theta) * Math.cos(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(theta);

      const isGold = Math.random() > 0.82;
      particles.push({
        x,
        y,
        z,
        origRadius: r,
        color: isGold ? 'rgba(250, 204, 21, ' : 'rgba(0, 240, 255, ',
        size: isGold ? 1.2 : Math.random() * 1.8 + 0.8,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Additional equatorial waveform points
    const equatorCount = 120;
    const equatorPoints: Array<{ angle: number; r: number; freq: number }> = [];
    for (let i = 0; i < equatorCount; i++) {
      equatorPoints.push({
        angle: (i / equatorCount) * Math.PI * 2,
        r: baseRadius * 1.05,
        freq: Math.floor(Math.random() * 5) + 2,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.03;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const zoom = rotRef.current.zoom;

      // Auto rotation
      if (!mouseRef.current.isDown) {
        rotRef.current.y += rotRef.current.speedY;
        rotRef.current.x += rotRef.current.speedX * 0.3;
      }

      const rotX = rotRef.current.x;
      const rotY = rotRef.current.y;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      // Helper 3D projection
      const project = (px: number, py: number, pz: number) => {
        // Rotate around Y
        let x1 = px * cosY - pz * sinY;
        let z1 = pz * cosY + px * sinY;

        // Rotate around X
        let y2 = py * cosX - z1 * sinX;
        let z2 = z1 * cosX + py * sinX;

        // Perspective scale
        const fov = 450;
        const scale = (fov / (fov + z2)) * zoom;
        return {
          x: centerX + x1 * scale,
          y: centerY + y2 * scale,
          z: z2,
          scale,
        };
      };

      // 1. Draw Pulses
      for (let i = pulseRef.current.length - 1; i >= 0; i--) {
        const p = pulseRef.current[i];
        p.radius += p.speed;
        p.opacity *= 0.96;

        if (p.opacity < 0.02 || p.radius > p.maxRadius) {
          pulseRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, p.radius * zoom, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 240, 255, ${p.opacity * 0.85})`;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 20;
        ctx.stroke();

        // Secondary ring
        ctx.beginPath();
        ctx.arc(centerX, centerY, p.radius * 0.7 * zoom, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(6, 182, 212, ${p.opacity * 0.4})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }

      // 2. Draw 3D Major Orbital Rings (Vertical and Tilted Rings like in user screenshot)
      const draw3DRing = (
        tiltAngleX: number,
        tiltAngleZ: number,
        ringRadius: number,
        color: string,
        lineWidth: number,
        dashes: number[] = [],
        glow = 15
      ) => {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = glow;
        if (dashes.length) ctx.setLineDash(dashes);

        ctx.beginPath();
        const segments = 90;
        for (let i = 0; i <= segments; i++) {
          const a = (i / segments) * Math.PI * 2;
          // Local ring coords
          let rx = ringRadius * Math.cos(a);
          let ry = ringRadius * Math.sin(a);
          let rz = 0;

          // Apply local tilt Z
          const cosZ = Math.cos(tiltAngleZ);
          const sinZ = Math.sin(tiltAngleZ);
          let x1 = rx * cosZ - ry * sinZ;
          let y1 = rx * sinZ + ry * cosZ;

          // Apply local tilt X
          const cosTX = Math.cos(tiltAngleX);
          const sinTX = Math.sin(tiltAngleX);
          let y2 = y1 * cosTX - rz * sinTX;
          let z2 = rz * cosTX + y1 * sinTX;

          const pt = project(x1, y2, z2);
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
        ctx.restore();
      };

      // Outer vertical Ring 1 (tilted)
      draw3DRing(0, Math.PI / 2 + Math.sin(time * 0.4) * 0.08, baseRadius * 1.15, 'rgba(0, 240, 255, 0.95)', 3.2, [], 25);
      // Outer vertical Ring 2 (opposite tilt)
      draw3DRing(Math.PI / 3, Math.PI / 2, baseRadius * 1.12, 'rgba(0, 240, 255, 0.75)', 2.0, [8, 4], 18);
      // Horizontal equator ring
      draw3DRing(Math.PI / 2, 0, baseRadius * 1.1, 'rgba(0, 240, 255, 0.5)', 1.5, [12, 6], 12);
      // Inner rotating latitude ring
      draw3DRing(Math.PI / 4 + time * 0.1, time * 0.15, baseRadius * 0.75, 'rgba(6, 182, 212, 0.65)', 1.2, [4, 4], 10);

      // 3. Draw Equatorial Audio Waveform Line
      ctx.save();
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.9)';
      ctx.lineWidth = 1.8;
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 15;
      ctx.beginPath();

      for (let i = 0; i <= equatorCount; i++) {
        const item = equatorPoints[i % equatorCount];
        const wave = Math.sin(item.angle * 6 + time * 4) * Math.cos(time * 2 + item.angle * 2) * 14;
        const currentR = item.r + wave;

        const ex = currentR * Math.cos(item.angle);
        const ey = 0;
        const ez = currentR * Math.sin(item.angle);

        const pt = project(ex, ey, ez);
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();

      // 4. Draw Particles (Sorted by Z for proper depth)
      const projectedParticles = particles.map(p => {
        // slight spherical breathe pulsation
        const breathe = Math.sin(time * 2 + p.phase) * 6;
        const currentR = p.origRadius + breathe;
        const ratio = currentR / p.origRadius;

        const pt = project(p.x * ratio, p.y * ratio, p.z * ratio);
        return {
          ...pt,
          color: p.color,
          size: p.size,
        };
      });

      projectedParticles.sort((a, b) => a.z - b.z);

      for (const p of projectedParticles) {
        const depthAlpha = Math.max(0.15, Math.min(1.0, (p.z + baseRadius) / (baseRadius * 2)));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${depthAlpha.toFixed(2)})`;
        if (p.color.includes('250')) {
          ctx.shadowColor = '#facc15';
          ctx.shadowBlur = 8;
        } else {
          ctx.shadowColor = '#00f0ff';
          ctx.shadowBlur = 6;
        }
        ctx.fill();
      }

      // 5. Draw Central Pulsating Crystalline Core (Jarvis Energy Nucleus)
      const corePulse = Math.sin(time * 3) * 6;
      const coreRadius = (28 + corePulse) * zoom;

      // Outer Core Glow
      const glowGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreRadius * 3.5);
      glowGrad.addColorStop(0, 'rgba(0, 240, 255, 0.85)');
      glowGrad.addColorStop(0.3, 'rgba(6, 182, 212, 0.45)');
      glowGrad.addColorStop(0.7, 'rgba(0, 240, 255, 0.12)');
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.save();
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius * 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Inner Core Solid Sphere
      const innerGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreRadius);
      innerGrad.addColorStop(0, '#ffffff');
      innerGrad.addColorStop(0.4, '#a5f3fc');
      innerGrad.addColorStop(0.8, '#00f0ff');
      innerGrad.addColorStop(1, 'rgba(6, 182, 212, 0.9)');

      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
      ctx.fillStyle = innerGrad;
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 35;
      ctx.fill();

      // Core Geometric Wireframe Facets
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 + time * 0.8;
        const x = centerX + Math.cos(a) * coreRadius * 0.9;
        const y = centerY + Math.sin(a) * coreRadius * 0.9;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [interactive]);

  // Mouse / Touch handlers for 3D navigation
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!interactive) return;
    mouseRef.current.isDown = true;
    mouseRef.current.lastX = e.clientX;
    mouseRef.current.lastY = e.clientY;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive || !mouseRef.current.isDown) return;
    const deltaX = e.clientX - mouseRef.current.lastX;
    const deltaY = e.clientY - mouseRef.current.lastY;

    rotRef.current.y += deltaX * 0.008;
    rotRef.current.x += deltaY * 0.008;

    mouseRef.current.lastX = e.clientX;
    mouseRef.current.lastY = e.clientY;
  };

  const handleMouseUp = () => {
    mouseRef.current.isDown = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!interactive) return;
    e.preventDefault();
    const zoomDelta = e.deltaY * -0.001;
    rotRef.current.zoom = Math.min(Math.max(0.65, rotRef.current.zoom + zoomDelta), 1.6);
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none overflow-hidden ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        handleMouseUp();
        setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onWheel={handleWheel}
      onClick={triggerPulse}
    >
      <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing block" />

      {/* Cyber HUD Corner Indicators */}
      <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none text-[10px] font-mono text-cyan-400/80 bg-slate-950/60 px-2 py-1 rounded border border-cyan-500/20 backdrop-blur-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        <span>HOLO_MATRIX: ACTIVE</span>
      </div>

      <div className="absolute top-3 right-3 text-[10px] font-mono text-cyan-400/60 pointer-events-none bg-slate-950/60 px-2 py-1 rounded border border-cyan-500/20 backdrop-blur-sm">
        LAT: 38.89°N • 432.8Hz
      </div>

      <div className="absolute bottom-3 left-3 text-[10px] font-mono text-slate-400/70 pointer-events-none hidden sm:block">
        [ESC] spin • [SCROLL] zoom • [CLICK] pulse ({pulseCount})
      </div>

      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        <span className="text-[10px] font-mono text-emerald-400/90 uppercase">60 FPS // SYNCED</span>
      </div>
    </div>
  );
};
