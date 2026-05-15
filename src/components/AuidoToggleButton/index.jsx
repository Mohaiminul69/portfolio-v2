import clsx from "clsx";
import "./index.css";

export default function AudioToggleButton({ enableSound, setEnableSound }) {
  return (
    <div className="toggle-container">
      <h1
        className={clsx("toggle-letters", { "letter-on-state": enableSound })}
      >
        S
      </h1>
      <h1
        className={clsx("toggle-letters", { "letter-on-state": enableSound })}
      >
        O
      </h1>
      <h1
        className={clsx("toggle-letters", { "letter-on-state": enableSound })}
      >
        U
      </h1>
      <h1
        className={clsx("toggle-letters", { "letter-on-state": enableSound })}
      >
        N
      </h1>
      <h1
        className={clsx("toggle-letters", { "letter-on-state": enableSound })}
      >
        D
      </h1>
      <div className="toggle-base">
        <div
          className={clsx("toggle-handle", {
            "toggle-handle-on-state": enableSound,
          })}
          onClick={() => setEnableSound((v) => !v)}
        />
      </div>
      {enableSound ? (
        <h1
          className={clsx("toggle-letters", {
            "letter-on-state": enableSound,
            "letter-flicker": enableSound,
          })}
        >
          N
        </h1>
      ) : (
        <>
          <h1
            className={clsx("toggle-letters", {
              "letter-on-state": enableSound,
            })}
          >
            F
          </h1>
          <h1
            className={clsx("toggle-letters", {
              "letter-on-state": enableSound,
            })}
          >
            F
          </h1>
        </>
      )}
    </div>
  );
}
