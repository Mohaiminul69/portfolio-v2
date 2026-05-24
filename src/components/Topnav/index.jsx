import { useState } from "react";
import ArrowIcon from "./ArrorIcon";
import clsx from "clsx";
import "./index.css";

const Topnav = () => {
  const [activeButton, setActiveButton] = useState(0);
  return (
    <div className="topnav">
      <div className="scrollbar"></div>
      <div className="nav-container">
        <ArrowIcon outline direction="left" />
        <button
          className={clsx("nav-button", { "btn-active": activeButton === 0 })}
          onClick={() => setActiveButton(0)}
        >
          0
        </button>
        <button
          className={clsx("nav-button", { "btn-active": activeButton === 1 })}
          onClick={() => setActiveButton(1)}
        >
          n-1
        </button>
        <ArrowIcon direction="right" />
      </div>
    </div>
  );
};

export default Topnav;
