import heroImg from "../../assets/images/hero-pic.png";
import "./index.css";

const Home = () => {
  return (
    <div className="home-page">
      <div className="image-wrapper">
        <img src={heroImg} alt="Hero" srcset="" />
      </div>
    </div>
  );
};

export default Home;
