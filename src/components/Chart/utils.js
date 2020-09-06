import moment from "moment";

export const produceChartData = (data) => {
  const labels = [];
  const scoreData = [];
  const colors = [];
  Array.isArray(data) &&
    data.forEach((quiz) => {
      colors.push("#333399");
      scoreData.push(quiz.score);
      labels.push(moment(quiz.createdAt).format("LL"));
    });

  return {
    labels,
    datasets: [
      {
        borderWidth: 1,
        data: scoreData,
        borderColor: colors,
        backgroundColor: colors,
        label: "% Score of Quiz Taken",
      },
    ],
  };
};
