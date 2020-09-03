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
          "#333399",
          "#333399",
          "#333399",
          "#333399",
          "#333399",
          "#333399",
        ],
        borderColor: [
          "#333399",
          "#333399",
          "#333399",
          "#333399",
          "#333399",
          "#333399",
        ],
        borderWidth: 1,
      },
    ],
  };
};
