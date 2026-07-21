import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './PixelLiquidBg.css';

const VERTEX = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const FRAGMENT = `
  precision highp float;
  varying vec2 vUv;
  uniform vec2 uResolution;
  uniform vec2 uPointer;
  uniform vec2 uPointerVelocity;
  uniform float uTime;
  uniform float uPixelSize;
  uniform vec3 uNavy;
  uniform vec3 uOrange;
  uniform vec3 uLight;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }

  void main() {
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 uv = vUv;
    vec2 pixelGrid = uResolution / max(uPixelSize, 2.0);
    uv = (floor(uv * pixelGrid) + 0.5) / pixelGrid;

    float t = uTime * 0.13;
    vec2 flow = vec2(
      noise(uv * 3.2 + vec2(t, -t * .7)),
      noise(uv * 3.2 + vec2(-t * .5, t))
    ) - .5;
    vec2 warped = uv + flow * .12;

    float orangeBlob = 0.0;
    for (int i = 0; i < 3; i++) {
      float fi = float(i);
      vec2 center = vec2(
        .68 + sin(t * (.45 + fi * .12) + fi) * .16,
        .46 + cos(t * (.34 + fi * .1) + fi * 2.0) * .28
      );
      center += uPointer * .08;
      float d = length((warped - center) * aspect);
      orangeBlob += smoothstep(.42 - fi * .05, .02, d) * (.45 - fi * .08);
    }

    float pointerGlow = smoothstep(.5, 0.0, length((warped - uPointer) * aspect)) * .22;
    float grain = hash(gl_FragCoord.xy + uTime) * .045 - .022;
    float dither = mod(gl_FragCoord.x + gl_FragCoord.y, 4.0) * .008;
    float mixAmount = clamp(orangeBlob + pointerGlow + grain + dither, 0.0, 1.0);
    vec3 color = mix(uNavy, uOrange, mixAmount);
    color = mix(color, uLight, smoothstep(.65, 1.0, mixAmount) * .22);
    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function PixelLiquidBg({
  className = '',
  pixelSize = 12,
  autoDemo = true,
  children,
}) {
  const mountRef = useRef(null);
  const pointer = useRef(new THREE.Vector2(.72, .48));
  const pointerTarget = useRef(new THREE.Vector2(.72, .48));

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight, false);
    renderer.domElement.className = 'pixel-liquid-bg__canvas';
    container.prepend(renderer.domElement);

    const uniforms = {
      uResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
      uPointer: { value: pointer.current },
      uPointerVelocity: { value: new THREE.Vector2() },
      uTime: { value: 0 },
      uPixelSize: { value: pixelSize },
      uNavy: { value: new THREE.Color('#1B2A4A') },
      uOrange: { value: new THREE.Color('#F47920') },
      uLight: { value: new THREE.Color('#FFB066') },
    };

    const material = new THREE.ShaderMaterial({ vertexShader: VERTEX, fragmentShader: FRAGMENT, uniforms });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    const onMove = (event) => {
      const rect = container.getBoundingClientRect();
      pointerTarget.current.set(
        (event.clientX - rect.left) / rect.width,
        1 - (event.clientY - rect.top) / rect.height,
      );
    };
    const onTouch = (event) => {
      if (!event.touches[0]) return;
      const touch = event.touches[0];
      onMove({ clientX: touch.clientX, clientY: touch.clientY });
    };
    const resize = () => {
      const width = Math.max(1, container.clientWidth);
      const height = Math.max(1, container.clientHeight);
      renderer.setSize(width, height, false);
      uniforms.uResolution.value.set(width, height);
    };

    container.addEventListener('mousemove', onMove);
    container.addEventListener('touchmove', onTouch, { passive: true });
    const observer = new ResizeObserver(resize);
    observer.observe(container);

    let frame = 0;
    let running = true;
    const start = performance.now();
    const render = (now) => {
      if (!running) return;
      frame = requestAnimationFrame(render);
      const elapsed = (now - start) / 1000;
      if (autoDemo && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        pointerTarget.current.set(.68 + Math.sin(elapsed * .22) * .12, .5 + Math.cos(elapsed * .17) * .18);
      }
      pointer.current.lerp(pointerTarget.current, .045);
      uniforms.uTime.value = elapsed;
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(render);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('touchmove', onTouch);
      observer.disconnect();
      mesh.geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [autoDemo, pixelSize]);

  return <div ref={mountRef} className={`pixel-liquid-bg ${className}`}>{children && <div className="pixel-liquid-bg__content">{children}</div>}</div>;
}
