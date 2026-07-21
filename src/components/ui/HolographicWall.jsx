import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import './HolographicWall.css';

const SYMBOLS = ['◇', '◌', '✦', '△', '○', '╳', '⌁', '·', '◈', '＋', '□', '∿'];

export default function HolographicWall({ intensity = 0.8, radius = 180, className = '' }) {
  const [mouse, setMouse] = useState(null);
  const symbols = useMemo(() => Array.from({ length: 96 }, (_, index) => ({
    char: SYMBOLS[index % SYMBOLS.length],
    x: (index % 12) * 8.6 + 2,
    y: Math.floor(index / 12) * 12 + 3,
    delay: (index % 9) * 0.06,
  })), []);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) setMouse(null);
  }, []);

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMouse({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  };

  return (
    <div className={`holographic-wall ${className}`} onMouseMove={handleMove} onMouseLeave={() => setMouse(null)}>
      <div className="holographic-wall__glow" style={mouse ? { left: mouse.x, top: mouse.y, opacity: intensity } : undefined} />
      <div className="holographic-wall__symbols">
        {symbols.map((symbol, index) => {
          const left = `${symbol.x}%`;
          const top = `${symbol.y}%`;
          const distance = mouse ? Math.hypot((symbol.x / 100) * 640 - mouse.x, (symbol.y / 100) * 420 - mouse.y) : Infinity;
          const active = distance < radius;
          return (
            <motion.span
              key={index}
              className="holographic-wall__symbol"
              style={{ left, top }}
              initial={{ opacity: 0.14 }}
              animate={{
                opacity: active ? 0.25 + Math.max(0, 1 - distance / radius) * intensity : 0.14,
                scale: active ? 1.35 : 1,
                color: active ? 'var(--orange-light)' : 'rgba(255,255,255,.18)',
              }}
              transition={{ type: 'spring', stiffness: 420, damping: 32, delay: symbol.delay }}
            >
              {symbol.char}
            </motion.span>
          );
        })}
      </div>
      <div className="holographic-wall__scanline" />
    </div>
  );
}
