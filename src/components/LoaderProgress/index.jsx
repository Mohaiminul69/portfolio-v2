import { useState, useEffect } from "react";

const LoaderProgress = ({ onLoaderEnd }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2400;
    const start = performance.now();
    let rafId;

    const tick = (now) => {
      const p = Math.min(100, Math.round(((now - start) / duration) * 100));
      setProgress(p);
      if (p < 100) {
        rafId = requestAnimationFrame(tick);
      } else {
        setTimeout(() => onLoaderEnd(false), 350);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="loader-progress">
      <span className="loader-percent">{progress}%</span>
      <div className="loader-bar-track">
        <div className="loader-bar-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

export default LoaderProgress;
