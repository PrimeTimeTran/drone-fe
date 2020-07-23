import Axios from "axios";

const token = localStorage.getItem("usertoken");

export const sendQuizScore = async (score) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_SERVER_URL + "/quizzes",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: {
          score,
        },
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
          Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
        },
      }
    );
    return res.data;
  } catch (e) {
    console.log("Error:", e);
  }
};
