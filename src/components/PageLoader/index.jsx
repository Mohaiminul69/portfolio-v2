import { useState } from "react";
import ToggleButton from "../AuidoToggleButton";
import LoaderProgress from "../LoaderProgress";
import logoGif from "../../assets/gifs/logo.gif";
import "./index.css";
import LoaderPageButton from "../LoaderPageButton";

const PageLoader = ({ fadingOut, handleSoundChoice }) => {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [enableSound, setEnableSound] = useState(false);

  return (
    <div className={`loader${fadingOut ? " loader--out" : ""}`}>
      <img src={logoGif} className="loader-gif" alt="" />
      {isPageLoading ? (
        <LoaderProgress onLoaderEnd={setIsPageLoading} />
      ) : (
        <div className="loader-buttons">
          <ToggleButton
            enableSound={enableSound}
            setEnableSound={setEnableSound}
          />
          <LoaderPageButton onClick={() => handleSoundChoice(enableSound)} />
        </div>
      )}
    </div>
  );
};

export default PageLoader;
