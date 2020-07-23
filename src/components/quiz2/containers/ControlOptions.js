import React from "react";
import classnames from "classnames";

export default function ControlOptions({
  handlePrevious,
  previousButtonDisabled,
  handleNext,
  disableNextButton,
  handleQuit,
}) {
  return (
    <div className="button-container">
      <button
        onClick={handlePrevious}
        className={classnames("", {
          disable: previousButtonDisabled,
        })}
      >
        Previous
      </button>
      <button
        onClick={handleNext}
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
