import heroImg from "../../assets/images/hero-pic.png";
import "./index.css";

const Home = () => {
  return (
    <div className="home-page">
      <div className="image-wrapper">
        <div className="hero-ring" />
        <img src={heroImg} className="hero-img" alt="Hero" />
      </div>
      <div className="hero-content">
        <h1 className="hero-headline">
          <span className="hero-strikethrough">A</span>I will take my job
          <br />
          <span className="hero-highlight">to next level.</span>
        </h1>
        <p className="hero-description">
          I build fast, reliable, and beautiful digital products — from{" "}
          <strong>clean architecture</strong> to{" "}
          <strong>pixel-perfect interfaces</strong>. I turn ambitious ideas into
          shipped reality. When I'm not coding, I'm probably playing{" "}
          <strong>table tennis</strong>.
        </p>
        <div className="hero-experience">
          <div className="hero-exp-item">
            <span className="hero-exp-number">
              5<span>+</span>
            </span>
            <span className="hero-exp-label">Years Experience</span>
          </div>
          <div className="hero-exp-divider" />
          <div className="hero-exp-item">
            <span className="hero-exp-number">
              40<span>+</span>
            </span>
            <span className="hero-exp-label">Projects Delivered</span>
          </div>
          <div className="hero-exp-divider" />
          <div className="hero-exp-item">
            <span className="hero-exp-number">
              25<span>+</span>
            </span>
            <span className="hero-exp-label">Happy Clients</span>
          </div>
        </div>
        <div className="hero-cta">
          <button className="hero-btn-primary">View My Work</button>
          <button className="hero-btn-secondary">Contact Me</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
