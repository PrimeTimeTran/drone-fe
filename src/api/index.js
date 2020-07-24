import Axios from "axios";

const token = localStorage.getItem("userToken");

const produceScoreSummary = ({ score, numberOfQuestions }) => {
  const body = {
    score: (score / numberOfQuestions) * 100,
  };
  return JSON.stringify(body);
};

export const sendQuizScore = async (stats) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_SERVER_URL + "/quizzes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: produceScoreSummary(stats),
      }
    );
    const json = await response.json();
    console.log({ scoreSent: json });
  } catch (e) {
    console.log("Error:", e);
  }
};

export const getQuestions = async () => {
  try {
    const res = await Axios.get(
      process.env.REACT_APP_SERVER_URL + "/questions/me",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
    return res.data;
  } catch (e) {
    console.log("Error:", e);
  }
};

export const getQuizHistory = async () => {
  try {
    const response = await fetch(
      process.env.REACT_APP_SERVER_URL + "/quizzes",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const json = await response.json();
    return json;
  } catch (e) {
    console.log("Error:", e);
  }
};
