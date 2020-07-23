import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

import moment from "moment";

const defaultData = {
  type: "Chart",
  data: {
    labels: ["First Quiz", "Second Quiz", "Third Quiz"],
    datasets: [
      {
        label: "% Score of Quiz Taken",
        data: [79, 74, 100],
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
        borderWidth: 1,
      },
    ],
  },
};

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = defaultData;
  }

  static defaultProps = {
    displayTitle: false,
  };

  render() {
    const labels = [];
    const scoreData = [];
    const { data } = this.props;
    data.map((quiz) => {
      labels.push(moment(quiz.createdAt).calendar());
      scoreData.push(quiz.score);
    });

    const newData = {
      labels,
      datasets: [
        {
          label: "% Score of Quiz Taken",
          data: scoreData,
          backgroundColor: [
            "rgba(54, 162, 235, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: [
            "rgba(54, 162, 235, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderWidth: 1,
        },
      ],
    };

    return (
      <div className="chart">
        <Bar data={newData} options={{}} />
      </div>
    );
  }
}

export default Chart;
