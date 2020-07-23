import React from "react";
import classnames from "classnames";

export default function ControlOptions({
  handleNav,
  handleQuit,
  disableNextButton,
  previousButtonDisabled,
}) {
  return (
    <div className="button-container">
      <button
        onClick={handleNav}
        className={classnames("", {
          disable: previousButtonDisabled,
        })}
      >
        Previous
      </button>
      <button
        onClick={() => handleNav('forward') }
        className={classnames("", {
          disable: disableNextButton,
        })}
      >
        Next
      </button>
      <button onClick={handleQuit}>Quit</button>
    </div>
  );
}
