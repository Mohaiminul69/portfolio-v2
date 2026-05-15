import { useEffect, useRef, useState } from "react";

const SIZE = 110;
const CX = SIZE / 2;
const CY = SIZE / 2;
const TRACK_R = 40;
const START_DEG = 270; // 0% — pointing LEFT (9 o'clock)
const SWEEP = 90; // 90° clockwise → pointing UP (12 o'clock)

function toRad(deg) {
  return (deg - 90) * (Math.PI / 180);
}

function pt(deg, r) {
  return {
    x: CX + r * Math.cos(toRad(deg)),
    y: CY + r * Math.sin(toRad(deg)),
  };
}

function arcPath(fromDeg, toDeg, r) {
  const a = pt(fromDeg, r);
  const b = pt(toDeg, r);
  const large = toDeg - fromDeg > 180 ? 1 : 0;
  return `M${a.x},${a.y} A${r},${r} 0 ${large} 1 ${b.x},${b.y}`;
}

const TICKS = Array.from({ length: 10 }, (_, i) => {
  const deg = START_DEG + (i / 9) * SWEEP;
  const major = i % 3 === 0;
  const inner = pt(deg, TRACK_R + 5);
  const outer = pt(deg, TRACK_R + (major ? 12 : 8));
  return { ...inner, ex: outer.x, ey: outer.y, major };
});

const VolumeKnob = ({ volume, muted, onChange }) => {
  const svgRef = useRef(null);
  const dragging = useRef(false);
  const onChangeRef = useRef(onChange);
  const rafRef = useRef(null);
  const displayVolRef = useRef(muted ? 0 : volume);
  const animatingRef = useRef(false);
  const prevMutedRef = useRef(muted);
  const [displayVol, setDisplayVol] = useState(() => (muted ? 0 : volume));

  useEffect(() => {
    onChangeRef.current = onChange;
  });

  useEffect(() => {
    const mutedChanged = prevMutedRef.current !== muted;
    prevMutedRef.current = muted;

    if (!mutedChanged) {
      if (!muted && !animatingRef.current) {
        displayVolRef.current = volume;
        setDisplayVol(volume);
      }
      return;
    }

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    animatingRef.current = true;

    const from = displayVolRef.current;
    const to = muted ? 0 : volume;
    const DURATION = 450;
    const startTime = performance.now();

    const tick = (now) => {
      const t = Math.min((now - startTime) / DURATION, 1);
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const v = from + (to - from) * ease;
      displayVolRef.current = v;
      setDisplayVol(v);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        animatingRef.current = false;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      animatingRef.current = false;
    };
  }, [muted, volume]);

  const currentDeg = START_DEG + displayVol * SWEEP;
  const needle = pt(currentDeg, 28);

  useEffect(() => {
    const getAngle = (clientX, clientY) => {
      const rect = svgRef.current.getBoundingClientRect();
      const dx = clientX - (rect.left + rect.width / 2);
      const dy = clientY - (rect.top + rect.height / 2);
      let deg = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      if (deg < 0) deg += 360;
      return deg;
    };

    const onMove = (e) => {
      if (!dragging.current) return;
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      let rel = getAngle(cx, cy) - START_DEG;
      if (rel < -180) rel += 360;
      if (rel > 180) rel -= 360;
      onChangeRef.current(Math.max(0, Math.min(1, rel / SWEEP)));
    };

    const onUp = () => {
      dragging.current = false;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      onMouseDown={(e) => {
        dragging.current = true;
        e.preventDefault();
      }}
      onTouchStart={() => {
        dragging.current = true;
      }}
      style={{ cursor: "grab", touchAction: "none", userSelect: "none" }}
      aria-label={`Volume ${Math.round(displayVol * 100)}%`}
    >
      {/* Outer ring */}
      {/* <circle
        cx={CX}
        cy={CY}
        r={TRACK_R + 18}
        fill="rgba(255,255,255,0.02)"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="1"
      /> */}

      {/* Track */}
      <path
        d={arcPath(START_DEG, START_DEG + SWEEP, TRACK_R)}
        stroke="rgba(255,255,255,0.07)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />

      {/* Active fill */}
      {displayVol > 0.005 && (
        <path
          d={arcPath(START_DEG, currentDeg, TRACK_R)}
          stroke="crimson"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 5px rgba(220, 20, 60,0.8))" }}
        />
      )}

      {/* Tick marks */}
      {TICKS.map((t, i) => (
        <line
          key={i}
          x1={t.x}
          y1={t.y}
          x2={t.ex}
          y2={t.ey}
          stroke={t.major ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.18)"}
          strokeWidth={t.major ? 1.5 : 0.8}
        />
      ))}

      {/* 0 / 100 labels */}
      {(() => {
        const p0 = pt(START_DEG, TRACK_R + 22);
        const p1 = pt(START_DEG + SWEEP, TRACK_R + 22);
        return (
          <>
            <text
              x={p0.x}
              y={p0.y}
              fill="rgba(255,255,255,0.25)"
              fontSize="8"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              0
            </text>
            <text
              x={p1.x}
              y={p1.y}
              fill="rgba(255,255,255,0.25)"
              fontSize="8"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              100
            </text>
          </>
        );
      })()}

      {/* Knob face — behind the button overlay */}
      <circle
        cx={CX}
        cy={CY}
        r="22"
        fill="#0e0e0e"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
      />
      <circle cx={CX} cy={CY} r="20" fill="url(#knobGrad)" />

      {/* Needle — starts just outside button radius so it peeks out */}
      {(() => {
        const start = pt(currentDeg, 22);
        return (
          <line
            x1={start.x}
            y1={start.y}
            x2={needle.x}
            y2={needle.y}
            stroke="crimson"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 0 4px rgba(220, 20, 60,0.9))" }}
          />
        );
      })()}

      <defs>
        <radialGradient id="knobGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default VolumeKnob;
