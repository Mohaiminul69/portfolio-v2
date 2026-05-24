import "./index.css";

const navLinks = ["Home", "Skills", "Projects", "About", "Review"];

const Sidenav = ({ currentPage, onPageChange }) => {
  return (
    <nav className="sidenav">
      <ul className="sidenav__list">
        {navLinks.map((name, index) => (
          <li key={name}>
            <button
              className={`sidenav__link${currentPage === index ? " sidenav__link--active" : ""}`}
              onClick={() => onPageChange(index)}
            >
              <span className="sidenav__dot" />
              <span className="sidenav__label">{name}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidenav;
