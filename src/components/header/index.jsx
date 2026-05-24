// import { useState } from "react";
import "./index.css";

// const CopyIcon = () => (
//   <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//     <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
//   </svg>
// );

// const CheckIcon = () => (
//   <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//     <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
//   </svg>
// );

// const CopyField = ({ label, value }) => {
//   const [copied, setCopied] = useState(false);

//   const handleCopy = () => {
//     navigator.clipboard.writeText(value);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div className="footer__contact-item">
//       <span className="footer__contact-label">{label}</span>
//       <span className="footer__contact-value">{value}</span>
//       <button
//         className={`footer__copy-btn${copied ? " footer__copy-btn--copied" : ""}`}
//         onClick={handleCopy}
//         title={copied ? "Copied!" : `Copy ${label}`}
//       >
//         {copied ? <CheckIcon /> : <CopyIcon />}
//       </button>
//     </div>
//   );
// };

const Header = () => {
  return (
    <header className="header">
      <h1 className="header__name">Mohaiminul Islam Shishir</h1>
      <div className="header__designation-row">
        <p className="header__designation">Software Engineer</p>
        <span className="header__open-to-work">
          <span className="header__status-dot" />
          Open to work
        </span>
      </div>
      {/* <div className="footer__contacts">
        <CopyField label="Email" value="mursalinaraf4884@gmail.com" />
        <CopyField label="Phone" value="+880 000 000 0000" />
      </div> */}
    </header>
  );
};

export default Header;
