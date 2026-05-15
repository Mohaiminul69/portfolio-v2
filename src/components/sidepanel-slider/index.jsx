import "./index.css";

const sentences = [
  "I am a question to the world",
  "Not an answer to be heard",
  "Or a moment that's held in your arms",
  "And what do you think you'd ever say?",
  "I won't listen anyway",
  "You don't know me",
  "And I'll never be what you want me to be",
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
