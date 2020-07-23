import React from "react";
import { Bar } from "react-chartjs-2";

import { produceChartData } from "./utils";

const Chart = ({ data: quizData = [] }) => {
  console.log(quizData);
  const data = produceChartData(quizData);
  return (
    <div className="chart">
      <Bar data={data} options={{}} />
    </div>
  );
};

export default Chart;
