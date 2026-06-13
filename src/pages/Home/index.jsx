import { useRef } from "react";
import heroImg from "../../assets/images/hero-pic.png";
import BorderGlow from "../../components/BorderGlow";
import MetaBalls from "../../components/MetaBalls";
import Orb from "../../components/Orb";
import "./index.css";

const Home = () => {
  const wrapperRef = useRef(null);

  const forwardToMetaBalls = (type, e) => {
    const el = wrapperRef.current?.querySelector(".metaballs-container");
    if (!el) return;
    el.dispatchEvent(
      new PointerEvent(type, {
        clientX: e.clientX,
        clientY: e.clientY,
        pointerId: e.pointerId ?? 1,
        pointerType: "mouse",
        bubbles: false,
      }),
    );
  };

  return (
    <div className="home-page">
      <div className="image-wrapper" ref={wrapperRef}>
        <MetaBalls
          color="#000"
          cursorBallColor="#000"
          cursorBallSize={3}
          size={22}
          ballCount={20}
          animationSize={27}
          enableMouseInteraction={true}
          enableTransparency={true}
          hoverSmoothingFactor={0.05}
          clumpFactor={1}
          speed={0.3}
        />
        <Orb
          hue={-70}
          hoverIntensity={0.15}
          rotateOnHover={true}
          backgroundColor="#000000"
        />
        <div className="hero-ring" />
        <img src={heroImg} className="hero-img" alt="Hero" />
        <div
          className="mouse-capture"
          onPointerMove={(e) => forwardToMetaBalls("pointermove", e)}
          onPointerEnter={(e) => forwardToMetaBalls("pointerenter", e)}
          onPointerLeave={(e) => forwardToMetaBalls("pointerleave", e)}
        />
      </div>
      <div className="hero-content">
        <h1 className="hero-headline">
          Be the best version of you.
          <br />
          <span className="hero-headline--emphasis hero-highlight">
            go beyond.
          </span>
        </h1>
        <p className="hero-description">
          I am a software engineer who was drawn to a world where{" "}
          <strong>design meets logic</strong> — a space where I can{" "}
          <strong>imagine and create anything</strong>. That's what pulled me
          into <strong>software engineering</strong>.
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
              50<span>+</span>
            </span>
            <span className="hero-exp-label">Projects Developed</span>
          </div>
        </div>
        <div className="hero-cta">
          <BorderGlow
            edgeSensitivity={30}
            glowColor="40 80 80"
            backgroundColor="#dc143c"
            borderRadius={4}
            glowRadius={40}
            glowIntensity={1}
            coneSpread={25}
            animated={false}
            colors={["#c084fc", "#f472b6", "#38bdf8"]}
          >
            <div className="hero-btn-padding">View My Work</div>
          </BorderGlow>
          <button className="hero-btn-secondary">Contact Me</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
