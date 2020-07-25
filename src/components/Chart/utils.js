import moment from "moment";

export const produceChartData = (data) => {
  const labels = [];
  const scoreData = [];
  Array.isArray(data) && data.forEach(quiz => {
    scoreData.push(quiz.score);
    labels.push(moment(quiz.createdAt).format("LL"));
  })

  return {
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
};
