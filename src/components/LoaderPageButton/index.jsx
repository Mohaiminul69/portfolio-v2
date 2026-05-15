import "./index.css";

const LoaderPageButton = ({ onClick }) => {
  return (
    <button className="neon-btn btn-magenta" onClick={onClick}>
      <span>CONTINUE</span>
    </button>
  );
};

export default LoaderPageButton;
