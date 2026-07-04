import React, { useState, useEffect, useRef } from 'react';
import Container from '../components/Container/Container';
import SectionTitle from '../components/SectionTitle/SectionTitle';

interface Stage {
  title: string;
  software: string;
  icons: string[];
  x: number;
  y: number;
  align: 'left' | 'right' | 'center';
  cardClass: string;
  brandColor: string;
  brandRgb: [number, number, number];
  brandRgbStr: string;
}

const STAGES: Stage[] = [
  {
    title: "Timeline Editing",
    software: "PREMIERE PRO",
    icons: ["/icons/premiere.svg"],
    x: 110,
    y: 80,
    align: 'center',
    cardClass: "left-[4%] top-[10%] -translate-y-1/2 text-center items-center",
    brandColor: "#a855f7", // Premiere Purple
    brandRgb: [168, 85, 247],
    brandRgbStr: "168, 85, 247"
  },
  {
    title: "Motion Graphics & VFX",
    software: "AFTER EFFECTS",
    icons: ["/icons/aftereffects.svg"],
    x: 110,
    y: 320,
    align: 'center',
    cardClass: "left-[4%] top-[84%] -translate-y-1/2 text-center items-center",
    brandColor: "#6366f1", // AE Indigo
    brandRgb: [99, 102, 241],
    brandRgbStr: "99, 102, 241"
  },
  {
    title: "Color Grading",
    software: "DAVINCI RESOLVE",
    icons: ["/icons/davinci.svg"],
    x: 400,
    y: 200,
    align: 'center',
    cardClass: "left-[50%] top-[68%] -translate-x-1/2 -translate-y-1/2 text-center items-center",
    brandColor: "#3b82f6", // DaVinci Blue
    brandRgb: [59, 130, 246],
    brandRgbStr: "59, 130, 246"
  },
  {
    title: "Frame Design",
    software: "PHOTOSHOP &\nILLUSTRATOR",
    icons: ["/icons/photoshop.svg", "/icons/illustrator.svg"],
    x: 690,
    y: 80,
    align: 'center',
    cardClass: "right-[4%] top-[10%] -translate-y-1/2 text-center items-center",
    brandColor: "#ec4899", // PS/AI Magenta/pink
    brandRgb: [236, 72, 153],
    brandRgbStr: "236, 72, 153"
  },
  {
    title: "Sound Design",
    software: "ADOBE AUDITION",
    icons: ["/icons/audition.svg"],
    x: 690,
    y: 320,
    align: 'center',
    cardClass: "right-[4%] top-[84%] -translate-y-1/2 text-center items-center",
    brandColor: "#10b981", // Audition Green
    brandRgb: [16, 185, 129],
    brandRgbStr: "16, 185, 129"
  }
];

const interpolateNodeFill = (factor: number): string => {
  // "#070709" to "#06b6d4"
  const r = Math.round(7 + (6 - 7) * factor);
  const g = Math.round(7 + (182 - 7) * factor);
  const b = Math.round(9 + (212 - 9) * factor);
  return `rgb(${r}, ${g}, ${b})`;
};

const interpolateNodeStroke = (factor: number): string => {
  // "rgba(244, 244, 247, 0.15)" to "rgba(34, 211, 238, 1)"
  const r = Math.round(244 + (34 - 244) * factor);
  const g = Math.round(244 + (211 - 244) * factor);
  const b = Math.round(247 + (238 - 247) * factor);
  const a = 0.15 + (1 - 0.15) * factor;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

const easeOutBack = (u: number): number => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(u - 1, 3) + c1 * Math.pow(u - 1, 2);
};

const solveCubicBezier = (t: number, x1: number, y1: number, x2: number, y2: number): number => {
  if (t === 0 || t === 1) return t;
  let x = t;
  for (let i = 0; i < 8; i++) {
    const currX = 3 * Math.pow(1 - x, 2) * x * x1 + 3 * (1 - x) * x * x * x2 + x * x * x;
    const derX = 3 * Math.pow(1 - x, 2) * x1 + 6 * (1 - x) * x * (x2 - x1) + 3 * x * x * (1 - x2);
    if (Math.abs(currX - t) < 1e-5) break;
    x -= (currX - t) / (derX || 1);
  }
  return 3 * Math.pow(1 - x, 2) * x * y1 + 3 * (1 - x) * x * x * y2 + x * x * x;
};

// Fast Bezier Lookup Tables to avoid Newton-Raphson solver iterations in loop
const BEZIER_SAMPLES = 200;
const stageBezierTable = new Float32Array(BEZIER_SAMPLES + 1);
const splineBezierTable = new Float32Array(BEZIER_SAMPLES + 1);

for (let i = 0; i <= BEZIER_SAMPLES; i++) {
  const t = i / BEZIER_SAMPLES;
  stageBezierTable[i] = solveCubicBezier(t, 0.22, 1, 0.36, 1);
  splineBezierTable[i] = solveCubicBezier(t, 0.42, 0, 0.58, 1);
}

const getStageBezier = (u: number): number => {
  const idx = Math.round(u * BEZIER_SAMPLES);
  return stageBezierTable[Math.max(0, Math.min(BEZIER_SAMPLES, idx))];
};

const getSplineBezier = (u: number): number => {
  const idx = Math.round(u * BEZIER_SAMPLES);
  return splineBezierTable[Math.max(0, Math.min(BEZIER_SAMPLES, idx))];
};

const calculateStaggeredRatio = (
  dt: number,
  startMs: number,
  riseMs: number,
  holdMs: number,
  fadeMs: number
): { ratio: number; scaleRatio: number } => {
  const adjustedDt = dt - startMs;
  if (adjustedDt < 0) {
    return { ratio: 0, scaleRatio: 0 };
  }

  if (adjustedDt <= riseMs) {
    const u = adjustedDt / riseMs;
    const easedU = getStageBezier(u);
    const scaleEasedU = easeOutBack(u);
    return { ratio: easedU, scaleRatio: scaleEasedU };
  }

  const activeHold = riseMs + holdMs;
  if (adjustedDt <= activeHold) {
    return { ratio: 1.0, scaleRatio: 1.0 };
  }

  const fadeEnd = activeHold + fadeMs;
  if (adjustedDt <= fadeEnd) {
    const u = 1 - (adjustedDt - activeHold) / fadeMs;
    const easedU = u * u * (3 - 2 * u); // smooth step ease-out
    return { ratio: easedU, scaleRatio: easedU };
  }

  return { ratio: 0, scaleRatio: 0 };
};

function getPathProgress(t: number): number {
  const boundaries = [0.0, 0.125, 0.25, 0.5, 0.625, 0.75, 1.0];
  let segIndex = 0;
  for (let i = 0; i < 6; i++) {
    if (t >= boundaries[i] && t <= boundaries[i + 1]) {
      segIndex = i;
      break;
    }
  }

  const tStart = boundaries[segIndex];
  const tEnd = boundaries[segIndex + 1];
  const pStart = boundaries[segIndex];
  const pEnd = boundaries[segIndex + 1];

  const u = (t - tStart) / (tEnd - tStart);
  const uEased = getSplineBezier(u); // fast array lookup
  const uBlended = 0.15 * uEased + 0.85 * u; // 15% slowing around curves/nodes

  return pStart + uBlended * (pEnd - pStart);
}

function getDtForStage(index: number, elapsedMs: number, loopDuration: number): number {
  const trailDuration = 0.248 * loopDuration;
  if (index === 2) {
    const t1 = 0.125 * loopDuration - trailDuration;
    const t2 = 0.625 * loopDuration - trailDuration;
    const dt1 = (elapsedMs - t1 + loopDuration) % loopDuration;
    const dt2 = (elapsedMs - t2 + loopDuration) % loopDuration;
    return Math.min(dt1, dt2);
  }

  const reachPercentages = [0.0, 0.75, -1, 0.5, 0.25];
  const tReach = reachPercentages[index] * loopDuration;
  const tContact = tReach - trailDuration;
  return (elapsedMs - tContact + loopDuration) % loopDuration;
}

export const Process: React.FC = () => {
  const [timeProgress, setTimeProgress] = useState<number>(0);
  const [elapsedMs, setElapsedMs] = useState<number>(0);
  const [gradientCoords, setGradientCoords] = useState({ x1: 110, y1: 80, x2: 400, y2: 200 });
  const [inView, setInView] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const pathPointsRef = useRef<{ x: number; y: number }[]>([]);
  const pathLengthRef = useRef<number>(0);
  const loopDuration = 3500;

  // 1. Observe visibility to pause RAF loop when off-screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.02 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 2. Pre-sample coordinate points along path on mount to prevent layout thrashing inside RAF loop
  useEffect(() => {
    const path = pathRef.current;
    if (path && pathPointsRef.current.length === 0) {
      try {
        const length = path.getTotalLength();
        pathLengthRef.current = length;
        const samples = 1000;
        const pts = [];
        for (let i = 0; i <= samples; i++) {
          pts.push(path.getPointAtLength((i / samples) * length));
        }
        pathPointsRef.current = pts;
      } catch {
        // ignore potential initial layout queries
      }
    }
  }, []);

  // 3. Viewport-bounded requestAnimationFrame loop
  useEffect(() => {
    if (!inView) return;

    let animId: number;
    let startTimestamp: number | null = null;

    const update = (timestamp: number) => {
      if (startTimestamp === null) {
        startTimestamp = timestamp;
      }
      const elapsed = (timestamp - startTimestamp) % loopDuration;
      setElapsedMs(elapsed);
      const progress = elapsed / loopDuration;
      setTimeProgress(progress);

      const pts = pathPointsRef.current;
      if (pts.length > 0) {
        const pVal = getPathProgress(progress);
        const trailPct = 0.248;

        const headIdx = Math.round((pVal % 1) * (pts.length - 1));
        const tailIdx = Math.round(((pVal + trailPct) % 1) * (pts.length - 1));

        const pHead = pts[headIdx];
        const pTail = pts[tailIdx];

        if (pHead && pTail) {
          setGradientCoords({
            x1: pTail.x,
            y1: pTail.y,
            x2: pHead.x,
            y2: pHead.y
          });
        }
      }

      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [inView]);

  const p = getPathProgress(timeProgress);
  const dashOffset = (1 - p) * 1000;

  const stageStates = STAGES.map((_, index) => {
    const dt = getDtForStage(index, elapsedMs, loopDuration);

    const TRAVEL_TIMES = [0.125, 0.25, 0.125, 0.125, 0.25];
    const travelDuration = TRAVEL_TIMES[index] * loopDuration;

    const nodeState = calculateStaggeredRatio(dt, 0, 120, Math.max(0, travelDuration - 120), 400);
    const logoState = calculateStaggeredRatio(dt, 40, 160, Math.max(0, travelDuration - 200), 450);
    const titleState = calculateStaggeredRatio(dt, 80, 160, Math.max(0, travelDuration - 240), 420);
    const swState = calculateStaggeredRatio(dt, 120, 160, Math.max(0, travelDuration - 280), 400);

    const nodeActive = nodeState.ratio;
    const logoActive = logoState.ratio;
    const logoScale = 1.0 + 0.05 * logoState.scaleRatio;
    const titleActive = titleState.ratio;
    const softwareActive = swState.ratio;

    let pulseRadius = 5.5;
    let pulseOpacity = 0;
    if (dt >= 15 && dt <= 135) {
      const u = (dt - 15) / 120;
      pulseRadius = 5.5 + u * 18;
      pulseOpacity = 0.8 * (1 - u);
    }

    return {
      nodeActive,
      pulseRadius,
      pulseOpacity,
      logoActive,
      logoScale,
      titleActive,
      softwareActive
    };
  });

  const infinityPath = "M 110,80 C 190,20 300,155 400,200 C 500,245 610,380 690,320 C 727.8,291.7 750,247.2 750,200 C 750,152.8 727.8,108.3 690,80 C 610,20 500,155 400,200 C 300,245 190,380 110,320 C 72.2,291.7 50,247.2 50,200 C 50,152.8 72.2,108.3 110,80";

  return (
    <section
      ref={containerRef}
      id="process"
      className="bg-obsidian pt-12 pb-10 md:pt-16 md:pb-12"
      aria-label="Creative Process"
    >
      <Container>
        <SectionTitle
          eyebrow="05 // METHODOLOGY"
          title="Creative Process"
          className="mb-24 md:mb-28"
        />

        {/* Desktop Layout: Premium Interactive Infinity Spline */}
        <div className="hidden md:block relative w-full max-w-[1152px] h-[480px] mx-auto select-none">
          <svg
            className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-0"
            viewBox="0 0 800 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Softer, wider unified bloom */}
              <filter id="glow-unified" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3.8" result="blur" />
                <feComponentTransfer in="blur" result="glow">
                  <feFuncA type="linear" slope="0.45" />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Tight, clean core glow */}
              <filter id="glow-unified-tight" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feComponentTransfer in="blur" result="glow">
                  <feFuncA type="linear" slope="0.3" />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Softest tail dispersion */}
              <filter id="glow-unified-soft" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="6.0" result="blur" />
                <feComponentTransfer in="blur" result="glow">
                  <feFuncA type="linear" slope="0.25" />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Background spline guide track filter */}
              <filter id="glow-gray" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feComponentTransfer in="blur" result="glow">
                  <feFuncA type="linear" slope="0.1" />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Premium multi-stage bloom filter for the energy trail group */}
              <filter id="glow-streak-bloom" x="-50%" y="-50%" width="200%" height="200%">
                {/* Stage 1: Tight core bloom */}
                <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="blur1" />
                <feComponentTransfer in="blur1" result="glow1">
                  <feFuncA type="linear" slope="0.65" />
                </feComponentTransfer>

                {/* Stage 2: Medium cinematic glow */}
                <feGaussianBlur in="SourceGraphic" stdDeviation="4.5" result="blur2" />
                <feComponentTransfer in="blur2" result="glow2">
                  <feFuncA type="linear" slope="0.45" />
                </feComponentTransfer>

                {/* Stage 3: Wide, soft cinematic bloom */}
                <feGaussianBlur in="SourceGraphic" stdDeviation="10.0" result="blur3" />
                <feComponentTransfer in="blur3" result="glow3">
                  <feFuncA type="linear" slope="0.25" />
                </feComponentTransfer>

                <feMerge>
                  <feMergeNode in="glow3" />
                  <feMergeNode in="glow2" />
                  <feMergeNode in="glow1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Dynamic linear gradient for the seamless multi-color trail */}
              <linearGradient
                id="trail-gradient"
                gradientUnits="userSpaceOnUse"
                x1={gradientCoords.x1}
                y1={gradientCoords.y1}
                x2={gradientCoords.x2}
                y2={gradientCoords.y2}
              >
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.0)" />
                <stop offset="15%" stopColor="rgba(255, 255, 255, 0.12)" />
                <stop offset="30%" stopColor="rgba(6, 182, 212, 0.28)" />
                <stop offset="45%" stopColor="rgba(59, 130, 246, 0.52)" />
                <stop offset="60%" stopColor="rgba(147, 51, 234, 0.72)" />
                <stop offset="70%" stopColor="rgba(236, 72, 153, 0.78)" />
                <stop offset="78%" stopColor="rgba(219, 39, 119, 0.84)" />
                <stop offset="88%" stopColor="rgba(249, 115, 22, 0.92)" />
                <stop offset="95%" stopColor="rgba(234, 179, 8, 0.97)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 1.0)" />
              </linearGradient>
            </defs>

            {/* Background Spline Track (soft white-gray, 2.8px thick, gray glow) */}
            <path
              ref={pathRef}
              d={infinityPath}
              stroke="#D0D0D0"
              strokeOpacity="0.42"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow-gray)"
            />

            {/* Glowing Signature-Writing Light Streak - Seamless Linear Gradient Ribbon (28% path length, 280 units) */}
            <path
              d={infinityPath}
              stroke="url(#trail-gradient)"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="1000"
              strokeDasharray="248 752"
              strokeDashoffset={dashOffset}
              filter="url(#glow-streak-bloom)"
            />

            {/* Connection Stage Nodes */}
            {STAGES.map((stage, index) => {
              const state = stageStates[index];
              const { nodeActive, pulseRadius, pulseOpacity } = state;

              const nodeFill = interpolateNodeFill(nodeActive);
              const nodeStroke = interpolateNodeStroke(nodeActive);
              const nodeRadius = 5.5 + nodeActive * 1.7;

              return (
                <g key={index} className="origin-center">
                  {/* Expanding pulse ring */}
                  {pulseOpacity > 0.01 && (
                    <circle
                      cx={stage.x}
                      cy={stage.y}
                      r={pulseRadius}
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="1.5"
                      opacity={pulseOpacity}
                    />
                  )}
                  {/* Static halo glow */}
                  <circle
                    cx={stage.x}
                    cy={stage.y}
                    r="9.5"
                    fill="none"
                    stroke="rgba(6, 182, 212, 0.4)"
                    strokeWidth="1"
                    filter="url(#glow-unified)"
                    style={{ opacity: nodeActive }}
                  />
                  {/* Main Node */}
                  <circle
                    cx={stage.x}
                    cy={stage.y}
                    r={nodeRadius}
                    fill={nodeFill}
                    stroke={nodeStroke}
                    strokeWidth="2"
                    className="cursor-pointer"
                    filter={nodeActive > 0.1 ? "url(#glow-unified-tight)" : undefined}
                    style={{ transformOrigin: `${stage.x}px ${stage.y}px` }}
                  />
                </g>
              );
            })}

            {/* Subtle Easter Egg Signature */}
            <text
              x="400"
              y="385"
              textAnchor="middle"
              className="fill-white/[0.04] select-none font-sans font-light tracking-[0.08em] pointer-events-none"
              style={{ fontSize: '9px' }}
            >
              योगः कर्मसु कौशलम्
            </text>
          </svg>

          {/* Desktop HUD Content overlays */}
          {STAGES.map((stage, index) => {
            const state = stageStates[index];
            const { logoActive, logoScale, titleActive, softwareActive } = state;

            const brandRgbStr = stage.brandRgbStr;
            const [brandR, brandG, brandB] = stage.brandRgb;

            const logoOpacity = 0.88 + 0.12 * logoActive;
            const logoTranslateY = -6 * logoActive;
            const titleR = Math.round(212 + (255 - 212) * titleActive);
            const titleG = Math.round(212 + (255 - 212) * titleActive);
            const titleB = Math.round(212 + (255 - 212) * titleActive);

            const swR = Math.round(160 + (brandR - 160) * softwareActive);
            const swG = Math.round(168 + (brandG - 168) * softwareActive);
            const swB = Math.round(172 + (brandB - 172) * softwareActive);

            return (
              <div
                key={index}
                className={`absolute ${stage.cardClass} flex flex-col items-center text-center z-10`}
              >
                {/* Soft ambient group colored glow */}
                <div
                  className="absolute w-24 h-24 rounded-full pointer-events-none -z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    backgroundColor: stage.brandColor,
                    opacity: 0.03 + 0.10 * logoActive,
                    filter: 'blur(36px)',
                    transform: 'scale(2.5)'
                  }}
                />

                {/* Scale & Ease Wrapper for the entire stage card contents */}
                <div
                  className="flex flex-col items-center"
                  style={{
                    transform: `scale(${logoScale})`,
                    transformOrigin: 'center center'
                  }}
                >
                  {/* Brand Badge with Spacing (exactly 18px gap to title) */}
                  <div className="relative flex items-center justify-center gap-2 mb-[18px]">
                    {/* Layered bloom behind logo */}
                    {/* 1. Inner glow */}
                    <div
                      className="absolute w-12 h-12 rounded-full pointer-events-none -z-10"
                      style={{
                        backgroundColor: stage.brandColor,
                        opacity: 0.10 + 0.35 * logoActive,
                        filter: 'blur(8px)',
                        transform: 'scale(1.1)'
                      }}
                    />
                    {/* 2. Medium colored glow */}
                    <div
                      className="absolute w-12 h-12 rounded-full pointer-events-none -z-10"
                      style={{
                        backgroundColor: stage.brandColor,
                        opacity: 0.06 + 0.32 * logoActive,
                        filter: 'blur(16px)',
                        transform: 'scale(1.5)'
                      }}
                    />
                    {/* 3. Large soft ambient glow */}
                    <div
                      className="absolute w-12 h-12 rounded-full pointer-events-none -z-10"
                      style={{
                        backgroundColor: stage.brandColor,
                        opacity: 0.03 + 0.18 * logoActive,
                        filter: 'blur(32px)',
                        transform: 'scale(2.2)'
                      }}
                    />
                    {stage.icons.map((iconPath, iconIdx) => {
                      const isDavinci = iconPath.includes('davinci');
                      const borderR = Math.round(255 + (34 - 255) * logoActive);
                      const borderG = Math.round(255 + (211 - 255) * logoActive);
                      const borderB = Math.round(255 + (255 - 255) * logoActive);
                      const borderA = 0.12 + 0.48 * logoActive;
                      const davinciStyle = isDavinci ? {
                        border: `1px solid rgba(${borderR}, ${borderG}, ${borderB}, ${borderA})`,
                        backgroundColor: `rgba(255, 255, 255, ${0.03 + 0.03 * logoActive})`,
                        boxShadow: logoActive > 0.01
                          ? `0 0 12px rgba(34, 211, 238, ${logoActive * 0.55}), inset 0 0 5px rgba(255, 255, 255, ${logoActive * 0.35})`
                          : undefined,
                        padding: '2px',
                        borderRadius: '6px',
                      } : {};

                      return (
                        <img
                          key={iconIdx}
                          src={iconPath}
                          alt=""
                          className="w-9 h-9 md:w-10 md:h-10 object-contain rounded-sm select-none"
                          style={{
                            opacity: logoOpacity,
                            transform: `translateY(${logoTranslateY}px) scale(${isDavinci ? 1.0 + 0.06 * logoActive : 1.0})`,
                            filter: isDavinci
                              ? `brightness(${1.22 + 0.18 * logoActive}) contrast(1.15) saturate(1.15)`
                              : `brightness(${1.22 + 0.13 * logoActive}) contrast(1.12) saturate(1.12)`,
                            ...davinciStyle
                          }}
                        />
                      );
                    })}
                  </div>

                  <div className="flex flex-col items-center">
                    <h4
                      className="text-sm md:text-base lg:text-lg font-display font-light tracking-wide"
                      style={{
                        color: `rgb(${titleR}, ${titleG}, ${titleB})`,
                        textShadow: titleActive > 0.01 ? `0 0 8px rgba(${brandRgbStr}, ${titleActive * 0.42}), 0 0 20px rgba(${brandRgbStr}, ${titleActive * 0.22})` : undefined
                      }}
                    >
                      {stage.title}
                    </h4>
                    {/* Software Name with Spacing (exactly 8px gap from title, supporting multi-line) */}
                    <span
                      className="block font-mono text-[10px] sm:text-[11px] lg:text-sm uppercase tracking-[0.2em] mt-[8px] whitespace-pre-line leading-[1.25]"
                      style={{
                        color: `rgb(${swR}, ${swG}, ${swB})`,
                        textShadow: softwareActive > 0.01 ? `0 0 6px rgba(${brandRgbStr}, ${softwareActive * 0.48}), 0 0 15px rgba(${brandRgbStr}, ${softwareActive * 0.22})` : undefined
                      }}
                    >
                      {stage.software}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Layout: Scaled Loop Top + Vertical HUD Stack Bottom */}
        <div className="flex flex-col items-center w-full md:hidden select-none">
          {/* Scaled animated spline loop */}
          <div className="w-full max-w-[340px] aspect-[800/400] relative mb-6">
            <svg
              className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
              viewBox="0 0 800 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Softer, wider unified bloom */}
                <filter id="glow-unified-mobile" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3.8" result="blur" />
                  <feComponentTransfer in="blur" result="glow">
                    <feFuncA type="linear" slope="0.45" />
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                {/* Tight, clean core glow */}
                <filter id="glow-unified-tight-mobile" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feComponentTransfer in="blur" result="glow">
                    <feFuncA type="linear" slope="0.3" />
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                {/* Softest tail dispersion */}
                <filter id="glow-unified-soft-mobile" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="6.0" result="blur" />
                  <feComponentTransfer in="blur" result="glow">
                    <feFuncA type="linear" slope="0.25" />
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                {/* Background spline guide track filter */}
                <filter id="glow-gray-mobile" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feComponentTransfer in="blur" result="glow">
                    <feFuncA type="linear" slope="0.1" />
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                {/* Premium multi-stage bloom filter for the energy trail group */}
                <filter id="glow-streak-bloom-mobile" x="-50%" y="-50%" width="200%" height="200%">
                  {/* Stage 1: Tight core bloom */}
                  <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="blur1" />
                  <feComponentTransfer in="blur1" result="glow1">
                    <feFuncA type="linear" slope="0.65" />
                  </feComponentTransfer>

                  {/* Stage 2: Medium cinematic glow */}
                  <feGaussianBlur in="SourceGraphic" stdDeviation="4.5" result="blur2" />
                  <feComponentTransfer in="blur2" result="glow2">
                    <feFuncA type="linear" slope="0.45" />
                  </feComponentTransfer>

                  {/* Stage 3: Wide, soft cinematic bloom */}
                  <feGaussianBlur in="SourceGraphic" stdDeviation="10.0" result="blur3" />
                  <feComponentTransfer in="blur3" result="glow3">
                    <feFuncA type="linear" slope="0.25" />
                  </feComponentTransfer>

                  <feMerge>
                    <feMergeNode in="glow3" />
                    <feMergeNode in="glow2" />
                    <feMergeNode in="glow1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Mobile Dynamic linear gradient for the seamless multi-color trail */}
                <linearGradient
                  id="trail-gradient-mobile"
                  gradientUnits="userSpaceOnUse"
                  x1={gradientCoords.x1}
                  y1={gradientCoords.y1}
                  x2={gradientCoords.x2}
                  y2={gradientCoords.y2}
                >
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.0)" />
                  <stop offset="15%" stopColor="rgba(255, 255, 255, 0.12)" />
                  <stop offset="30%" stopColor="rgba(6, 182, 212, 0.28)" />
                  <stop offset="45%" stopColor="rgba(59, 130, 246, 0.52)" />
                  <stop offset="60%" stopColor="rgba(147, 51, 234, 0.72)" />
                  <stop offset="70%" stopColor="rgba(236, 72, 153, 0.78)" />
                  <stop offset="78%" stopColor="rgba(219, 39, 119, 0.84)" />
                  <stop offset="88%" stopColor="rgba(249, 115, 22, 0.92)" />
                  <stop offset="95%" stopColor="rgba(234, 179, 8, 0.97)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 1.0)" />
                </linearGradient>
              </defs>

              {/* Background Spline Track (soft white-gray, 2.8px thick, gray glow) */}
              <path
                d={infinityPath}
                stroke="#D0D0D0"
                strokeOpacity="0.42"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow-gray-mobile)"
              />

              {/* Mobile Glowing Signature-Writing Light Streak - Seamless Linear Gradient Ribbon (28% path length, 280 units) */}
              <path
                d={infinityPath}
                stroke="url(#trail-gradient-mobile)"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength="1000"
                strokeDasharray="248 752"
                strokeDashoffset={dashOffset}
                filter="url(#glow-streak-bloom-mobile)"
              />

              {STAGES.map((stage, index) => {
                const state = stageStates[index];
                const { nodeActive, pulseRadius, pulseOpacity } = state;

                const nodeFill = interpolateNodeFill(nodeActive);
                const nodeStroke = interpolateNodeStroke(nodeActive);
                const nodeRadius = 5.5 + nodeActive * 1.7;

                return (
                  <g key={index} className="origin-center">
                    {/* Expanding pulse ring */}
                    {pulseOpacity > 0.01 && (
                      <circle
                        cx={stage.x}
                        cy={stage.y}
                        r={pulseRadius}
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="1.5"
                        opacity={pulseOpacity}
                      />
                    )}
                    {/* Main Node */}
                    <circle
                      cx={stage.x}
                      cy={stage.y}
                      r={nodeRadius}
                      fill={nodeFill}
                      stroke={nodeStroke}
                      strokeWidth="2"
                      filter={nodeActive > 0.1 ? "url(#glow-unified-tight-mobile)" : undefined}
                      style={{ transformOrigin: `${stage.x}px ${stage.y}px` }}
                    />
                  </g>
                );
              })}

              {/* Subtle Easter Egg Signature */}
              <text
                x="400"
                y="385"
                textAnchor="middle"
                className="fill-white/[0.04] select-none font-sans font-light tracking-[0.08em] pointer-events-none"
                style={{ fontSize: '9px' }}
              >
                योगः कर्मसु कौशलम्
              </text>
            </svg>
          </div>

          <div className="flex flex-col space-y-3.5 w-full max-w-sm mt-4">
            {STAGES.map((stage, index) => {
              const state = stageStates[index];
              const { logoActive, titleActive, softwareActive } = state;
              const brandRgbStr = stage.brandRgbStr;
              const [brandR, brandG, brandB] = stage.brandRgb;

              const logoOpacity = 0.80 + 0.20 * logoActive;
              const titleR = Math.round(195 + (255 - 195) * titleActive);
              const titleG = Math.round(195 + (255 - 195) * titleActive);
              const titleB = Math.round(195 + (255 - 195) * titleActive);

              const swR = Math.round(148 + (brandR - 148) * softwareActive);
              const swG = Math.round(154 + (brandG - 154) * softwareActive);
              const swB = Math.round(158 + (brandB - 158) * softwareActive);

              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-sm border transition-[border-color,background-color,box-shadow] duration-[400ms]"
                  style={{
                    backgroundColor: `rgba(10, 10, 10, ${0.65 + 0.25 * logoActive})`,
                    borderColor: logoActive > 0.01 
                      ? `rgba(${brandR}, ${brandG}, ${brandB}, ${0.12 + 0.28 * logoActive})`
                      : `rgba(${brandR}, ${brandG}, ${brandB}, 0.10)`,
                    boxShadow: logoActive > 0.01
                      ? `0 0 15px rgba(${brandR}, ${brandG}, ${brandB}, ${0.04 + 0.10 * logoActive})`
                      : `0 0 8px rgba(${brandR}, ${brandG}, ${brandB}, 0.03)`,
                    transform: `scale(${1.0 + 0.07 * logoActive})`,
                    transformOrigin: 'center center'
                  }}
                >
                  <div className="flex items-center space-x-4">
                    {/* Icon Row */}
                    <div className="flex items-center gap-1.5">
                      {stage.icons.map((iconPath, iconIdx) => {
                        const isDavinci = iconPath.includes('davinci');
                        const borderR = Math.round(255 + (34 - 255) * logoActive);
                        const borderG = Math.round(255 + (211 - 255) * logoActive);
                        const borderB = Math.round(255 + (255 - 255) * logoActive);
                        const borderA = 0.12 + 0.48 * logoActive;
                        const davinciStyle = isDavinci ? {
                          border: `1px solid rgba(${borderR}, ${borderG}, ${borderB}, ${borderA})`,
                          backgroundColor: `rgba(255, 255, 255, ${0.03 + 0.03 * logoActive})`,
                          boxShadow: logoActive > 0.01
                            ? `0 0 10px rgba(34, 211, 238, ${logoActive * 0.55}), inset 0 0 5px rgba(255, 255, 255, ${logoActive * 0.35})`
                            : undefined,
                          padding: '2px',
                          borderRadius: '6px',
                        } : {};

                        return (
                          <img
                            key={iconIdx}
                            src={iconPath}
                            alt=""
                            className="w-6 h-6 object-contain rounded-sm"
                            style={{
                              opacity: logoOpacity,
                              transform: isDavinci
                                ? `scale(${1.0 + 0.06 * logoActive})`
                                : (logoActive > 0.01 ? `scale(${1.0 + 0.02 * logoActive})` : undefined),
                              filter: isDavinci
                                ? `brightness(${1.22 + 0.18 * logoActive}) contrast(1.15) saturate(1.15)`
                                : `brightness(${1.22 + 0.13 * logoActive}) contrast(1.12) saturate(1.12)`,
                              ...davinciStyle
                            }}
                          />
                        );
                      })}
                    </div>

                    <div className="flex flex-col text-left">
                      <h4
                        className="text-xs sm:text-sm font-display font-medium"
                        style={{
                          color: `rgb(${titleR}, ${titleG}, ${titleB})`,
                          textShadow: titleActive > 0.01 ? `0 0 8px rgba(${brandRgbStr}, ${titleActive * 0.35})` : undefined
                        }}
                      >
                        {stage.title}
                      </h4>
                      <span
                        className="font-mono text-[9px] uppercase tracking-widest mt-1"
                        style={{
                          color: `rgb(${swR}, ${swG}, ${swB})`,
                          textShadow: softwareActive > 0.01 ? `0 0 6px rgba(${brandRgbStr}, ${softwareActive * 0.42})` : undefined
                        }}
                      >
                        {stage.software}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </Container>
    </section>
  );
};

export default Process;

