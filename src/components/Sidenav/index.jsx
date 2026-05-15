import "./index.css";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Review", href: "#review" },
];

const Sidenav = () => {
  return (
    <nav className="sidenav">
      <ul className="sidenav__list">
        {navLinks.map(({ name, href }) => (
          <li key={name}>
            <a href={href} className="sidenav__link">
              <span className="sidenav__dot" />
              <span className="sidenav__label">{name}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidenav;
