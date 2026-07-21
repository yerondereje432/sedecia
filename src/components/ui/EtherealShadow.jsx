import React, { useEffect, useId, useRef } from 'react';
import { animate, useMotionValue } from 'framer-motion';
import './EtherealShadow.css';

function mapRange(value, fromLow, fromHigh, toLow, toHigh) {
  if (fromLow === fromHigh) return toLow;
  const percentage = (value - fromLow) / (fromHigh - fromLow);
  return toLow + percentage * (toHigh - toLow);
}

/**
 * Self-contained ambient shadow layer for hero sections.
 * It uses SVG turbulence for slow organic motion and CSS gradients instead
 * of remote image masks, keeping the preview and deployment portable.
 */
export default function EtherealShadow({
  color = 'rgba(244, 121, 32, 0.2)',
  animation = { scale: 45, speed: 55 },
  noise = { opacity: 0.16, scale: 1 },
  className = '',
  style,
}) {
  const rawId = useId();
  const id = `ethereal-shadow-${rawId.replace(/:/g, '')}`;
  const hueRef = useRef(null);
  const hue = useMotionValue(0);
  const enabled = Boolean(animation && animation.scale > 0);
  const displacement = animation ? mapRange(animation.scale, 1, 100, 8, 42) : 0;
  const duration = animation ? mapRange(animation.speed, 1, 100, 18, 5) : 1;

  useEffect(() => {
    if (!enabled || !hueRef.current) return undefined;
    const controls = animate(hue, 360, {
      duration,
      repeat: Infinity,
      ease: 'linear',
      onUpdate: (value) => hueRef.current?.setAttribute('values', String(value)),
    });
    return () => controls.stop();
  }, [duration, enabled, hue]);

  return (
    <div className={`ethereal-shadow ${className}`} style={style} aria-hidden="true">
      {enabled && (
        <svg className="ethereal-shadow__filter" aria-hidden="true">
          <defs>
            <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.002 0.008"
                numOctaves="2"
                seed="8"
                result="noise"
              />
              <feColorMatrix ref={hueRef} in="noise" type="hueRotate" values="0" result="colored" />
              <feDisplacementMap in="SourceGraphic" in2="colored" scale={displacement} />
            </filter>
          </defs>
        </svg>
      )}
      <div className="ethereal-shadow__wash" style={{ background: color, filter: enabled ? `url(#${id})` : undefined }} />
      <div
        className="ethereal-shadow__noise"
        style={{ opacity: noise?.opacity || 0, backgroundSize: `${Math.max(80, (noise?.scale || 1) * 160)}px` }}
      />
    </div>
  );
}

