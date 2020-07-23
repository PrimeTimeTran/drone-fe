import React from "react";

import Button from '../components/Button'

export default function AnswerOptions({currentQuestion, handleOptionClick}) {
  return (
    <>
      <div className="options-container">
        <Button
          onClick={handleOptionClick}
          option={currentQuestion.optionB}
        />
        <Button
          onClick={handleOptionClick}
          option={currentQuestion.optionA}
        />
      </div>
      <div className="options-container">
        <Button
          onClick={handleOptionClick}
          option={currentQuestion.optionC}
        />
        <Button
          onClick={handleOptionClick}
          option={currentQuestion.optionD}
        />
      </div>
    </>
  );
}
