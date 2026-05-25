const ArrowIcon = ({ direction = "right", size = 40 }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: direction === "left" ? "rotate(180deg)" : "none",
      }}
    >
      <path
        d="
      M 72 52
      Q 62 34 74 24
      L 166 100
      L 74 176
      Q 62 166 72 148
      L 122 100
      L 82 64
    "
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    // <svg
    //   viewBox="0 0 512 512"
    //   xmlns="http://www.w3.org/2000/svg"
    //   className="arrow-icon"
    //   style={{
    //     width: `${size}px`,
    //     height: `${size}px`,
    //     transform: direction === "left" ? "rotate(270deg)" : "rotate(90deg)",
    //   }}
    // >
    //   <path
    //     d="
    //       M256 30
    //       C205 68, 135 112, 70 170
    //       C42 195, 22 220, 12 238
    //       C55 210, 110 190, 165 190
    //       C215 190, 243 225, 246 285
    //       L256 455
    //       L266 285
    //       C269 225, 297 190, 347 190
    //       C402 190, 457 210, 500 238
    //       C490 220, 470 195, 442 170
    //       C377 112, 307 68, 256 30
    //       Z
    //     "
    //     strokeWidth={30}
    //   />
    // </svg>
  );
};

export default ArrowIcon;
