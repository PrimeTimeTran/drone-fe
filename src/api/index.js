import api from "./config";

const produceScoreSummary = ({ score, numberOfQuestions, questionIds } ) => {
  const body = {
    questionIds,
    score: (score / numberOfQuestions) * 100,
  };
  return JSON.stringify(body);
};

export const postQuizScore = async (stats) => {
  try {
    await api().post("/quizzes", produceScoreSummary(stats));
  } catch (e) {
    console.log("Error:", e);
  }
};

export const getQuestions = async () => {
  try {
    const response = await api().get("/questions/me");
    return response.data;
  } catch (e) {
    console.log("Error:", e);
  }
};

export const getQuizHistory = async () => {
  try {
    const response = await api().get("/quizzes");
    return response.data;
  } catch (e) {
    console.log("Error:", e);
  }
};

export const confirmEmail = async (email) => {
  try {
    const response = await api().get(`/users/check-email?email=${email}`);
    const json = await response.data;
    return json;
  } catch (e) {
    console.log("Error: ", e);
  }
};
