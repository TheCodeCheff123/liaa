import { useEffect, useRef } from 'react';

// Sprinkle colours matching brand palette
const COLOURS = [
  '#F5A623', // amber
  '#3B1A0E', // dark brown
  '#FADADD', // pink
  '#fff',    // white
  '#F7AB1A', // gold
  '#e07b39', // burnt orange
];

interface Sprinkle {
  x: number;
  y: number;
  vx: number;   // horizontal drift
  vy: number;   // fall speed
  angle: number;
  spin: number; // rotation speed
  w: number;    // width (long axis)
  h: number;    // height (short axis)
  colour: string;
  opacity: number;
}

function makeSprinkle(canvasW: number): Sprinkle {
  return {
    x:       Math.random() * canvasW,
    y:       -12 - Math.random() * 60,    // start above viewport
    vx:      (Math.random() - 0.5) * 0.8,
    vy:      1.2 + Math.random() * 1.6,
    angle:   Math.random() * Math.PI * 2,
    spin:    (Math.random() - 0.5) * 0.06,
    w:       6 + Math.random() * 6,
    h:       2.5,
    colour:  COLOURS[Math.floor(Math.random() * COLOURS.length)],
    opacity: 0.55 + Math.random() * 0.45,
  };
}

export default function Sprinkles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    const COUNT = 55;
    let sprinkles: Sprinkle[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight * 0.65; // only cover top ~65% of hero
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Stagger initial positions so they don't all appear at once
    for (let i = 0; i < COUNT; i++) {
      const s = makeSprinkle(canvas.width);
      s.y = Math.random() * canvas.height; // scatter vertically at init
      sprinkles.push(s);
    }

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const s of sprinkles) {
        ctx.save();
        ctx.globalAlpha = s.opacity;
        ctx.translate(s.x, s.y);
        ctx.rotate(s.angle);
        ctx.fillStyle = s.colour;
        ctx.beginPath();
        // Rounded rectangle sprinkle shape
        const rx = s.w / 2, ry = s.h / 2, r = ry;
        ctx.moveTo(-rx + r, -ry);
        ctx.lineTo( rx - r, -ry);
        ctx.arcTo(  rx, -ry,  rx,  ry, r);
        ctx.lineTo( rx - r,  ry);
        ctx.arcTo( -rx,  ry, -rx, -ry, r);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // Update position
        s.x     += s.vx;
        s.y     += s.vy;
        s.angle += s.spin;

        // Recycle when off-screen bottom
        if (s.y > canvas.height + 20) {
          const fresh = makeSprinkle(canvas.width);
          s.x      = fresh.x;
          s.y      = fresh.y;
          s.vx     = fresh.vx;
          s.vy     = fresh.vy;
          s.angle  = fresh.angle;
          s.colour = fresh.colour;
        }
      }

      raf = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full pointer-events-none"
      style={{ zIndex: 5, height: '65%' }}
      aria-hidden="true"
    />
  );
}
