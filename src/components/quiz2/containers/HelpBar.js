import React from "react";

export default function HelpBar({
  time,
  hints,
  fiftyFifty,
  handleHints,
  handleFiftyFifty,
  numberOfQuestions,
  currentQuestionIndex,
}) {
  return (
    <>
      <div className="lifeline-container">
        <p>
          <span
            onClick={handleFiftyFifty}
            className="mdi mdi-set-center mdi-24px lifeline-icon"
          >
            <span className="lifeline">{fiftyFifty}</span>
          </span>
        </p>
        <p>
          <span
            onClick={handleHints}
            className="mdi mdi-lightbulb-on-outline mdi-24px lifeline-icon"
          >
            <span className="lifeline">{hints}</span>
          </span>
        </p>
      </div>
      <div className="timer-container">
        <p>
          <span className="left" style={{ float: "left" }}>
            {currentQuestionIndex + 1} of {numberOfQuestions}{" "}
          </span>
          <span className="right">
            {time.minutes}:{time.seconds}
            <span className="mdi mdi-clock-outline mdi-24px"></span>
          </span>
        </p>
      </div>
    </>
  );
}
