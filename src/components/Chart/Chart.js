import React from "react";
import { Bar } from "react-chartjs-2";

import { produceChartData } from "./utils";

const Chart = ({ data: quizData = [] }) => {
  const onSelectQuiz = (el) => {
    // const idx = el[0]._index;
    // const quiz = quizData[idx];
  };
  const data = produceChartData(quizData);
  return (
    <div className="chart">
      <Bar data={data} options={{}} getElementAtEvent={onSelectQuiz} />
    </div>
  );
};

export default Chart;
