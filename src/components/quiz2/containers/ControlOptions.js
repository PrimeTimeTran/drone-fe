import React from "react";
import classnames from "classnames";

export default function ControlOptions({
  handlePreviousButtonClick,
  previousButtonDisabled,
  handleNextButtonClick,
  disableNextButton,
  handleQuitButtonClick,
}) {
  return (
    <div className="button-container">
      <button
        onClick={handlePreviousButtonClick}
        className={classnames("", {
          disable: previousButtonDisabled,
        })}
      >
        Previous
      </button>
      <button
        onClick={handleNextButtonClick}
        className={classnames("", {
          disable: disableNextButton,
        })}
      >
        Next
      </button>
      <button onClick={handleQuitButtonClick}>Quit</button>
    </div>
  );
}
