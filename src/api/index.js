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
    const resp = await api().get("/questions/me");
    return resp.data;
  } catch (e) {
    console.log("Error:", e);
  }
};

export const deleteQuestion = async (id) => {
  try {
    const resp = await api().delete("/questions/" + id);
    return resp;
  } catch (e) {
    console.log("Error:", e);
  }
}

export const getQuizHistory = async () => {
  try {
    const resp = await api().get("/quizzes");
    return resp.data;
  } catch (e) {
    console.log("Error:", e);
  }
};

export const confirmEmail = async (email) => {
  try {
    const resp = await api().get(`/users/check-email?email=${email}`);
    const json = await resp.data;
    return json;
  } catch (e) {
    console.log("Error: ", e);
  }
};

export const postQuestion = async (newQuestion) => {
  try {
    const resp = await api().post("/questions", newQuestion);
    return resp
  } catch (e) {
    console.log("Error:", e);
  }
};

export const updatePassword = async (password, token) => {
  try {
    const resp = await api().post("/users/password/" + token, JSON.stringify(password));
    return resp
  } catch (e) {
    console.log("Error:", e);
  }
};