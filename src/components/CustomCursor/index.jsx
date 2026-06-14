import { useEffect, useRef } from "react";
import "./index.css";

const BG_MARGIN = 48;

const CustomCursor = () => {
  const rootRef = useRef(null);
  const dotWrapRef = useRef(null);
  const dotRef = useRef(null);
  const followerWrapRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const dotWrap = dotWrapRef.current;
    const dot = dotRef.current;
    const followerWrap = followerWrapRef.current;
    if (!root || !dotWrap || !dot || !followerWrap) return;

    let mouseX = -200;
    let mouseY = -200;
    let fx = -200;
    let fy = -200;
    let vx = 0;
    let vy = 0;
    let rafId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      dotWrap.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

      const inside =
        e.clientX > BG_MARGIN &&
        e.clientX < window.innerWidth - BG_MARGIN &&
        e.clientY > BG_MARGIN &&
        e.clientY < window.innerHeight - BG_MARGIN;

      root.style.opacity = inside ? "1" : "0";
    };

    const onMouseLeave = () => {
      root.style.opacity = "0";
    };

    const onMouseDown = () => dot.classList.add("cursor-dot--click");
    const onMouseUp = () => dot.classList.remove("cursor-dot--click");

    const tick = () => {
      vx = (vx + (mouseX - fx) * 0.09) * 0.76;
      vy = (vy + (mouseY - fy) * 0.09) * 0.76;
      fx += vx;
      fy += vy;
      followerWrap.style.transform = `translate(${fx}px, ${fy}px)`;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div ref={rootRef} className="cursor-root">
      <div ref={dotWrapRef} className="cursor-dot-wrap">
        <div ref={dotRef} className="cursor-dot" />
      </div>
      <div ref={followerWrapRef} className="cursor-follower-wrap">
        <div className="cursor-follower" />
      </div>
    </div>
  );
};

export default CustomCursor;
