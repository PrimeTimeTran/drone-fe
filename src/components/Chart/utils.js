import moment from "moment";

export const produceChartData = (data) => {
  const labels = [];
  const scoreData = [];
  const colors = []
  Array.isArray(data) && data.forEach(quiz => {
    colors.push("#333399")
    scoreData.push(quiz.score);
    labels.push(moment(quiz.createdAt).format("LL"));
  })

  return {
    labels,
    datasets: [
      {
        label: "% Score of Quiz Taken",
        data: scoreData,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  };
};
