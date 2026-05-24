import { useState, useEffect, useLayoutEffect, useRef } from "react";
import "./index.css";

const BTN_WIDTH = 4;

const AnimatedArrow = ({ direction, count = 6 }) => {
  const indices = Array.from({ length: count }, (_, i) => i + 1);
  const ordered = direction === "left" ? [...indices].reverse() : indices;
  return (
    <div className="custom-animated">
      {ordered.map((i) => (
        <i
          key={i}
          className={`fas fa-angle-${direction} custom-animated__angle custom-animated__angle--${i}`}
        />
      ))}
    </div>
  );
};

const PAGES = ["Home", "Skills", "Projects", "About", "Review"];

const Pagination = ({ currentPage, onPageChange }) => {
  const [xPos, setXPos] = useState(0);
  const [gap, setGap] = useState(50);
  const wrapperRef = useRef(null);
  const progressPointRef = useRef(null);

  const pageCount = PAGES.length;
  const progress = pageCount > 1 ? (currentPage / (pageCount - 1)) * 100 : 0;

  useLayoutEffect(() => {
    if (progressPointRef.current)
      setGap(progressPointRef.current.offsetWidth / 2 + 8);
  }, [currentPage]);

  const switchPage = (index, bypass = -1) => {
    const targetPos = (-index + 2) * BTN_WIDTH;
    let newXPos;

    if (bypass !== -1) {
      newXPos = (-bypass + 2) * BTN_WIDTH;
    } else if (index > 1 && index < pageCount - 2) {
      newXPos = targetPos;
    } else if (index === 1) {
      newXPos = 0;
    } else if (index === pageCount - 2) {
      newXPos = (-pageCount + 5) * BTN_WIDTH;
    } else {
      newXPos = xPos;
    }

    setXPos(newXPos);
    onPageChange(index);
  };

  const goFirst = () => switchPage(0, Math.min(2, pageCount - 1));
  const goLast = () => switchPage(pageCount - 1, Math.max(0, pageCount - 3));
  const goPrev = () => {
    if (currentPage > 0) switchPage(currentPage - 1);
  };
  const goNext = () => {
    if (currentPage < pageCount - 1) switchPage(currentPage + 1);
  };

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      e.preventDefault();
      const goingUp = e.wheelDelta ? e.wheelDelta > 0 : e.deltaY < 0;
      if (goingUp && currentPage > 0) {
        switchPage(currentPage - 1);
      } else if (!goingUp && currentPage < pageCount - 1) {
        switchPage(currentPage + 1);
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [currentPage, pageCount, xPos]);

  return (
    <div className="pagination-outer" ref={wrapperRef}>
      <div className="pagination-container">
        <div className="pg-row">
          {/* <span className="pagination-info">{PAGES[currentPage]}</span> */}

          <button className="pagination-extreme" onClick={goFirst}>
            <AnimatedArrow direction="left" count={3} />
          </button>
          <button
            className="pagination-extreme pagination-extreme--oval"
            onClick={goPrev}
          >
            <AnimatedArrow direction="left" count={1} />
          </button>

          {/* <div className="pg-fill">
            <div className="pagination-wrapper">
              <ul
                className="pagination"
                style={{ transform: `translateX(${xPos}rem)` }}
              >
                {Array.from({ length: pageCount }, (_, i) => (
                  <li
                    key={i}
                    className={currentPage === i ? "active" : ""}
                    onClick={() => switchPage(i)}
                  >
                    <span>{i + 1}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div> */}

          <button
            className="pagination-extreme pagination-extreme--oval"
            onClick={goNext}
          >
            <AnimatedArrow direction="right" count={1} />
          </button>
          <button
            className="pagination-extreme pagination-extreme--right"
            onClick={goLast}
          >
            <AnimatedArrow direction="right" count={3} />
          </button>
        </div>
      </div>

      <div
        className="progress-bar"
        style={{ "--progress": `${progress}%`, "--gap": `${gap}px` }}
      >
        <span ref={progressPointRef} className="progress-point">
          {PAGES[currentPage]}
        </span>
      </div>
    </div>
  );
};

export default Pagination;
