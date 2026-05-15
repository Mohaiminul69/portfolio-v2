import "./index.css";

const sentences = [
  "Full Stack Dev",
  "React & Node.js",
  "UI Craftsman",
  "Problem Solver",
  "Always Learning",
  "Open Source Fan",
  "Always Learning",
  "React & Node.js",
];

const SidepanelSlider = () => {
  return (
    <>
      <div className="sidepanel">
        <div className="infinite-slider-wrapper">
          {sentences.map((sentence, idx) => (
            <div key={idx} className={`itemBottom item${idx + 1}`}>
              <p className="slider-item">{sentence}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SidepanelSlider;
