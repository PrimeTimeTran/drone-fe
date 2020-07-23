import React from "react";

import Button from '../components/Button'

export default function AnswerOptions({currentQuestion, handleSelectAnswer}) {
  return (
    <>
      <div className="options-container">
        <Button
          onClick={handleSelectAnswer}
          option={currentQuestion.optionB}
        />
        <Button
          onClick={handleSelectAnswer}
          option={currentQuestion.optionA}
        />
      </div>
      <div className="options-container">
        <Button
          onClick={handleSelectAnswer}
          option={currentQuestion.optionC}
        />
        <Button
          onClick={handleSelectAnswer}
          option={currentQuestion.optionD}
        />
      </div>
    </>
  );
}
